function componentTemplate({ template }, opts, { componentName, jsx, exports }) {
    const code = `
    %%NEWLINE%%
    %%NEWLINE%%

    import { IconWrapper } from '../IconWrapper'

    %%NEWLINE%%

    const %%COMPONENT_NAME%%: React.FC<IconProps & React.SVGProps<SVGAElement>> = ({
        svgProps: props,
        ...restProps
    }) => {
      
      return <IconWrapper icon={%%JSX%%} {...restProps} />
    }

    %%EXPORTS%%
  `

    const mapping = {
        COMPONENT_NAME: componentName,
        JSX: jsx,
        EXPORTS: exports,
        NEWLINE: '\n'
    }

    /**
     * API Docs: https://babeljs.io/docs/en/babel-template#api
     */
    const typeScriptTpl = template(code, {
        plugins: ['jsx', 'typescript'],
        preserveComments: true,
        syntacticPlaceholders: true
    })

    return typeScriptTpl(mapping)
}

module.exports = componentTemplate
