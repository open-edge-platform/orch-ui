const componentTemplate = require('./componentTemplate.js')

const svgConfig = {
    typescript: true,
    icon: true,
    svgProps: {
        viewBox: '0 0 56 56',
        width: '100%',
        height: '100%',
        fill: 'none'
    },
    plugins: [
        // Clean SVG files using SVGO
        '@svgr/plugin-svgo',
        // Generate JSX
        '@svgr/plugin-jsx',
        // Format the result using Prettier
        '@svgr/plugin-prettier'
    ],
    svgoConfig: {},
    template: componentTemplate
}

module.exports = svgConfig
