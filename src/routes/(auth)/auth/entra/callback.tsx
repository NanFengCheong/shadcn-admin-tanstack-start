import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { EntraIdCallback } from '@/features/auth/entra-id-callback'

const searchSchema = z.object({
  code: z.string().optional(),
  error: z.string().optional(),
  error_description: z.string().optional(),
  state: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/auth/entra/callback')({
  component: EntraIdCallback,
  validateSearch: searchSchema,
})
