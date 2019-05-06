import { Choices } from './interfaces'

export const compose = (...fns: Function[]) => {
  return fns.reduce((fns, fn) => (value: Function) => fns(fn(value)))
}

export const partial = (fn: Function, ...values: any[]) => {
  return fn.bind(null, ...values)
}

export const prop = (collection: any[], prop: string) => {
  return Object.values(collection).map(item => item[prop])
}

export const getPlayerIdsFromChoices = (choices: Choices): string[] => {
  return Object.values(choices).flatMap(ids => ids)
}

export const filterIds = (allIds: string[], filterIds: string[]): string[] => {
  return allIds.filter((id: string) => !filterIds.includes(id))
}
