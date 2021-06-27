import { isString } from 'lodash'

// TBD Nominalの関連をどう扱うか?
// type RelationTagForNominal = 'extends' | 'implements' //| 'enum'

type RelationTagForSubstructual = 'union' | 'intersection'

// TBD だだの関連をどう表現するか?
export type RelationTag = 'dependency' | RelationTagForSubstructual //| RelationTagForNominal

export type Relation = { id: string; tag: RelationTag; label: string }

export type Label = {
  id: string
  name: string
  label: string
}

export type LinkLabel = Label & {
  codeURL: string
}

// export type NodeDesc = { codeURL: string }
//vertex
export type Node = Label & {
  // desc: NodeDesc
  relations: readonly Relation[]
}

export type TypeNode = LinkLabel & Node

export type AttributeMeta = Label

export type Diagram = Label & {
  filePath: string
  // sheets: readonly Sheet[]
}

export type Sheet = Label & {
  diagram: Diagram
  // sheets: readonly Sheet[]
}

// export type Sheets = LabeledMeta & {
//   filePath: string
//   sheets: readonly Sheet[]
// }
