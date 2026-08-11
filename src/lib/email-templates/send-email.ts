import * as React from 'react'
import { render } from '@react-email/render'
import { TEMPLATES } from './registry'

// Server-only: reads RESEND_API_KEY. Never import from client components.

const SITE_NAME = 'Web Agency Twente'
const FROM_DOMAIN = 'webagencytwente.nl'
const FROM_ADDRESS = `info@${FROM_DOMAIN}`
const RESEND_ENDPOINT = 'https://api.resend.com/emails'

export type SendTemplateEmailResult =
  | { sent: true }
  | { sent: false; reason: 'recipient_suppressed' }

export interface SendTemplateEmailOptions {
  templateData?: Record<string, any>
  /** Dedupes retries of the same logical send; defaults to a random UUID (no dedupe). */
  idempotencyKey?: string
  replyTo?: string
}

/**
 * Renders a registered template and sends it through Resend. Works identically
 * in local dev, Lovable preview and Vercel production — the only requirement is
 * a RESEND_API_KEY in the server environment.
 *
 * A suppressed/blocked recipient resolves { sent: false }; any other failure
 * throws with the provider's status and message so callers can log it.
 */
export async function sendTemplateEmail(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {}
): Promise<SendTemplateEmailResult> {
  const apiKey = process.env['RESEND_API_KEY']
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const template = TEMPLATES[templateName]
  if (!template) {
    throw new Error(
      `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(', ')}`
    )
  }

  // Template-level `to` takes precedence — notification templates always
  // send to their fixed address.
  const recipient = template.to || to
  if (!recipient) {
    throw new Error('Recipient is required (the template defines no fixed recipient)')
  }

  const templateData = options.templateData ?? {}
  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  const idempotencyKey = options.idempotencyKey || crypto.randomUUID()
  const from = process.env['EMAIL_FROM'] || `${SITE_NAME} <${FROM_ADDRESS}>`
  const payload = {
    from,
    to: [recipient],
    subject,
    html,
    text,
    tags: [{ name: 'template', value: templateName.replace(/[^a-zA-Z0-9_-]/g, '_') }],
    ...(options.replyTo ? { reply_to: options.replyTo } : {}),
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      // Resend dedupes identical sends that share this key.
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(20_000),
  })

  if (!response.ok) {
    const body = await response.text()
    // Resend blocks addresses on its own suppression list — an expected outcome.
    if (response.status === 403 && /suppress|blocked/i.test(body)) {
      return { sent: false, reason: 'recipient_suppressed' }
    }
    throw new Error(`Resend send failed [${response.status}] ${body}`)
  }

  return { sent: true }
}
