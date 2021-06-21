import { isString } from 'lodash'

// TBD Nominalの関連をどう扱うか?
// type RelationTagForNominal = 'extends' | 'implements' //| 'enum'

type RelationTagForSubstructual = 'union' | 'intersection'

// TBD だだの関連をどう表現するか?
export type RelationTag = 'dependency' | RelationTagForSubstructual //| RelationTagForNominal

export type Relation = { id: string; tag: RelationTag; label: string }

export type LabeledMeta = {
  id: string
  name: string
  label: string
}

export type TypeDesc = { codeURL: string }

export type TypeMeta = LabeledMeta & {
  desc: TypeDesc
  relations: readonly Relation[]
}

export type AttributeMeta = LabeledMeta

export type Diagram = LabeledMeta & {
  filePath: string
  // sheets: readonly Sheet[]
}

export type Sheet = LabeledMeta & {
  diagram: Diagram
  // sheets: readonly Sheet[]
}

// export type Sheets = LabeledMeta & {
//   filePath: string
//   sheets: readonly Sheet[]
// }
