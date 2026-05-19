const ENTRA_PKCE_SESSION_KEY = 'entra-id-pkce'
const DEFAULT_SCOPE = 'openid profile email'

type EntraIdConfig = {
  clientId: string
  redirectUri: string
  scopes: string
  tenantId: string
}

type EntraIdSession = {
  codeVerifier: string
  redirectTo?: string
  state: string
}

type EntraTokenResponse = {
  access_token?: string
  error?: string
  error_description?: string
  expires_in?: number
  id_token?: string
}

type EntraTokenClaims = {
  email?: string
  exp?: number
  name?: string
  oid?: string
  preferred_username?: string
  roles?: string[]
  sub?: string
  upn?: string
}

export function isEntraIdEnabled() {
  return (
    import.meta.env.VITE_ENTRA_ID_ENABLED === 'true' &&
    Boolean(
      import.meta.env.VITE_ENTRA_ID_TENANT_ID &&
        import.meta.env.VITE_ENTRA_ID_CLIENT_ID
    )
  )
}

export async function beginEntraIdSignIn(redirectTo?: string) {
  const config = getEntraIdConfig()
  if (!config) throw new Error('Microsoft Entra ID is not configured.')

  const codeVerifier = createRandomString(64)
  const state = createRandomString(32)
  const codeChallenge = await createCodeChallenge(codeVerifier)

  sessionStorage.setItem(
    ENTRA_PKCE_SESSION_KEY,
    JSON.stringify({ codeVerifier, redirectTo, state } satisfies EntraIdSession)
  )

  const authorizeUrl = new URL(
    `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/authorize`
  )
  authorizeUrl.searchParams.set('client_id', config.clientId)
  authorizeUrl.searchParams.set('response_type', 'code')
  authorizeUrl.searchParams.set('redirect_uri', config.redirectUri)
  authorizeUrl.searchParams.set('response_mode', 'query')
  authorizeUrl.searchParams.set('scope', config.scopes)
  authorizeUrl.searchParams.set('state', state)
  authorizeUrl.searchParams.set('code_challenge', codeChallenge)
  authorizeUrl.searchParams.set('code_challenge_method', 'S256')
  authorizeUrl.searchParams.set('prompt', 'select_account')

  window.location.assign(authorizeUrl.toString())
}

export async function completeEntraIdSignIn({
  code,
  state,
}: {
  code: string
  state: string
}) {
  const config = getEntraIdConfig()
  if (!config) throw new Error('Microsoft Entra ID is not configured.')

  const session = readEntraSession()
  if (!session || session.state !== state) {
    throw new Error('Microsoft Entra ID sign-in state is invalid or expired.')
  }

  const body = new URLSearchParams({
    client_id: config.clientId,
    code,
    code_verifier: session.codeVerifier,
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUri,
    scope: config.scopes,
  })

  const response = await fetch(
    `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`,
    {
      body,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      method: 'POST',
    }
  )
  const token = (await response.json()) as EntraTokenResponse

  if (!response.ok || token.error) {
    throw new Error(
      token.error_description || token.error || 'Microsoft Entra ID sign-in failed.'
    )
  }

  sessionStorage.removeItem(ENTRA_PKCE_SESSION_KEY)

  const claims = decodeJwt(token.id_token || token.access_token)
  const email =
    claims.preferred_username || claims.email || claims.upn || claims.name || ''

  return {
    accessToken: token.access_token || token.id_token || '',
    redirectTo: session.redirectTo || '/',
    user: {
      accountNo: claims.oid || claims.sub || email,
      email,
      exp: claims.exp ? claims.exp * 1000 : Date.now() + 60 * 60 * 1000,
      role: claims.roles?.length ? claims.roles : ['user'],
    },
  }
}

function getEntraIdConfig(): EntraIdConfig | null {
  if (import.meta.env.VITE_ENTRA_ID_ENABLED !== 'true') return null

  const tenantId = import.meta.env.VITE_ENTRA_ID_TENANT_ID
  const clientId = import.meta.env.VITE_ENTRA_ID_CLIENT_ID
  const scopes = import.meta.env.VITE_ENTRA_ID_SCOPES || DEFAULT_SCOPE
  const redirectUri =
    import.meta.env.VITE_ENTRA_ID_REDIRECT_URI ||
    (typeof window === 'undefined'
      ? ''
      : `${window.location.origin}/auth/entra/callback`)

  if (!tenantId || !clientId || !redirectUri) return null

  return { clientId, redirectUri, scopes, tenantId }
}

function readEntraSession(): EntraIdSession | null {
  const raw = sessionStorage.getItem(ENTRA_PKCE_SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as EntraIdSession
  } catch {
    return null
  }
}

function createRandomString(length: number) {
  const values = new Uint8Array(length)
  crypto.getRandomValues(values)

  return base64UrlEncode(values)
}

async function createCodeChallenge(codeVerifier: string) {
  const encoded = new TextEncoder().encode(codeVerifier)
  const digest = await crypto.subtle.digest('SHA-256', encoded)

  return base64UrlEncode(new Uint8Array(digest))
}

function decodeJwt(token?: string): EntraTokenClaims {
  if (!token) return {}

  const payload = token.split('.')[1]
  if (!payload) return {}

  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      '='
    )
    const json = atob(padded)

    return JSON.parse(json) as EntraTokenClaims
  } catch {
    return {}
  }
}

function base64UrlEncode(bytes: Uint8Array) {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}
