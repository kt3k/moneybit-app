const bulbo = require('bulbo')
const { asset } = bulbo
const frontMatter = require('gulp-front-matter')
const nunjucks = require('gulp-nunjucks-render')
const layout1 = require('layout1')
const postcss = require('gulp-postcss')
const postcssImport = require('postcss-import')
const bundle = require('bundle-through')
const path = require('path')

const src = path.join(__dirname, 'src')
const basepath = process.env.BASEPATH || ''

const paths = {
  src: {
    njk: {
      pages: `${src}/*/index.njk`,
      layoutRoot: `${src}/common`,
      all: `${src}/**/*.njk`
    },
    js: {
      pages: `${src}/*/index.js`,
      i18n: `${src}/i18n/*.js`,
      all: `${src}/**/*.js`
    },
    css: {
      pages: `${src}/*/index.css`,
      all: `${src}/**/*.css`
    },
    img: {
      all: `${src}/**/*.svg`
    },
    vendor: `${src}/vendor/**/*.*`
  }
}

const data = { src, basepath }

bulbo.debugPagePath('__moneybit__')
bulbo.base(src)

// html
asset(paths.src.njk.pages)
  .watch(paths.src.njk.all)
  .pipe(frontMatter({ property: 'fm' }))
  .pipe(nunjucks({ data }))
  .pipe(layout1.nunjucks(file => (
    `${paths.src.njk.layoutRoot}/${file.fm.layout || 'tab-layout'}.njk`
  ), { data }))

// js
asset(paths.src.js.pages, paths.src.js.i18n)
  .watch(paths.src.js.all)
  .pipe(bundle({ transform: 'babelify' }))

// css
asset(paths.src.css.pages)
  .watch(paths.src.css.all)
  .pipe(postcss([postcssImport()]))

// vendor
asset(paths.src.vendor)

// img
asset(paths.src.img.all)
