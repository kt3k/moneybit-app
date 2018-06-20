const bulbo = require('bulbo')
const { asset } = bulbo
const frontMatter = require('gulp-front-matter')
const nunjucks = require('gulp-nunjucks-render')
const layout1 = require('layout1')
const sass = require('gulp-sass')
const bundle = require('bundle-through')
const path = require('path')

require('nunjucks').configure({ noCache: true })

const src = path.join(__dirname, 'src')
const basepath = process.env.BASEPATH || ''
const reviewUrl = process.env.REVIEW_URL || 'https://example.com/'

const paths = {
  src: {
    njk: {
      pages: `${src}/pages/*/index.njk`,
      layoutRoot: `${src}/common`,
      all: `${src}/**/*.njk`
    },
    js: {
      pages: `${src}/pages/*/index.js`,
      common: `${src}/common/index.js`,
      infrastructure: `${src}/infrastructure/index.js`,
      i18n: `${src}/i18n/*.js`,
      all: `${src}/**/*.{js,json}`
    },
    scss: {
      pages: `${src}/pages/*/index.scss`,
      common: `${src}/common/index.scss`,
      all: `${src}/**/*.scss`
    },
    img: {
      all: `${src}/**/*.svg`
    },
    vendor: `${src}/vendor/**/*.*`
  }
}

const data = { src, basepath, reviewUrl }

bulbo.debugPagePath('__moneybit__')
bulbo.base(src)
bulbo.dest('build/app')
bulbo.port(4000)

// html
asset(paths.src.njk.pages)
  .watch(paths.src.njk.all)
  .pipe(frontMatter({ property: 'fm' }))
  .pipe(nunjucks({ data }))
  .pipe(
    layout1.nunjucks(
      file =>
        `${paths.src.njk.layoutRoot}/${file.fm.layout || 'tab-layout'}.njk`,
      { data }
    )
  )

// js
asset(
  paths.src.js.pages,
  paths.src.js.common,
  paths.src.js.infrastructure,
  paths.src.js.i18n
)
  .watch(paths.src.js.all)
  .pipe(bundle({ transform: ['envify', 'babelify'] }))

// css
asset(paths.src.scss.pages, paths.src.scss.common)
  .watch(paths.src.scss.all)
  .pipe(sass())

// vendor
asset(paths.src.vendor)

// img
asset(paths.src.img.all)
