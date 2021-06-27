// import { isString } from 'lodash'

export type Center = { tag: 'center'; top: Top; bottom: Bottom }

type Top = { tag: 'top'; left: TopLeft; right: TopRight }
type TopLeft = { tag: 'topLeft' }
type TopRight = { tag: 'topRight' }

type Bottom = { tag: 'bottom'; left: BottomLeft; right: BottomRight }
type BottomLeft = { tag: 'bottomLeft' }
type BottomRight = { tag: 'bottomRight' }
