const path = require('path');

const browsers = [
  ...([
    'Chrome',
    'Edge',
    'Firefox',
    'Safari',
  ].map(browser => `last 2 ${browser} versions`)),
  'Firefox ESR',
];

module.exports = {
  configBasedir: path.resolve(__dirname),
  defaultSeverity: 'warning',
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-sass-guidelines',
  ],
  plugins: [
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
  ],
  rules: {
    indentation: 2,
    'order/order': [
      'custom-properties',
      'declarations',
    ],
    'max-nesting-depth': 4,
    'order/properties-alphabetical-order': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers,
        ignore: [
          'calc',
          'css-gradients',
          'css-sticky',
          'multicolumn',
          'rem',
        ],
      },
    ],
    'selector-class-pattern': [
      '[a-z]([a-zA-Z0-9]+)?$',
      {
        resolveNestedSelectors: true,
      },
    ],
    'selector-max-compound-selectors': 5,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
        ],
      },
    ],
  },
};
