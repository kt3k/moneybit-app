# moneybit-app WIP

> オープンソースの会計処理アプリ (フリーランサー向け)

[![CircleCI](https://circleci.com/gh/kt3k/moneybit-app.svg?style=svg)](https://circleci.com/gh/kt3k/moneybit-app)
[![codecov](https://codecov.io/gh/kt3k/moneybit-app/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/moneybit-app)

## [タスクボード(ZenHub)](https://app.zenhub.com/workspaces/5ab24577a208ae2ed71377b1/boards?repos=85275656)

## [最新モック](https://kt3k.github.io/moneybit-app/app/pages/journal/)

## [ドメインモデル](https://kt3k.github.io/moneybit-app/domaindoc/)

## [i18nリソース](https://kt3k.github.io/moneybit-app/langsheet/)

# 概要

- 経理アプリ
- 100% オープンソース
- フリーランス非小売業向け
- 年次取引数1000未満の個人事業主がメインターゲット

# Goals

- このアプリだけで日本で確定申告が出来る
- アプリに適切に入力すれば、電卓を一切使わずに決算書の各項目を入力できる

# Non-Goals

- 決算書自体の出力, 確定申告書の出力
- 日本以外の国のサポート (issue で上がったら順次対応していきたい, 初期リリースでは must ではない)
- 小売など, 取引数の多い業種のサポート, PoS 連携
- 複式簿記を知らないユーザーのサポート

# High level architecture

- WebView app
  - Use [straw][straw] as native bridging framework.
- Use [capsid][capsid] as UI framework.
- Use DDD as design architecture of business logic.
  - Use [moneybit-domain][moneybit-domain] as core domain.
- Use [bulma][bulma.io] for css framework.
  - could be changed later.
- Store journal data in straw.Storage.
- i18n with [t10][t10].
- transpile with babel
- bundle scripts with browserify (I like it)
- build the static resources with [bulbo][bulbo].
- test with karma, mocha, chai.
- test coverage with istanbul and codecov.
- ci with circle-ci.

# Wireframes

[![](https://kt3k.github.io/moneybit-app/design/ss.png)](https://sketch.cloud/s/akwkv)

# Features

- Can manage multiple journals. Can switch journals.
- Can set up/modify period of each journal.

# License

MIT

[straw]: https://github.com/strawjs
[capsid]: https://github.com/capsidjs/capsid
[moneybit-domain]: https://github.com/kt3k/moneybit
[bulma.io]: https://bulma.io
[bulbo]: https://npm.im/bulbo
[t10]: https://npm.im/t10
