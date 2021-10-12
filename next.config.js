const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Sync = require('./src/assets/plugins/sync');

const DartSass = require('sass');

const srcFolder = [path.resolve('src')];
const isDev = process.env.NODE_ENV !== 'production';

const MODULE_SASS = [
  MiniCssExtractPlugin.loader,
  'thread-loader',
  {
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
      importLoaders: 2,
      url: false,
      modules: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDev,
      postcssOptions: {
        config: path.join(__dirname, 'src'),
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: isDev,
      additionalData: `@import '@src/assets/sass/librarys';`,
      sassOptions: {
        implementation: DartSass,
        includePaths: [path.join(__dirname, 'src', 'assets', 'sass')],
        outputStyle:
          process.env.NODE_ENV !== 'production' ? 'expanded' : 'compressed',
      },
    },
  },
];

const MODULE_CSS = [
  MiniCssExtractPlugin.loader,
  isDev && 'thread-loader',
  {
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
      importLoaders: 2,
      url: false,
      modules: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDev,
      postcssOptions: {
        config: path.join(__dirname, 'src'),
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: isDev,
      additionalData: `@import '@src/assets/sass/librarys';`,
      sassOptions: {
        implementation: DartSass,
        includePaths: [path.join(__dirname, 'src', 'assets', 'sass')],
        outputStyle:
          process.env.NODE_ENV !== 'production' ? 'expanded' : 'compressed',
      },
    },
  },
];

const rootDir = path.join(__dirname, './');

/** @type {import('next').NextConfig} */
module.exports = {
  distDir: 'dist/.next',
  reactStrictMode: true,
  serverRuntimeConfig: {
    rootDir,
  },
  publicRuntimeConfig: {
    isDev,
  },
  webpack(config, { dev, isServer }) {
    config.plugins.push(
      ...[
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].css',
          experimentalUseImportModule: true,
        }),
        new ESLintPlugin({
          context: rootDir,
          lintDirtyModulesOnly: true,
          cache: true,
        }),
      ],
    );
    config.module.rules.push(
      ...[
        {
          test: /\.(scss|css)$/,
          exclude: /(node_modules|.module.scss|.module.css)/,
          use: MODULE_SASS,
        },
        {
          test: /\.module\.(scss|css)$/,
          exclude: /(node_modules)/,
          use: MODULE_CSS.filter(Boolean),
        },
      ],
    );
    if (!dev) {
      config.plugins.push(
        ...[
          new CopyPlugin({
            patterns: [
              {
                from: path.join(__dirname, 'public'),
                to: path.join(__dirname, 'dist/public'),
              },
              {
                from: path.join(__dirname, 'src', 'assets', 'fonts'),
                to: path.join(__dirname, 'dist/public/fonts'),
              },
            ],
          }),
          new TerserPlugin({
            terserOptions: {
              ecma: 6,
              warnings: false,
              compress: {
                drop_console: true, // remove console
              },
              ie8: false,
            },
          }),
          new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsFilename: 'stats.json',
          }),
          // new Sync({ syncTo: path.join(rootDir, '../', 'next-production') }),
          new Sync({ rootDir, syncTo: path.join(rootDir, 'next-production') }),
        ],
      );
      config.module.rules.push({
        test: /\.(jsx|js|ts|tsx)$/,
        include: srcFolder,
        options: {
          workerParallelJobs: 50,
          workerNodeArgs: ['--max-old-space-size=1024'],
        },
        loader: 'thread-loader',
      });
    } else {
      config.module.rules.push({
        test: /\.(jsx|js|ts|tsx)$/,
        enforce: 'pre',
        include: srcFolder,
        options: {
          configFile: path.resolve('.eslintrc'),
          eslint: {
            configFile: path.resolve(__dirname, '.eslintrc'),
          },
        },
        loader: 'eslint-loader',
      });
      config.devtool = isServer ? false : 'source-map';
    }
    return config;
  },
};
