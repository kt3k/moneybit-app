const bulbo = require('bulbo')
const { asset } = bulbo
const frontMatter = require('gulp-front-matter')
const nunjucks = require('gulp-nunjucks-render')
const layout1 = require('layout1')
const sass = require('gulp-sass');
const bundle = require('bundle-through')
const path = require('path')

require('nunjucks').configure({ noCache: true })

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
      all: `${src}/**/*.{js,json}`
    },
    scss: {
      pages: `${src}/*/index.scss`,
      all: `${src}/**/*.scss`
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
asset(paths.src.scss.pages)
  .watch(paths.src.scss.all)
  .pipe(sass())

// vendor
asset(paths.src.vendor)

// img
asset(paths.src.img.all)
