import { isString } from 'lodash'

export type Center = { tag: 'center'; top: Top }

type Top = { tag: 'top'; left: TopLeft; right: TopRight }
type TopLeft = { tag: 'topLeft' }
type TopRight = { tag: 'topRight' }

const center: Center = { tag: 'center', top: { tag: 'top', left: { tag: 'topLeft' }, right: { tag: 'topRight' } } }

const x = 11
const y = 22
const total = x + y

const func = (i: number, j: number) => i * j * 10

const higher = (i: number, j: number, k: number) => (i: number, j: number) => i * j * k * 100

const check = (text: string) => isString(text)
