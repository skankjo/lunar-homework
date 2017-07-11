const globalMixins = {
  /* noSelect is a static mixin  */
  noSelect: {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  /* OpenSans is a dynamic mixin  */
  OpenSans: (obj, value) => { // eslint-disable-line arrow-body-style
    return {
      'font-family': 'Open Sans, sans-serif',
      'font-style': 'normal',
      'font-size': value,
      'font-weight': 200,
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    };
  },
};
module.exports = globalMixins;
