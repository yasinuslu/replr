export interface ParserResultType {
  tree: any;
  dependencies: string[];
}

export interface ParserType {
  parse: (code: string) => ParserResultType;
}
