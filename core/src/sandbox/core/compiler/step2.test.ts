import * as ts from 'typescript'
import { defaultTsCompilerOptions } from './tsconfig'

// ref https://github.com/ktsn/ts-compiler-api-examples/blob/master/src/1-read-ast.ts

const files = ['src/sandbox/core/Center.ts']

describe('ast', () => {
  // const tsconf = JSON.parse(tsc)
  console.log('CompilerOptions=', defaultTsCompilerOptions)

  // Create program
  const program = ts.createProgram(files, defaultTsCompilerOptions)

  // Get source of the specified file
  const source = program.getSourceFile('src/sandbox/core/Center.ts')

  it('simple source', () => {
    // Print AST
    if (source) {
      // console.log(source.statements)

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
