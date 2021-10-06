require('dotenv').config();

export const serverConfig = {
  https: true,
  port: process.env.PORT || 3000,
  __DEV__: process.env.NODE_ENV !== 'production',
  env: {
    NODE_ENV: process.env.NODE_ENV,
    BABEL_ENV: process.env.NODE_ENV,
  },
};
