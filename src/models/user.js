export default class User {
  #name = "john"
  constructor() {
    this.name = "aa"
    return { a: "a", b: "b" } //no-constructor-returnを設定しても聞かない
  }
}
