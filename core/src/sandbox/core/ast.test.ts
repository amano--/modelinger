import * as ts from 'typescript'

const files = ['Center.ts']
// const tsconfig = require('../../../tsconfig.json')
// const program = ts.createProgram(files, tsconfig)
// const program = ts.createProgram(files, {})

describe('useCounter', () => {
  let source = `
  class Sample{

  }

  type Hoge ={hoge?:string}
  `

  let sourceFile = ts.createSourceFile('sample.ts', source, ts.ScriptTarget.ES2016, /*setParentNodes */ true)

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
    console.log(node.name.text)
  }

  function typeAliasDeclaration(node: ts.TypeAliasDeclaration) {
    console.log(node.name.text)
  }
  it('simple source', () => {
    ts.forEachChild(sourceFile, each)
  })
})
