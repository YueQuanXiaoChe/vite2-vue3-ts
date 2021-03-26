/*
 * @Author: wang xue
 * @Description:
 */
module.exports = {
  printWidth: 100, // 一行的字符数，如果超过会进行换行，默认为 80
  tabWidth: 2, // 一个tab代表几个空格数
  useTabs: false, // 是否使用 tab 进行缩进，默认为 false，表示用空格进行缩减
  semi: true, // 句尾添加分号
  singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
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
