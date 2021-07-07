import * as ts from 'typescript'
import { Declaration } from 'typescript'

// ref https://github.com/ktsn/ts-compiler-api-examples/blob/42eeb5222e607483f591c53bcea30b47b099ae52/src/4-read-type-info.ts

const files = ['src/sandbox/core/Center.ts']

const program = ts.createProgram(files, {})

const checker = program.getTypeChecker()

// Get source of the specified file
const source = program.getSourceFile('src/sandbox/core/Center.ts')

describe('ast', () => {
  // Create program

  it('template literal', () => {
    // const template = `hoge=${1} fuga=${2}`

    // console.log('template=', template)

    var say = '手の中にある一羽 > ヤブの中の二羽'
    var html = htmlEscape`<div> 私はこのように言いたい : ${say}</div>`

    // タグ関数の例
    function htmlEscape(literals: TemplateStringsArray, ...placeholders: string[]) {
      let result = ''

      // プレースホルダをリテラルに埋め込む
      for (let i = 0; i < placeholders.length; i++) {
        result += literals[i]
        result += placeholders[i]
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
      }

      // 最後のリテラルを追加する
      result += literals[literals.length - 1]
      return result
    }

    console.log('html=', html)
  })

  it('simple source', () => {
    console.log('program.getTypeCatalog() =', program.getTypeCatalog())
    // console.log('source=', source)

    // console.log('program=', program.getSourceFileByPath())
    // console.log('source=', )

    if (source) {
      console.log('# Exported Type List\n')
      ts.forEachChild(source, function next(node) {
        // Document exported classes
        // isExported(node) &&
        if (ts.isTypeAliasDeclaration(node) && node.name) {
          // Get the type of class instance
          const type = checker.getTypeAtLocation(node)

          // Get the symbol of class constructor
          const ctorSymbol = checker.getSymbolAtLocation(node.name)
          if (!ctorSymbol) return

          console.log(printClassDoc(type, ctorSymbol))
        }
      })
    }
  })
})

function printClassDoc(type: ts.Type, ctorSymbol: ts.Symbol): string {
  // Print class name
  let buf = '## ' + ctorSymbol.name + '\n'

  // Print constructor type
  const ctorType = checker.getTypeOfSymbolAtLocation(ctorSymbol, ctorSymbol.valueDeclaration!)
  ctorType.getConstructSignatures().forEach((sig) => {
    // parameter types
    const params = sig.parameters.map(serializeSymbol)

    // return type
    const ret = checker.typeToString(sig.getReturnType())

    buf += '\nnew (' + params.join(', ') + ') => ' + ret + '\n'
  })

  buf += '\n### Properties\n'

  // Print properties
  type.getProperties().forEach((p) => {
    buf += '\n- ' + serializeSymbol(p)
    if (p.name === 'refSample') {
      console.log('refSample=', p)
      // console.log('refSample.exports=', p.exports)
      // ref https://stackoverflow.com/questions/59838013/how-can-i-use-the-ts-compiler-api-to-find-where-a-variable-was-defined-in-anothe
      console.log('import = ', p.declarations[0].getText())
      // console.log('import = ', p.declarations[0].parent.parent.parent.getText())
    }
  })

  return buf + '\n'
}

function serializeSymbol(symbol: ts.Symbol): string {
  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
  return symbol.name + ': ' + checker.typeToString(type)
}

function isExported(node: ts.Node): boolean {
  return (ts.getCombinedModifierFlags(node as Declaration) & ts.ModifierFlags.Export) !== 0
}
