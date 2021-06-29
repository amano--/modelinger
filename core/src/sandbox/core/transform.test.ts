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

function parser(program: ts.Program) {
  const checker = program.getTypeChecker()
  return (context: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      const visitor = (node: ts.Node): ts.Node => {
        // This branch evaluates '2 + 2' like expressions and replaces the node with the result (in this case '4')
        if (ts.isBinaryExpression(node)) {
          if (ts.isNumericLiteral(node.left) && ts.isNumericLiteral(node.right)) {
            // We could parse `node.text` as a number, or we can use the typechecker to get type info for nodes
            const lhs = checker.getTypeAtLocation(node.left)
            const rhs = checker.getTypeAtLocation(node.right)

            switch (node.operatorToken.kind) {
              case ts.SyntaxKind.PlusToken:
                return context.factory.createNumericLiteral(101) //(lhs.value + rhs.value)
            }
          }
        }
        //
        if (ts.isIdentifier(node)) {
          if (node.text === 'printTips' || node.text === 'tips')
            return context.factory.createIdentifier(node.text.split('').reverse().join(''))
        }
        return ts.visitEachChild(node, visitor, context)
      }
      return ts.visitNode(sourceFile, visitor)
    }
  }
}

describe('transform', () => {
  it('simple run', () => {
    const result = ts.transform(source!, [removeImport, parser(program)])
    result.dispose()

    const printer = ts.createPrinter()
    console.log(printer.printFile(result.transformed[0] as ts.SourceFile))
  })
})
