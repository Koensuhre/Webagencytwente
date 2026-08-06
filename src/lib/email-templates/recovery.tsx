import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

import { brand, button, container, footer, h1, main, text } from './auth-styles'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ siteName, confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="nl" dir="ltr">
    <Head />
    <Preview>Stel een nieuw wachtwoord in voor {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>{siteName}</Text>
        <Heading style={h1}>Nieuw wachtwoord instellen</Heading>
        <Text style={text}>
          We ontvingen een verzoek om je wachtwoord voor {siteName} opnieuw in te
          stellen. Klik op de knop hieronder om een nieuw wachtwoord te kiezen.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Wachtwoord opnieuw instellen
        </Button>
        <Text style={footer}>
          Heb je dit niet aangevraagd? Dan kun je deze e-mail negeren — je wachtwoord
          blijft ongewijzigd.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail