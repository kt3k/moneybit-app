# moneybit-app (now 企画フェーズ)

バランスシート作成アプリ

- フリーランスエンジニア/デザイナ/コンサルタント向け
- 年次取引数1000未満の個人事業主がメインターゲット

# High level architecture

- WebView app
  - Use [straw][straw] as native bridging framework.
- Use [capsid][capsid] as UI framework.
- Use [moneybit-domain][moneybit-domain] as core domain

# License

MIT

[straw]: https://github.com/strawjs
[capsid]: https://github.com/capsidjs/capsid
[moneybit-domain]: https://github.com/kt3k/moneybit
