const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const paths = require('../scripts/paths');

const IS_DEV = process.env.NODE_ENV !== 'production';

const SERVER_PORT = process.env.PORT || 3000;
const CONTENT_PORT = IS_DEV ? SERVER_PORT + 1 : SERVER_PORT;

const MATCH_JS = /\.js$/i;
const MATCH_CSS_LESS = /\.(css|less)$/i;
const MATCH_FONTS = /\.(eot|ttf|woff|woff2|svg)(\?.+)?$/;

const POSTCSS_LOADER = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      }),
    ],
  },
};

const DEFINE_PLUGIN = new webpack.DefinePlugin({
  'process.env.NODE_ENV': IS_DEV ? JSON.stringify('development') : JSON.stringify('production'),
  'process.env.DPAYID_CLIENT_ID': JSON.stringify(
    process.env.DPAYID_CLIENT_ID || 'dsocial.dapp',
  ),
  'process.env.DPAYID_REDIRECT_URL': JSON.stringify(
    process.env.DPAYID_REDIRECT_URL || 'https://dsocial.io/callback',
  ),
  'process.env.DPAYID_HOST': JSON.stringify(
    process.env.DPAYID_HOST || 'https://go.dpayid.io',
  ),
  'process.env.DPAYJS_URL': JSON.stringify(process.env.DPAYJS_URL || 'https://api.dpays.io'),
  'process.env.SIGNUP_URL': JSON.stringify(
    process.env.SIGNUP_URL || 'https://signup.dpays.io/?ref=dsocial',
  ),
  'process.env.MANIFEST_PATH': JSON.stringify(paths.assets),
});

module.exports = {
  SERVER_PORT,
  CONTENT_PORT,
  MATCH_JS,
  MATCH_CSS_LESS,
  MATCH_FONTS,
  POSTCSS_LOADER,
  DEFINE_PLUGIN,
};
