import AssetRev from 'broccoli-asset-rev';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import ESLint from 'broccoli-lint-eslint';
import funnel from 'broccoli-funnel';
import merge from 'broccoli-merge-trees';
import resolve from 'rollup-plugin-node-resolve';
import rollup from 'broccoli-rollup';
import StyleLint from 'broccoli-stylelint';
import uglify from 'rollup-plugin-uglify-es';

import { getEnv } from 'broccoli-env';

import Sass from 'sass';
import SassSourceMaps from 'broccoli-sass-source-maps';

const env = getEnv() || 'development';
const isProduction = env === 'production';

const appRoot = '_assets';
const compileSass = SassSourceMaps(Sass);

let tree = [];

let js = ESLint.create(`${appRoot}/javascripts`, { persist: true });

const rollupPlugins = [
  resolve(),
  commonjs(),
  babel()
];

if (isProduction) {
  rollupPlugins.push(uglify());
}

let appJs = rollup(js, {
  rollup: {
    input: 'app.js',
    output: {
      file: 'application.js',
      format: 'es',
      sourcemap: !isProduction
    },
    plugins: rollupPlugins
  }
});

tree.push(appJs);


// TEST 1
//
// let css = StyleLint.create(`${appRoot}/stylesheets`, {
//   disableTestGenerator: true
// });

let css = funnel(`${appRoot}/stylesheets`);

// TEST 2
//
// css = StyleLint.create(css, {
//   disableTestGenerator: true
// });


css = compileSass(
  [
    css,
    'node_modules/bootstrap',
    'node_modules/@fortawesome/fontawesome-free/scss'
  ],
  'style.scss',
  'application.css',
  {
    sourceMap: false,
    sourceMapContents: true,
    annotation: 'SCSS Files'
  }
);

tree.push(css);

const images = funnel(appRoot, {
  srcDir: 'images',
  destDir: '/',
  annotation: 'Images'
});

tree.push(images);

const fontAwesome = funnel('node_modules/@fortawesome/fontawesome-free', {
  srcDir: 'webfonts',
  destDir: './font-awesome',
  annotation: 'FontAwesome'
});

tree.push(fontAwesome);



tree = merge(tree, { annotation: 'Final output' });

if (isProduction) {
  tree = new AssetRev(tree, {
    exclude: ['assetMap.json', 'font-awesome'],
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg'],
    generateAssetMap: true,
    assetMapPath: 'assetMap.json'
  });
}

export default () => tree;
