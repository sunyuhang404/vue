/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

/**
 * createCompilerCreator: 编译器, 高阶函数
 * template: 模板 用来描述 UI 的
 * options: 编译器参数
 */
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 把模板解析成 AST
  const ast = parse(template.trim(), options)
  // 遍历 AST, 标记静态节点
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  // 把 AST 转成 render 函数
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
