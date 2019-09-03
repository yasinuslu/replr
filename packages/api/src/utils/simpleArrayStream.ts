import { Writable } from 'stream';

export class SimpleArrayStream extends Writable {
  public data: string[];

  constructor(options = {}) {
    super(options);
    this.data = [];
  }

  // eslint-disable-next-line no-underscore-dangle
  _write(chunk: any, enc: any, next: any) {
    this.data.push(chunk.toString());
    next();
  }
}
