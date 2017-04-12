const { asset } = require('bulbo')
const frontMatter = require('gulp-front-matter')
const nunjucks = require('gulp-nunjucks-render')
const layout1 = require('layout1')
const postcss = require('gulp-postcss')
const postcssImport = require('postcss-import')
const bundle = require('bundle-through')

const src = 'src'

const paths = {
  src: {
    njk: {
      pages: `${src}/*/index.njk`,
      tabLayout: `${src}/common/tab-layout.njk`,
      all: `${src}/**/*.njk`
    },
    js: {
      pages: `${src}/*/index.js`,
      all: `${src}/**/*.js`
    },
    css: {
      pages: `${src}/*/index.css`,
      all: `${src}/**/*.css`
    },
    vendor: `${src}/vendor/**/*.*`
  }
}

// html
asset(paths.src.njk.pages)
  .watch(paths.src.njk.all)
  .pipe(frontMatter({ property: 'fm' }))
  .pipe(nunjucks())
  .pipe(layout1.nunjucks(paths.src.njk.tabLayout, { data: { src } }))

// js
asset(paths.src.js.pages)
  .watch(paths.src.js.all)
  .pipe(bundle({}))

// css
asset(paths.src.css.pages)
  .watch(paths.src.css.all)
  .pipe(postcss([postcssImport()]))

// vendor
asset(paths.src.vendor)
  .base(src)