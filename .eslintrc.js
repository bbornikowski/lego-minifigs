module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  rules: {
    camelcase: 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
        vueIndentScriptAndStyle: true,
        singleAttributePerLine: true,
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
          },
          {
            pattern: '~icons/**',
            group: 'external',
          },
        ],
        groups: [
          ['external', 'builtin'],
          ['internal', 'parent'],
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
