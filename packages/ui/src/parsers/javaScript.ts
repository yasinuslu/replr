import { Parser } from 'acorn';
import * as walk from 'acorn-walk';
import { ParserType, ParserResultType } from '../types';

export class JavaScriptParser implements ParserType {
  private Parser: typeof Parser;

  constructor(CurrentParser: typeof Parser = Parser) {
    this.Parser = CurrentParser;
  }

  parse(code: string): ParserResultType {
    const tree = this.Parser.parse(code);
    const dependencies = new Set<string>();

    walk.full(tree, node => {
      if (
        node.type === 'CallExpression' &&
        node.callee.name === 'require' &&
        node.arguments.length &&
        node.arguments[0].value.length
      ) {
        dependencies.add(node.arguments[0].value);
      }
    });

    return { tree, dependencies: [...dependencies] };
  }
}

export const javaScriptParser = new JavaScriptParser();
