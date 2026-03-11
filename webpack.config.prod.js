const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html', filename: 'index.html' }),
    new HtmlWebpackPlugin({ template: './about.html', filename: 'about.html' }),
    new HtmlWebpackPlugin({ template: './animate.html', filename: 'animate.html' }),
    new HtmlWebpackPlugin({ template: './education.html', filename: 'education.html' }),
    new HtmlWebpackPlugin({ template: './experience.html', filename: 'experience.html' }),
    new HtmlWebpackPlugin({ template: './header.html', filename: 'header.html' }),
    new HtmlWebpackPlugin({ template: './home.html', filename: 'home.html' }),
    new HtmlWebpackPlugin({ template: './references.html', filename: 'references.html' }),
    new HtmlWebpackPlugin({ template: './resume.html', filename: 'resume.html' }),
    new HtmlWebpackPlugin({ template: './works.html', filename: 'works.html' }),

    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: '404.html', to: '404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});