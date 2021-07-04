import * as ts from 'typescript'

let source = `
export type Center = { tag: 'center'; top: Top}

type Top = { tag: 'top'; left: TopLeft; right: TopRight }
type TopLeft = { tag: 'topLeft' }
type TopRight = { tag: 'topRight' }

class SampleClass {
  private prop1 : string
}
`

let src = ts.createSourceFile('sample.ts', source, ts.ScriptTarget.ES2016, /*setParentNodes */ true)

describe('step1', () => {
  function each(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ClassDeclaration:
        classDeclaration(node as ts.ClassDeclaration)
        break
      case ts.SyntaxKind.TypeAliasDeclaration:
        typeAliasDeclaration(node as ts.TypeAliasDeclaration)
        break
      default:
        next()
    }

    function next() {
      ts.forEachChild(node, each)
    }
  }

  function classDeclaration(node: ts.ClassDeclaration) {
    console.log(node?.name?.text)
  }

  function typeAliasDeclaration(node: ts.TypeAliasDeclaration) {
    console.log(node?.name?.text)
  }
  it('simple source', () => {
    ts.forEachChild(src, each)
  })
})
