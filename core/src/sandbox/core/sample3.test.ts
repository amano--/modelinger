import * as ts from 'typescript'

const files = ['src/sandbox/core/Center.ts']

// https://astexplorer.net/ を使って生成
describe('ast', () => {
  // Create program
  const program = ts.createProgram(files, {})

  // Get source of the specified file
  const source = program.getSourceFile('src/sandbox/core/Center.ts')

  it('simple source', () => {
    const result = parse(program)({})(source)
    console.log(result)
  })
})

function parse(program) {
  const checker = program.getTypeChecker()
  return (context) => {
    return (sourceFile) => {
      const visitor = (node) => {
        // This branch evaluates '2 + 2' like expressions and replaces the node with the result (in this case '4')
        if (ts.isBinaryExpression(node)) {
          if (ts.isNumericLiteral(node.left) && ts.isNumericLiteral(node.right)) {
            // We could parse `node.text` as a number, or we can use the typechecker to get type info for nodes
            const lhs = checker.getTypeAtLocation(node.left)
            const rhs = checker.getTypeAtLocation(node.right)

            switch (node.operatorToken.kind) {
              case ts.SyntaxKind.PlusToken:
                return context.factory.createNumericLiteral(lhs.value + rhs.value)
            }
          }
        }
        //
        if ((ts.isIdentifier(node) && node.text === 'printTips') || node.text === 'tips') {
          return context.factory.createIdentifier(node.text.split('').reverse().join(''))
        }
        return ts.visitEachChild(node, visitor, context)
      }
      return ts.visitNode(sourceFile, visitor)
    }
  }
}
