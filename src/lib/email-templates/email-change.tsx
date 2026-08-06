import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

import { brand, button, container, footer, h1, link, main, text } from './auth-styles'

interface EmailChangeEmailProps {
  siteName: string
  // oldEmail is the user's current address (HookData.OldEmail). For the
  // NEW-recipient half of a secure email_change fanout, `email` equals the
  // recipient (NEW), so the "from" line must render oldEmail.
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="nl" dir="ltr">
    <Head />
    <Preview>Bevestig je nieuwe e-mailadres voor {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>{siteName}</Text>
        <Heading style={h1}>Bevestig je nieuwe e-mailadres</Heading>
        <Text style={text}>
          Je hebt gevraagd om je e-mailadres voor {siteName} te wijzigen van{' '}
          <Link href={`mailto:${oldEmail}`} style={link}>
            {oldEmail}
          </Link>{' '}
          naar{' '}
          <Link href={`mailto:${newEmail}`} style={link}>
            {newEmail}
          </Link>
          .
        </Text>
        <Button style={button} href={confirmationUrl}>
          Wijziging bevestigen
        </Button>
        <Text style={footer}>
          Heb je dit niet aangevraagd? Beveilig dan direct je account.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail