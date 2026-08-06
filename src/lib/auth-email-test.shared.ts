export const AUTH_EMAIL_TYPES = [
  'signup',
  'invite',
  'magiclink',
  'recovery',
  'email_change',
  'reauthentication',
] as const

export type AuthEmailType = (typeof AUTH_EMAIL_TYPES)[number]

export const AUTH_EMAIL_LABELS: Record<AuthEmailType, { title: string; description: string }> = {
  signup: { title: 'Aanmelding', description: 'Bevestig je e-mailadres na registratie' },
  invite: { title: 'Uitnodiging', description: 'Iemand wordt uitgenodigd voor het account' },
  magiclink: { title: 'Inloglink', description: 'Inloggen zonder wachtwoord' },
  recovery: { title: 'Wachtwoordherstel', description: 'Nieuw wachtwoord instellen' },
  email_change: { title: 'E-mailwijziging', description: 'Bevestig een nieuw e-mailadres' },
  reauthentication: { title: 'Verificatiecode', description: '6-cijferige code ter bevestiging' },
}
