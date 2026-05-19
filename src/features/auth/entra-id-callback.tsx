import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { completeEntraIdSignIn } from '@/lib/entra-id-auth'
import { AuthLayout } from './auth-layout'

export function EntraIdCallback() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/(auth)/auth/entra/callback' })
  const { auth } = useAuthStore()
  const [message, setMessage] = useState('Completing Microsoft sign-in...')

  useEffect(() => {
    let cancelled = false

    async function completeSignIn() {
      try {
        if (search.error) {
          throw new Error(search.error_description || search.error)
        }
        if (!search.code || !search.state) {
          throw new Error('Microsoft Entra ID did not return a sign-in code.')
        }

        const result = await completeEntraIdSignIn({
          code: search.code,
          state: search.state,
        })
        if (cancelled) return

        auth.setUser(result.user)
        auth.setAccessToken(result.accessToken)
        toast.success('Signed in with Microsoft.')
        navigate({ to: result.redirectTo, replace: true })
      } catch (error) {
        if (cancelled) return

        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Microsoft Entra ID sign-in failed.'
        setMessage(errorMessage)
        toast.error(errorMessage)
      }
    }

    completeSignIn()

    return () => {
      cancelled = true
    }
  }, [auth, navigate, search])

  return (
    <AuthLayout>
      <div className='mx-auto flex max-w-sm flex-col items-center gap-3 text-center'>
        <Loader2 className='size-6 animate-spin text-muted-foreground' />
        <p className='text-sm text-muted-foreground'>{message}</p>
      </div>
    </AuthLayout>
  )
}
