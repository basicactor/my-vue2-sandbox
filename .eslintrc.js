module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended", //追加
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //以下追加。typescript導入初期は大量のエラーが出るため、全スクリプトにTS無視コマンドを入れる。
    //それを許可するルール
    "@typescript-eslint/ban-ts-comment":
      process.env.NODE_ENV === "production" ? "warn" : "off",
    //vueファイルのsetup関数を空のまま残しておきたいので、エラーをもみ消す。
    "@typescript-eslint/no-empty-function": "off",
    "vue/multi-word-component-names": "off", //追加
    "vue/valid-v-slot": ["off", { allowModifiers: true }],
    "no-throw-literal": "error", //エラーthrow時に文字だけ返すことを禁止する（エラートレース出来ないため）
    "no-constructor-return": "error", //効果なし。なぜ？
  },
}
