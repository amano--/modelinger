import * as ts from 'typescript'

const files = ['src/sandbox/core/Center.ts']

describe('ast', () => {
  // Create program
  const program = ts.createProgram(files, {})

  // Get source of the specified file
  const source = program.getSourceFile('src/sandbox/core/Center.ts')

  it('simple source', () => {
    // Print AST
    if (source) {
      console.log(source.statements)

      // Print all declared function names
      console.log('--- declared function names ---')
      ts.forEachChild(source, (node) => {
        if (ts.isTypeAliasDeclaration(node)) {
          console.log(node.name && node.name.text)
          console.log('node.typeParameters=', node._declarationBrand)
        }
      })
    }
  })
})
