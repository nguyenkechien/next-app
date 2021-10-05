import { startServer } from "./server";
import next from "next";
import { serverConfig } from "./config/server";

const { __DEV__: dev, https, port } = serverConfig;
const app = next({ dev });

app.prepare().then(() => {
  const server = startServer({ dev, app, isHttps: https });
  server.listen(port);
  const serverUrl = `${https ? "https" : "http"}://localhost:${port}`;
  console.log(
    `> Server listening at ${serverUrl} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
