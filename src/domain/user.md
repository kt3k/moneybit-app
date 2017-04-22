---
name: User
desc: The user
src: https://github.com/kt3k/moneybit-app/blob/master/src/domain/user.js
props:
- name: id
  type: string
  desc: The id of the user, randomly generated, maybe never used
- name: documentIds
  type: string[]
  desc: The ids of the documents the user has
- name: documentNames
  type: Map<string, string>
  desc: The mapping from the id to the name of the documents
- name: settings
  type: UserSettings
  desc: The settings of the user
---

The user model.
