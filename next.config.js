const path = require("path");

const isDev = process.env.NODE_ENV !== "production";
/** @type {import('next').NextConfig} */
module.exports = {
  distDir: "dist/.next",
  reactStrictMode: true,
  serverRuntimeConfig: {
    rootDir: path.join(__dirname, "./"),
  },
  publicRuntimeConfig: {
    isDev,
  },
};
