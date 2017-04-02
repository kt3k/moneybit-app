const { asset } = require('bulbo')
const frontMatter = require('gulp-front-matter')
const nunjucks = require('gulp-nunjucks-render')
const layout1 = require('layout1')

const src = 'src'

const paths = {
  src: {
    njk: {
      pages: `${src}/*/index.njk`,
      layout: `${src}/common/layout.njk`
    }
  }
}

asset(paths.src.njk.pages)
  .pipe(frontMatter({ property: 'fm' }))
  .pipe(nunjucks())
  .pipe(layout1.nunjucks(paths.src.njk.layout))
