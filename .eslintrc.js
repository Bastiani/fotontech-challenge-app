module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb", "@react-native-community", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    quotes: [2, "single", { allowTemplateLiterals: true }],
    "prettier/prettier": 0
  }
};
