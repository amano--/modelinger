import React from '~/answer/node_modules/react'
import { render, prettyDOM } from '~/answer/node_modules/@testing-library/react'
const DEBUG = true

describe('Variation Test', () => {
  test('Simple DOM Draw Check', () => {
    const Hello: React.FC = (props) => (
      <>
        <p>Hello World</p>
        {props.children}
      </>
    )

    const { baseElement } = render(<Hello></Hello>)

    const domText = prettyDOM(baseElement)
    if (DEBUG) console.log(domText)

    expect(domText).toContain('Hello')

    // [ 説明 ] .not で、反対のチェックができる。
    expect(domText).not.toContain('Hoge')
  })

  // 「 問題 」
  // message: string  プロパティを持つ Props 型を宣言し、その型を持つ FCを作成し、
  // props で渡した message が、DOMに表示されることを確認するテストを書いてください。
})
