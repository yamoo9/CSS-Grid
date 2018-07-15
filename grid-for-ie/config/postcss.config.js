const autoprefixer__options = require('./autoprefixer.config');
const cssnano__options      = require('./cssnano.config');
const postcssGap__options   = require('./postcss-gap-properties.config');

module.exports = ctx => ({
  parser: ctx.file.extname === '.sss' ? 'sugarss' : false,
  plugins: [
    require("autoprefixer")(autoprefixer__options),
    ctx.env === 'production' && require("cssnano")(cssnano__options),
    require("postcss-gap-properties")(postcssGap__options)
  ],
  map: false // ctx.env === 'development' ? ctx.options.map : false,
});
