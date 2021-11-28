import type { config } from '../../config'

type IsDev = (c: typeof config) => boolean

export const isDev: IsDev = config => config.env === 'dev'
