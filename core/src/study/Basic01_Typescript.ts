/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom/extend-expect'

// ============================================================================
// Structural Subtyping(構造的部分型)(TypeScript) と
// Nominal Subtyping(公称的部分型)(Java等) 違いについて
// ============================================================================
// 【 参考 】
// [ TypeScript: 異なる2つの型システム「公称型」と「構造的部分型」 ]( https://qiita.com/suin/items/52cf80021361168f6b0e )
// ============================================================================

type Foo = {foo : (a:number) => string}
type Bar = {foo : (a:number) => string}

// Javaでいうと 無名クラスのインスタンスを生成しているイメージ
const hoge = { foo : (a:number) => {return "hoge"}}  

const foo:Foo = hoge
const bar:Bar = hoge

const foo2:Foo = bar

interface Foo2 {
  foo(a:number):string
}

class Foo2Impl implements Foo2 {
  foo(a:number):string{
    return "Foo3"
  }

}

const foo3:Foo = new Foo2Impl()

/*

Java ( Nominal Subtyping ) では以下の型は別の型だが、Structural Subtyping 目線では同じとみなされる。

```java

interface Foo {
  String foo(int a);
}

interface Bar {
  String bar(int a);
}

```

Foo foo = new Bar{ ..(略).. } 
  Nominal Subtyping    -> X 
  Structural Subtyping -> O

*/

// VSCode 機能説明
// 用語説明
// 型引数 オブジェクト 型注釈 リテラル書式 無名型
class Animal {
  public name = ''
}

class User {
  public name = ''
}

let user: User = new User()
let animal: Animal = new Animal()
user = animal // OK
animal = user // OK

type HasNameType = { name: string }

const a: HasNameType = user
const b: { name: string } = animal

type HasManyFieldType = {
  a: string
  b: string
  c: string
  d: string
  e: string
  f: string
}

type HasNameWithManyFieldType = HasNameType & HasManyFieldType

// [ HandsOn ] なにかのプロパティをコメントアウトすると 謎のエラーが発生することを確認
// [ HandsOn ] 補完リストをだして、足りないプロパティを確認
const c: HasNameWithManyFieldType = {
  name: 'aaaaa',
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
  f: 'aa'
}

// [ TypeScriptの型初級 / 標準ライブラリの型 ]( https://qiita.com/uhyo/items/da21e2b3c10c8a03952f#%E6%A8%99%E6%BA%96%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%AE%E5%9E%8B )
type PartialHasManyFieldType = Partial<HasManyFieldType>
type HasNameWithManyFieldType2 = HasNameType & PartialHasManyFieldType

// 全プロパティを number に変換させる型を生成
type ToNumber<T> = { [P in keyof T]?: number }
type ToNumberHasManyFieldType = ToNumber<HasManyFieldType>

// [ 説明 ] 型チェックがエラーになることを確認
// const n: ToNumberHasManyFieldType = c

// [ 説明 ] 型注釈を使って、補完機能を機能させる方法
const d: HasNameWithManyFieldType2 = { name: 'aaaaa' }

// [ HandsOn ] c も Pickupする方法の確認。 存在しないプロパティはエラーになる確認
type WithB = Pick<HasManyFieldType, 'b'> // | 'c'  | 'z'
type HasNameWithBType = HasNameType & WithB
const e: HasNameWithBType = { name: 'aaaaa', b: 'b' }

// [ 説明 ]
//  オブジェクト リテラル書式は 型チェックが入るが、変数代入の場合は z のチェックは無視される。
//  as でキャストすると通るが、 as の使用はよく考えて使う。
//  json から b 属性を削除すると型チェックエラーになる。

// const f: HasNameWithBType = { name: 'aaaaa', b: 'b', z: '' } // as HasNameWithBType
const json = { name: 'aaaaa', b: 'b', z: '' }
const g: HasNameWithBType = json

/**
- 特殊な記法
[ JavaScript / 分割代入 ]( https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment )
[ JavaScript / スプレッド構文 ]( https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax )
[ TypeScript 3.7のOptinal Chainig とNullish Coalescingを使ってみた ]( https://qiita.com/YukiIchika/items/0c2bd4703aa1396ad8f8 )
*/
