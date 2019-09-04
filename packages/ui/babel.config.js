module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['last 2 versions'],
        },
        useBuiltIns: 'usage',
        corejs: '3.0.0',
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-numeric-separator',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
      'styled-components',
      {
        ssr: true,
      },
    ],
    'react-hot-loader/babel',
  ],
};
