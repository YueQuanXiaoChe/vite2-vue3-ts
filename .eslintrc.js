module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  // 解析器
  parserOptions: {
    // 指定使用的 ECMAScript 版本
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    // 设置为 "script" (默认)或 "module"（如果你的代码是 ECMAScript 模块)
    sourceType: 'module',
    jsxPragma: 'React',
    // 额外的语言特性
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  // 启用一系列核心规则，这些规则报告一些常见问题
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['vue', '@typescript-eslint'],
  // eslint规则表：http://eslint.cn/docs/rules/
  // typescript-eslint 规则表：https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
  // eslint-plugin-vue 规则表：https://eslint.vuejs.org/rules/
  rules: {
    // 禁止使用注释 @ts-ignore 忽略下一行代码中产生的所有错误
    '@typescript-eslint/ban-ts-ignore': 'off',
    // 禁止使用注释 @ts-<directive>
    '@typescript-eslint/ban-ts-comment': 'off',
    // 需要函数和类方法的显式返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 不允许使用 any 类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 不允许使用 require 语句，除非在导入语句中
    '@typescript-eslint/no-var-requires': 'off',
    // 禁止空函数
    '@typescript-eslint/no-empty-function': 'off',
    // 不允许在定义变量之前使用它们
    '@typescript-eslint/no-use-before-define': 'off',
    // 禁止使用特定类型
    '@typescript-eslint/ban-types': 'off',
    // 不允许使用！后缀运算符
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 导出的函数和类的公共类方法需要显式返回和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 不允许未使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    // 禁止出现未使用过的变量
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': 'off',
    // 禁止在变量定义之前使用它们
    'no-use-before-define': 'off',
    // 强制自定义事件的名称的规则
    'vue/custom-event-name-casing': 'off',
    // 强制属性顺序
    'vue/attributes-order': 'off',
    // 强制每个组件都应该独立成一个文件
    'vue/one-component-per-file': 'off',
    // 要求或禁止在标记的右括号前换行
    'vue/html-closing-bracket-newline': 'off',
    // 强制每行的最大属性数
    'vue/max-attributes-per-line': 'off',
    // 在多行元素的内容前后需要换行符
    'vue/multiline-html-element-content-newline': 'off',
    // 在单行元素的内容前后需要换行符
    'vue/singleline-html-element-content-newline': 'off',
    // 对模板中的自定义组件的属性，强制使属性连字符
    'vue/attribute-hyphenation': 'off',
    // 为每个未标记为必需的 prop（布尔属性除外）设置默认值
    'vue/require-default-prop': 'off',
    // 强制自动关闭样式
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
};
