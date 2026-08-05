import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import type { TemplateEntry } from './registry'

interface Props {
  heading?: string
  intro?: string
  fields?: Array<{ label: string; value: string }>
  message?: string
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Space Grotesk', Helvetica, Arial, sans-serif",
  color: '#141210',
}
const container = { padding: '28px 24px', maxWidth: '600px' }
const heading = { fontSize: '24px', lineHeight: '1.2', margin: '0 0 8px' }
const intro = { fontSize: '14px', color: '#6b6560', margin: '0 0 20px' }
const label = {
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#6b6560',
  margin: '0 0 2px',
}
const value = { fontSize: '15px', margin: '0 0 14px', whiteSpace: 'pre-wrap' as const }
const accent = { borderLeft: '3px solid #ff5a3c', paddingLeft: '14px' }

const InternalNotification = ({
  heading: title = 'Nieuwe aanvraag',
  intro: introText = 'Er is een nieuw bericht binnengekomen via de website.',
  fields = [],
  message = '',
}: Props) => (
  <Html lang="nl" dir="ltr">
    <Head />
    <Preview>{`${title} — ${fields[0]?.value ?? ''}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>{title}</Heading>
        <Text style={intro}>{introText}</Text>
        <Hr />
        <Section style={accent}>
          {fields.map((field) => (
            <div key={field.label}>
              <Text style={label}>{field.label}</Text>
              <Text style={value}>{field.value || '—'}</Text>
            </div>
          ))}
          {message ? (
            <>
              <Text style={label}>Bericht / antwoorden</Text>
              <Text style={value}>{message}</Text>
            </>
          ) : null}
        </Section>
      </Container>
    </Body>
  </Html>
)

const previewData = {
  heading: 'Nieuwe contactaanvraag',
  intro: 'Verstuurd via het contactformulier.',
  fields: [
    { label: 'Naam', value: 'Sanne de Vries' },
    { label: 'E-mail', value: 'sanne@studionoord.nl' },
    { label: 'Bedrijf', value: 'Studio Noord' },
  ],
  message: 'We willen een nieuwe website met focus op conversie.',
}

export const contactNotificationTemplate = {
  component: InternalNotification,
  subject: (data: Record<string, any>) =>
    `Nieuwe contactaanvraag — ${data['fields']?.[0]?.value ?? 'website'}`,
  displayName: 'Contactaanvraag (intern)',
  previewData,
  to: 'info@webagencytwente.nl',
} satisfies TemplateEntry

export const scanNotificationTemplate = {
  component: InternalNotification,
  subject: (data: Record<string, any>) =>
    `Nieuwe website scan aanvraag — ${data['fields']?.[0]?.value ?? 'website'}`,
  displayName: 'Website scan lead (intern)',
  previewData: {
    ...previewData,
    heading: 'Nieuwe website scan aanvraag',
    intro: 'Verstuurd via de website scan.',
  },
  to: 'info@webagencytwente.nl',
} satisfies TemplateEntry