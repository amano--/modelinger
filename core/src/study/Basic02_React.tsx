import React,{FC} from 'react'
// import styled from 'styled-components'

// ユーザ定義のコンポーネントの名前は大文字で始めること
//  [ React 公式 / JSX を深く理解する ]( https://ja.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized )
//
//  JSX.IntrinsicElements の説明
//
// Props の型の説明
//   <form action="xxx.php" method="post"/>
//    ↓
//   props = {action:"",method:"post"}
//
// 複数タグは return できないことの説明

type ColorProps = { color: string ,text:string}
// FC (FunctionComponentのショートハンド) 定義の基本形。
// React.FC の 型引数は必ずつける。

const ColorNode: React.FC<ColorProps> = (props) => (
  // <> は <React.Fragment> のショートハンド
  <>
    <p style={ { background:props.color } }> { props.text } </p>
    { props.children }
  </>
)
const hoge =""
type Fuga = hoge

const ChildNode: React.FC = () => <p>I am child.</p>


export type BlueProps = { blue: string }

const BlueNode: React.FC<BlueProps> = (props) => {
  // { 記法だと処理が挟めてしまうので、上記の記法が基本。
  // hooks を使いたい、等の場合に限りこの記法にする。
  console.log(`BlueNode : props=${props}`)

  return (
    <>
      <p> I am {props.blue} </p>
      {props.children}
    </>
  )
}

const StyledBlueNode = styled(BlueNode)`
  background: blue;
`

export type PanelProps = RedProps & BlueProps

export const Panel: React.FC<PanelProps> = (props) => (
  <>
    <StyledRedNode {...props}>
      {/* 属性の上書き方法 */}
      <StyledBlueNode {...props} blue="bluee" />
    </StyledRedNode>
  </>
)

// 上記JSX は 下記 JavaScriptに置き換えられる。
export const RawPanel: React.FC<PanelProps> = (props) =>
  React.createElement(
    React.Fragment,
    props,

    React.createElement(
      StyledRedNode,
      props,

      React.createElement(StyledBlueNode, { ...props, blue: 'bluee' })
    )
  )
