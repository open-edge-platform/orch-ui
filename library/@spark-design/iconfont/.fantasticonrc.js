const dotenv = require('dotenv')
const codepoints = require('./dist.web/icons.json')
dotenv.config()

const iconStyle = process.env.FONT_STYLE

module.exports = {
    inputDir: `./icons/svgs/${iconStyle}`,
    outputDir: './dist.web',
    fontTypes: ['ttf', 'woff2', 'woff'],
    assetTypes: ['css', 'json', 'ts'],
    name: 'spark-icon',
    codepoints: codepoints,
    prefix: 'spark-icon',
    selector: '.spark-icon',
    tag: 'span',
    formatOptions: {
        json: {
            indent: 4
        },
        ts: {
            types: ['literalId'],
            singleQuotes: true,
            literalIdName: 'Icon'
        },
        svg: {
            centerHorizontally: true,
            centerVertically: true
        }
    },

    templates: {
        css: './src/css.hbs'
    },

    pathOptions: {
        css: './dist.web/icons.css',
        json: './dist.web/icons.json',
        ts: './dist.web/index.d.ts',
        ttf: `./dist.web/spark-icon-${iconStyle}.ttf`,
        woff: `./dist.web/spark-icon-${iconStyle}.woff`,
        woff2: `./dist.web/spark-icon-${iconStyle}.woff2`
    }
}
