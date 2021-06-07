# 基礎知識講座 要約

React + Typescript で開発する際、必要になる知識をハンズオン形式で学べる様に作ったサンプルプロジェクトです。
解説付きでないと、よくわからない構成になっているので、解説なしで読む場合は注意してください。

[ Typescript 基本 ](./src/study/Basic01_Typescript.ts)

[ React 基本 ](./src/study/Basic02_React.tsx)

[ React Testing Library 基本 ](./src/study/Basic03_TestingLibrary.test.tsx)


### 環境構築についての備考

npm install -g npm-check-updates

[ typescript-nextjs-starter ]( https://github.com/jpedroschmitz/typescript-nextjs-starter ) をベースに以下のライブラリーを追加し構築

"husky": {
    "hooks": {
      "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  
- storybook

- testing-library

- eslint-config-airbnb-typescript

- react-spectrum 関連と lodash-es

```
yarn add @adobe/react-spectrum

yarn add react-stately

yarn add react-aria

yarn add @types/lodash-es

```