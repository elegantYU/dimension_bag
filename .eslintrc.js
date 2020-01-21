module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    chrome: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
