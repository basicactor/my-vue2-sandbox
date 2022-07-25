// https://nishinatoshiharu.com/indexsignatures-overview/

//[key:T]:U
//プロパティ：string, value:string
//-------------------------------------------
type ObjType = { [key: string]: string }

export const obj: ObjType = {
  id: "1",
  name: "john",
  nickName: "jonney",
}

//プロパティ：string or number, value:string
//-------------------------------------------
type ObjType2 = { [key in string | number]: string }

//プロパティに数字を設定されるが、JSの制約上、オブジェクトのプロパティは文字列と決まっているので、
//自動で文字列に変換される。 0=> "0" ↓↓（参考資料）
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Working_with_Objects#objects_and_properties
export const obj2: ObjType2 = {
  id: "1",
  0: "haha",
}

//プロパティ：Mapped type = [key in ~~], value:string
//Mapped typeを使うと固定プロパティを書けない。
//Mapped typeを使うとsymbol型もキーに出来る。
//-------------------------------------------
type PropertyName = "name" | "nickName"

type ObjType3 = { [key in PropertyName]: string }

export const obj3: ObjType3 = {
  name: "kevin",
  nickName: "key",
  // nana: "haha", //定義されてないので怒られる。
}

//固定プロパティを追加したい場合は&でつなげる
type ObjType3Plus = { [key in PropertyName]: string } & {
  id: string
}

export const obj3Plus: ObjType3Plus = {
  id: "1",
  name: "kevin",
  nickName: "ky",
}

//プロパティ：固定プロパティ＋型プロパティ, value:string
//-------------------------------------------

type ObjType4 = { id: string; [key: string]: string }

export const obj4: ObjType4 = {
  id: "1",
  name: "kevin",
  nickName: "key",
  // nana: "haha", //定義されてないので怒られる。
}

//プロパティ：readonly, value:string
//-------------------------------------------

type ObjType5 = { readonly [key: string]: string }

export const obj5: ObjType5 = {
  id: "1",
  name: "kevin",
  nickName: "key",
  // nana: "haha", //定義されてないので怒られる。
}

//定義したobjにアクセスしてみる。（怖い）
//obj3以外はコンパイルエラーが出ない。。
// https://qiita.com/aakasaka/items/0b081c90b1b99b82143c
//-------------------------------------------

obj.nana //存在しないプロパティにアクセスしても怒られない。（補完も効かない）
obj.nana = "aaa" //存在しないプロパティに代入しても怒られない。

obj2.nana //存在しないプロパティにアクセスしても怒られない。（補完も効かない）
obj2.nana = "aaa" //存在しないプロパティに代入しても怒られない。

// obj3.nana //存在しないプロパティにアクセスすると怒られる。（補完が効く）

obj4.nana //存在しないプロパティにアクセスしても怒られない。（補完は定義したキーのみ効く）
obj4.nana = "aaa" //存在しないプロパティに代入しても怒られない。

obj5.nana //存在しないプロパティにアクセスしても怒られない。（補完も効かない）
// obj5.nana = "aaa" //readonlyにしているので代入不可

//================================== ===========================
//================================== interface ===========================
//================================== ===========================

//プロパティ：string, value:string
//-------------------------------------------
interface ObjInterface {
  [key: string]: string
}

export const objInter: ObjInterface = {
  id: "1",
  name: "john",
  nickName: "jonney",
}

//プロパティ：string or number, value:string
//-------------------------------------------
interface ObjInterface2 {
  [key: string]: string
  [key: number]: string
}

export const objInter2: ObjInterface2 = {
  id: "1",
  0: "haha",
}

//interfaceではkey in propertyName が使えない。
//-------------------------------------------
// type propertyName = "name" | "nickName"
interface Properties {
  name: string
  nickName: string
}

//これもエラーになる
interface ObjInterface3 {
  // [key in Keyof Properties]: string
}

export const objInter3: ObjInterface3 = {
  name: "kevin",
  nickName: "key",
  // nana: "haha", //定義されてないので怒られる。
}

//定義したobjにアクセスしてみる。（怖い）
//obj3以外はコンパイルエラーが出ない。。
// https://qiita.com/aakasaka/items/0b081c90b1b99b82143c
//-------------------------------------------

objInter.nana //存在しないプロパティにアクセスしても怒られない。（補完も効かない）
objInter.nana = "aaa" //存在しないプロパティに代入しても怒られない。

objInter2.nana //存在しないプロパティにアクセスしても怒られない。（補完も効かない）
objInter2.nana = "aaa" //存在しないプロパティに代入しても怒られない。

// objInter3.nana //存在しないプロパティにアクセスすると怒られる。（補完も効く）
