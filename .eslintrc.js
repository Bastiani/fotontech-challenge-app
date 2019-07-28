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
    "prettier/prettier": 0,
    "import/prefer-default-export": 0,
    "comma-dangle": [2, "always-multiline"],
    quotes: [2, "single", { allowTemplateLiterals: true }],
    "react/prop-types": 0,
    "no-case-declarations": 0,
    "react/jsx-no-bind": 0,
    "react/display-name": 0,
    "new-cap": 0,
    "no-unexpected-multiline": 0,
    "no-class-assign": 1,
    "no-console": 2,
    "object-curly-spacing": [1, "always"],
    "flowtype/define-flow-type": 0,
    "flowtype/use-flow-type": 0,
    "import/first": 2,
    "import/default": 0,
    "no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "no-extra-boolean-cast": 0,
    "import/named": 0,
    "import/namespace": [2, { allowComputed: true }],
    "import/no-duplicates": 2,
    "import/order": [2, { "newlines-between": "always-and-inside-groups" }],
    "react/no-children-prop": 1,
    "react/no-deprecated": 1,
    "import/no-cycle": 1,
    "import/no-self-import": 1,
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx"]
      }
    ]
  }
};
