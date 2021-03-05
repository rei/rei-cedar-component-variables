module.exports = {
  parser: 'postcss-scss',
  map: false,
  plugins: [
    require('postcss-inline-svg')({ paths: ['./'] })
  ],
}
