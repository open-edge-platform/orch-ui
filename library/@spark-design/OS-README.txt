# Use Spark Design in your open-source project

Spark Design currently has no plans to be fully open-source, and its packages can only be installed
with `npm` by users who are on the Intel VPN. However, we do provide a redistributable package 
under the MIT open source license.

## Install Spark Design for open-source projects

After extracting the zip file into your project to gain access to the following packages:

-   brand-tokens
-   react
-   css
-   utils
-   core
-   iconfont
-   tokens

## How to use the React components

Extract the zip file into a suitable project directory (we recommend the main `src` folder).

Add the following npm packages to `devDependencies`
in your root

```plaintext
"devDependencies": {
    "@react-aria/utils": "^3.14.2",
    "@types/dedent": "^0.7.0",
    "axios": "^1.6.0",
    "jss": "^10.9.2",
    "jss-preset-default": "^10.9.2",
    "polished": "^4.2.2",
    "react-aria": "^3.22.0",
    "react-dropzone": "^14.2.3",
    "react-router-dom": "^6.7.0",
    "react-stately": "^3.20.0",
    "react-table": "^7.8.0",
    "ts-dedent": "^2.2.0"
  }
```

Use npm to install all external package dependencies:

```bash
npm install
```

Open `tsconfig.json` file add `baseUrl": "src"` under
`compilerOptions`, `src` folder is where the `@spark-design` folder is located.

Add `"exclude": ["src/@spark-design/**"]` after the
`compilerOptions`.

After setting up all the above and the installation is complete, you can import & use Spark 
Design’s React components with the standard method:

`Please note that, this open-source package was tested in clean React project with Typescript 
template.`

## A note on fonts

The Intel One fonts should not be used in open-source projects, so we do not include them in this
distribution. We have defined a font stack in the CSS implementation that we feel is a good
alternative to the Intel fonts.

## Security

Spark-Design design system doesn't include any user input validation.
The adopting products using Spark design need to validate the input.
To create web forms use the following 
[Constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)
for both Client and Server sides.
