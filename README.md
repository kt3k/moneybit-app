# moneybit-app WIP

> オープンソースの会計処理アプリ (フリーランサー向け)

[![CircleCI](https://circleci.com/gh/kt3k/moneybit-app.svg?style=svg)](https://circleci.com/gh/kt3k/moneybit-app)
[![codecov](https://codecov.io/gh/kt3k/moneybit-app/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/moneybit-app)


- 経理アプリ
- 100% オープンソース
- フリーランス非小売業向け
- 年次取引数1000未満の個人事業主がメインターゲット

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

![](https://kt3k.github.io/moneybit-app/design/ss.png)

# Features

- Can manage multiple journals. Can switch journals.
- Can set up/modify period of each journal.

# References

## [ZenHub](https://app.zenhub.com/workspaces/5ab24577a208ae2ed71377b1/boards?repos=85275656)

## [Domaindoc](https://kt3k.github.io/moneybit-app/domaindoc/)

## [Langsheet](https://kt3k.github.io/moneybit-app/langsheet/)

# License

MIT

[straw]: https://github.com/strawjs
[capsid]: https://github.com/capsidjs/capsid
[moneybit-domain]: https://github.com/kt3k/moneybit
[bulma.io]: https://bulma.io
[bulbo]: https://npm.im/bulbo
[t10]: https://npm.im/t10
