import { createServerFn } from '@tanstack/react-start'
import { AUTH_EMAIL_TYPES, type AuthEmailType } from '@/lib/auth-email-test.shared'

const ALLOWED_DOMAINS = ['webagencytwente.nl']

export const sendAuthTestEmailFn = createServerFn({ method: 'POST' })
  .inputValidator((input: { type: AuthEmailType; to: string }) => {
    const to = String(input?.to ?? '').trim().toLowerCase()
    if (!AUTH_EMAIL_TYPES.includes(input?.type)) throw new Error('Onbekend e-mailtype.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error('Ongeldig e-mailadres.')
    const domain = to.split('@')[1]!
    if (!ALLOWED_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))) {
      throw new Error('Testmails kunnen alleen naar een @webagencytwente.nl-adres.')
    }
    return { type: input.type, to }
  })
  .handler(async ({ data }) => {
    const { sendAuthTestEmail } = await import('@/lib/auth-email-test.server')
    return sendAuthTestEmail(data.type, data.to)
  })
