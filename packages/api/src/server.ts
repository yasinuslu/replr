import path from 'path';
import express from 'express';
import cors from 'cors';
import { dockerRunner } from './docker';
import { createRequestHandler } from './utils';

(async () => {
  console.log('test4 Started running in: ', path.resolve(__dirname));

  // if (process.env.NODE_ENV === 'development') {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  // }

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({ ready: true });
  });

  app.post(
    '/exec',
    createRequestHandler(async (req: express.Request, res: express.Response) => {
      const { platform, code } = req.body;
      const result = await dockerRunner.execute(platform, code);
      return result;
    }),
  );

  console.log('Preparing docker runner');

  await dockerRunner.prepare();

  await new Promise(resolve => {
    app.listen(3000, resolve);
  });

  console.log('Server is listening on http://localhost:3000');
})();
