import { isString } from 'lodash'
import { RefSample } from './RefSample'

export type Center = { tag: 'center'; top: Top; bottom: Bottom; refSample?: RefSample }

type Top = { tag: 'top'; left: TopLeft; right: TopRight }
type TopLeft = { tag: 'topLeft' }
type TopRight = { tag: 'topRight' }

type Bottom = { tag: 'bottom'; left: BottomLeft; right: BottomRight }
type BottomLeft = { tag: 'bottomLeft' }
type BottomRight = { tag: 'bottomRight' }

// const center: Center = { tag: 'center', top: { tag: 'top', left: { tag: 'topLeft' }, right: { tag: 'topRight' } } }
