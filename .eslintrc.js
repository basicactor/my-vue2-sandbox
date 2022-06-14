module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off", //追加
    // semi: ["error", "never", { beforeStatementContinuationChars: "never" }],
    // "semi-spacing": ["error", { after: true, before: false }],
    // "semi-style": ["error", "first"],
    // "no-extra-semi": "error",
    // "no-unexpected-multiline": "error",
    // "no-unreachable": "error",
    "vue/valid-v-slot": ["error", { allowModifiers: true }],
  },
}
