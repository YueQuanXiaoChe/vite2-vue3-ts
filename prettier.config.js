/*
 * @Author: wang xue
 * @Description:
 */
module.exports = {
  printWidth: 100, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  semi: true, // 句尾添加分号
  singleQuote: true, // 使用单引号代替双引号
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  trailingComma: 'none', // 多行时是否添加尾随逗号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  jsxBracketSameLine: false, // 将 > 放在多行JSX元素的最后一行的末尾，而不是放在下一行（不适用于自闭合元素）
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  arrowParens: 'always', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号括
  requirePragma: false, // 仅格式化在文件顶部包含特殊注释（称为编译指示）的文件
  insertPragma: false, // 在文件顶部插入一个特殊的@format标记，以指定文件已使进行了格式化
  htmlWhitespaceSensitivity: 'ignore', // 指定HTML文件的全局空格敏感度
  vueIndentScriptAndStyle: false, // 是否缩进Vue文件中的代码 <script> 和 <style> 标记
  endOfLine: 'lf', // 设置统一的行结尾样式
  embeddedLanguageFormatting: 'auto' // 是否识别嵌入式代码，对其进行格式化
};
