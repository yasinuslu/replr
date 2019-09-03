import Docker from 'dockerode';
import fs from 'fs';
import { SimpleArrayStream } from './utils/simpleArrayStream';

type Platform = 'node';

const pullImage = (docker: Docker, image: string) =>
  new Promise(resolve =>
    docker.pull(image, (__: any, stream: any) => {
      docker.modem.followProgress(stream, resolve);
    }),
  );

export class DockerRunner {
  docker: Docker;

  platformImages = {
    node: 'node:alpine',
  };

  constructor({ docker }: { docker: Docker.DockerOptions }) {
    this.docker = new Docker(docker);
  }

  getImage(platform: Platform) {
    return this.platformImages[platform];
  }

  async prepare() {
    await Promise.all(
      Object.values(this.platformImages).map(image => pullImage(this.docker, image)),
    );
  }

  async execute(
    platform: Platform,
    code: string,
    outputStream: NodeJS.WritableStream = new SimpleArrayStream(),
  ) {
    const container: Docker.Container = await this.docker.run(
      this.getImage(platform),
      ['node', '-e', code],
      outputStream,
    );

    container.remove();

    return outputStream.data
      .reduce((acc: string, nextString: string) => acc + nextString, '')
      .split('\r\n');
  }
}

export const dockerRunner = new DockerRunner({
  docker: {
    host: 'dind',
    port: 2376,
    ca: fs.readFileSync('/certs/ca/cert.pem'),
    cert: fs.readFileSync('/certs/ca/cert.pem'),
    key: fs.readFileSync('/certs/ca/key.pem'),
  },
});
