import { transform } from '@svgr/core'
import chalk from 'chalk'
import fs from 'fs-extra'
import os from 'os'
import path from 'path'

import svgrConfig from './svgr.config'

const ICONS_DIRECTORY_PATH = path.resolve(__dirname, './src/components')
const SVG_DIRECTORY_PATH = path.resolve(__dirname, '../iconfont/icons/svgs/regular')
const INDEX_DIRECTORY_PATH = path.resolve(__dirname, './src')

const toPascalCase = (str: string) => {
    return `${str}`
        .replace(/[-_]+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+(.)(\w*)/g, ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
        .replace(/\w/, (s) => s.toUpperCase())
}

const createIndex = ({
    componentsDirectoryPath,
    indexDirectoryPath,
    indexFileName
}: {
    componentsDirectoryPath: string
    indexDirectoryPath: string
    indexFileName: string
}) => {
    let indexContent = ''
    fs.readdirSync(componentsDirectoryPath).forEach((componentFileName) => {
        // Convert name to pascal case
        const componentName = toPascalCase(
            componentFileName.substr(0, componentFileName.indexOf('.')) || componentFileName
        )

        // Compute relative path from index file to component file
        const relativePathToComponent = path
            .relative(indexDirectoryPath, path.resolve(componentsDirectoryPath, componentName))
            .replace(/\\/g, '/')

        // Export statement
        const componentExport = `export { default as ${componentName} } from "./${relativePathToComponent}";`

        indexContent += componentExport + os.EOL
    })

    // Write the content to file system
    fs.writeFileSync(path.resolve(indexDirectoryPath, indexFileName), indexContent)
}

const manuallyAddedSvgs: { data: string; name: string }[] = []
const svgFiles = fs
    .readdirSync(SVG_DIRECTORY_PATH)
    // Filter out hidden files (e.g. .DS_STORE)
    .filter((item) => !/(^|\/)\.[^/.]/g.test(item))
svgFiles.forEach((fileName) => {
    const svgData = fs.readFileSync(path.resolve(SVG_DIRECTORY_PATH, fileName), 'utf-8')
    manuallyAddedSvgs.push({
        data: svgData,
        name: toPascalCase(fileName.replace(/svg/i, ''))
    })
})
const allSVGs = [...manuallyAddedSvgs]

console.log(chalk.cyanBright('-> Converting to React components'))
allSVGs.forEach((svg) => {
    const svgCode = svg.data
    const componentName = toPascalCase(svg.name)
    const componentFileName = `${componentName}.tsx`
    // console.log(svgrConfig)
    // Converts SVG code into React code using SVGR library
    const componentCode = transform.sync(svgCode, svgrConfig as any, { componentName })

    // 6. Write generated component to file system
    fs.ensureDirSync(ICONS_DIRECTORY_PATH)
    fs.outputFileSync(path.resolve(ICONS_DIRECTORY_PATH, componentFileName), componentCode)
})

// 7. Generate index.ts
console.log(chalk.yellowBright('-> Generating index file'))
createIndex({
    componentsDirectoryPath: ICONS_DIRECTORY_PATH,
    indexDirectoryPath: INDEX_DIRECTORY_PATH,
    indexFileName: 'index.tsx'
})
