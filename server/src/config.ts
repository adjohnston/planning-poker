export const config = {
  port: process.env.PORT ?? '8080',
  env: process.env.ENV ?? 'dev',
  clientHostname: 'planning-poker.adamjohnston.dev',
} as const
