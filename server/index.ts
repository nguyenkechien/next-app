import path from 'path';
import fs from 'fs';
import https from 'https';
import http, { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import type { NextServer } from 'next/dist/server/next';
import bodyParser from 'body-parser';
import express from 'express';

const serverApp = express();
serverApp.use(bodyParser.urlencoded({ extended: true }));
serverApp.use(bodyParser.json());

interface StartServer {
  dev: boolean;
  isHttps?: boolean;
  app: NextServer;
  rootPath: string;
}
const httpsOpt = {
  key: fs.readFileSync(path.join(__dirname, 'https', 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'https', 'server.crt')),
};

const startServer = ({ dev, app, isHttps, rootPath }: StartServer) => {
  const handle = app.getRequestHandler();
  if (dev) {
    https.globalAgent.options.rejectUnauthorized = false;
    serverApp.use(
      '/fonts',
      express.static(path.join(rootPath, 'src', 'assets', 'fonts')),
    );
  }

  const handleCreateServer = (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  };

  serverApp.get('/user/:username', function (req, res) {
    const { username } = req.params;
    app.render(req, res, '/user', { username });
  });
  serverApp.get('*', handleCreateServer);
  const server = isHttps
    ? https.createServer(httpsOpt, serverApp)
    : http.createServer(serverApp);
  return server;
};

export { startServer };
