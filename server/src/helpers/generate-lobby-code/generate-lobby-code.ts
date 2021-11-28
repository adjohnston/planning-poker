import * as R from 'ramda'

type CoinToss = () => number

const coinToss: CoinToss = R.always(Math.floor(Math.random() * 2))

type RandomAlpha = () => string

const randomAlpha: RandomAlpha = R.always(
  'abcdef'.charAt(Math.floor(Math.random() * 6)),
)

type RandomNumber = () => string

const randomNumber: RandomNumber = R.always(
  Math.floor(Math.random() * 10).toString(),
)

type RandomCharacter = (_: unknown) => string

const randomCharacter: RandomCharacter = R.ifElse(
  R.always(R.equals(coinToss(), 0)),
  randomAlpha,
  randomNumber,
)

type GenerateLobbyCode = (length: number) => string

export const generateLobbyCode: GenerateLobbyCode = R.pipe(
  Array,
  (xs: undefined[]) => Array.from(xs),
  R.map(randomCharacter),
  R.reduce(R.concat, ''),
)
