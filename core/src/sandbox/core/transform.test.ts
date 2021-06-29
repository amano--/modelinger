import * as ts from 'typescript'

// 参考 [ TypeScriptのcompiler APIをいじる ](https://akito0107.hatenablog.com/entry/2018/12/23/020323)

const files = ['src/sandbox/core/Center.ts']

const program = ts.createProgram(files, {})

// const checker = program.getTypeChecker()

// Get source of the specified file
const source = program.getSourceFile('src/sandbox/core/Center.ts')

// type TransformerFactory<T extends Node> = (context: ts.TransformationContext) => Transformer<T>

// type Transformer<T extends Node> = (node: T) => T

const removeImport = <T extends ts.Node>(context: ts.TransformationContext) => (rootNode: T) => {
  function visit(node: ts.Node): ts.Node {
    node = ts.visitEachChild(node, visit, context)
    if (!ts.isImportDeclaration(node)) {
      return node
    }
    const importDecl: ts.ImportDeclaration = node
    if ((importDecl.moduleSpecifier as any).text === 'lodash') {
      return (null as unknown) as ts.Node
    }

    return node
  }
  return ts.visitNode(rootNode, visit)
}

describe('transform', () => {
  it('simple run', () => {
    const result = ts.transform(source!, [removeImport])
    result.dispose()

    const printer = ts.createPrinter()
    console.log(printer.printFile(result.transformed[0] as ts.SourceFile))
  })
})
