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
  name?: string
  fields?: Array<{ label: string; value: string }>
  message?: string
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Space Grotesk', Helvetica, Arial, sans-serif",
  color: '#141210',
}
const container = { padding: '28px 24px', maxWidth: '600px' }
const heading = { fontSize: '26px', lineHeight: '1.2', margin: '0 0 10px' }
const paragraph = { fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }
const muted = { fontSize: '13px', color: '#6b6560', margin: '20px 0 0' }
const label = {
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#6b6560',
  margin: '0 0 2px',
}
const value = { fontSize: '15px', margin: '0 0 14px', whiteSpace: 'pre-wrap' as const }
const accent = { borderLeft: '3px solid #ff5a3c', paddingLeft: '14px' }

const ContactConfirmation = ({ name, fields = [], message = '' }: Props) => (
  <Html lang="nl" dir="ltr">
    <Head />
    <Preview>We hebben je bericht ontvangen — Web Agency Twente</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Bedankt{name ? `, ${name}` : ''}! 🚀</Heading>
        <Text style={paragraph}>
          We hebben je bericht in goede orde ontvangen. Een van ons bekijkt je aanvraag
          persoonlijk en neemt meestal binnen één werkdag contact met je op.
        </Text>
        <Hr />
        <Text style={{ ...paragraph, fontWeight: 700, margin: '16px 0 12px' }}>
          Dit hebben we van je ontvangen
        </Text>
        <Section style={accent}>
          {fields.map((field) => (
            <div key={field.label}>
              <Text style={label}>{field.label}</Text>
              <Text style={value}>{field.value || '—'}</Text>
            </div>
          ))}
          {message ? (
            <>
              <Text style={label}>Jouw antwoorden</Text>
              <Text style={value}>{message}</Text>
            </>
          ) : null}
        </Section>
        <Text style={muted}>
          Klopt er iets niet? Beantwoord deze mail of bel ons op +31 6 23 81 62 97.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const contactConfirmationTemplate = {
  component: ContactConfirmation,
  subject: 'We hebben je bericht ontvangen — Web Agency Twente',
  displayName: 'Ontvangstbevestiging (bezoeker)',
  previewData: {
    name: 'Sanne',
    fields: [
      { label: 'Naam', value: 'Sanne de Vries' },
      { label: 'E-mail', value: 'sanne@studionoord.nl' },
      { label: 'Bedrijf', value: 'Studio Noord' },
      { label: 'Onderwerp', value: 'Nieuwe website' },
    ],
    message: 'We willen een nieuwe website met focus op conversie.',
  },
} satisfies TemplateEntry
