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

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="nl" dir="ltr">
    <Head />
    <Preview>Je bent uitgenodigd voor {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>{siteName}</Text>
        <Heading style={h1}>Je bent uitgenodigd</Heading>
        <Text style={text}>
          Je bent uitgenodigd om deel te nemen aan{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Klik op de knop hieronder om de uitnodiging te accepteren en je account aan
          te maken.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Uitnodiging accepteren
        </Button>
        <Text style={footer}>
          Verwachtte je deze uitnodiging niet? Dan kun je deze e-mail negeren.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail