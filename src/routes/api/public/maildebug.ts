import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/maildebug')({
  server: {
    handlers: {
      GET: async () => {
        const apiKey = process.env['LOVABLE_API_KEY']
        const sendUrl = process.env['LOVABLE_SEND_URL'] || 'https://api.lovable.dev/v1/messaging/email/send'
        const payload = {
          to: 'info@webagencytwente.nl',
          from: 'Web Agency Twente <info@webagencytwente.nl>',
          sender_domain: 'notify.webagencytwente.nl',
          subject: 'Debug test',
          html: '<p>debug</p>',
          text: 'debug',
          purpose: 'transactional',
          label: 'debug',
          idempotency_key: crypto.randomUUID(),
        }
        const res = await fetch(sendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'Idempotency-Key': payload.idempotency_key,
          },
          body: JSON.stringify(payload),
        })
        const body = await res.text()
        return Response.json({ sendUrl, hasKey: !!apiKey, status: res.status, body })
      },
    },
  },
})
