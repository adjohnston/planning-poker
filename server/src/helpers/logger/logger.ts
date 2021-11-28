type Level = 'log' | 'warn' | 'error'

type MetaExtension = Record<string, any>

interface Meta {
  sessionId: string
}

type Log = (m: string, me?: MetaExtension) => void

type Logger = <T extends MetaExtension>(
  m: Readonly<Meta & T>,
) => (l: Level) => Log

const logger: Logger = meta => level => (message, metaExtension) =>
  console[level](message, { ...metaExtension, ...meta })

type CreateLogger = <T extends MetaExtension>(
  m: Readonly<Meta & T>,
) => Record<Level, Log>

export const createLogger: CreateLogger = meta => {
  const loggerWithMeta = logger(meta)

  return {
    log: loggerWithMeta('log'),
    warn: loggerWithMeta('warn'),
    error: loggerWithMeta('error'),
  }
}
