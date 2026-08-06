import * as React from 'react'
import { render } from '@react-email/render'
import { EmailAPIError, sendLovableEmail } from '@lovable.dev/email-js'
import { SignupEmail } from '@/lib/email-templates/signup'
import { InviteEmail } from '@/lib/email-templates/invite'
import { MagicLinkEmail } from '@/lib/email-templates/magic-link'
import { RecoveryEmail } from '@/lib/email-templates/recovery'
import { EmailChangeEmail } from '@/lib/email-templates/email-change'
import { ReauthenticationEmail } from '@/lib/email-templates/reauthentication'

const SITE_NAME = 'Web Agency Twente'
const SENDER_DOMAIN = 'notify.webagencytwente.nl'
const FROM_DOMAIN = 'webagencytwente.nl'
const SITE_URL = 'https://webagencytwente.nl'

export const AUTH_EMAIL_TYPES = [
  'signup',
  'invite',
  'magiclink',
  'recovery',
  'email_change',
  'reauthentication',
] as const

export type AuthEmailType = (typeof AUTH_EMAIL_TYPES)[number]

const DEMO_URL = `${SITE_URL}/auth/confirm?token=TEST-TOKEN-123&type=`
const DEMO_TOKEN = '426913'

const emails: Record<
  AuthEmailType,
  { subject: string; element: (recipient: string) => React.ReactElement }
> = {
  signup: {
    subject: '[TEST] Bevestig je e-mailadres — Web Agency Twente',
    element: (recipient) =>
      React.createElement(SignupEmail, {
        siteName: SITE_NAME,
        siteUrl: SITE_URL,
        recipient,
        confirmationUrl: `${DEMO_URL}signup`,
      }),
  },
  invite: {
    subject: '[TEST] Je bent uitgenodigd — Web Agency Twente',
    element: () =>
      React.createElement(InviteEmail, {
        siteName: SITE_NAME,
        siteUrl: SITE_URL,
        confirmationUrl: `${DEMO_URL}invite`,
      }),
  },
  magiclink: {
    subject: '[TEST] Je inloglink — Web Agency Twente',
    element: () =>
      React.createElement(MagicLinkEmail, {
        siteName: SITE_NAME,
        confirmationUrl: `${DEMO_URL}magiclink`,
      }),
  },
  recovery: {
    subject: '[TEST] Nieuw wachtwoord instellen — Web Agency Twente',
    element: () =>
      React.createElement(RecoveryEmail, {
        siteName: SITE_NAME,
        confirmationUrl: `${DEMO_URL}recovery`,
      }),
  },
  email_change: {
    subject: '[TEST] Bevestig je nieuwe e-mailadres — Web Agency Twente',
    element: (recipient) =>
      React.createElement(EmailChangeEmail, {
        siteName: SITE_NAME,
        oldEmail: recipient,
        email: recipient,
        newEmail: `nieuw+${recipient}`,
        confirmationUrl: `${DEMO_URL}email_change`,
      }),
  },
  reauthentication: {
    subject: '[TEST] Je verificatiecode — Web Agency Twente',
    element: () => React.createElement(ReauthenticationEmail, { token: DEMO_TOKEN }),
  },
}

export async function sendAuthTestEmail(
  type: AuthEmailType,
  to: string
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env['LOVABLE_API_KEY']
  if (!apiKey) throw new Error('E-mailverzending is nog niet geconfigureerd.')

  const config = emails[type]
  const element = config.element(to)
  const html = await render(element)
  const text = await render(element, { plainText: true })

  try {
    await sendLovableEmail(
      {
        to,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: config.subject,
        html,
        text,
        purpose: 'transactional',
        label: `auth-test-${type}`,
        idempotency_key: crypto.randomUUID(),
      },
      { apiKey, sendUrl: process.env['LOVABLE_SEND_URL'] }
    )
  } catch (error) {
    if (error instanceof EmailAPIError) {
      if (error.code === 'recipient_suppressed') {
        return { sent: false, reason: 'Dit adres is geblokkeerd (bounce/uitschrijving).' }
      }
      if (error.status === 429) {
        const wait = error.retryAfterSeconds ?? 60
        return { sent: false, reason: `Te veel mails verstuurd, probeer over ${wait}s opnieuw.` }
      }
      return { sent: false, reason: error.message }
    }
    throw error
  }

  return { sent: true }
}
