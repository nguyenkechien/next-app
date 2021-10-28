import next from 'next';
import { startServer } from './server/index';
import { serverConfig } from './server/config/server';

const { __DEV__: dev, https, port, rootPath } = serverConfig;
const app = next({ dev });

app.prepare().then(() => {
  startServer({ dev, app, isHttps: https, rootPath }).listen(port);
  const serverUrl = `${https ? 'https' : 'http'}://localhost:${port}`;
  console.log(
    `> Server listening at ${serverUrl} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  );
});
