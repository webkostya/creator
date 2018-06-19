# Creator

Tools for creating Application

## Quick start
``` javascript
git clone https://github.com/webkostya/creator
cd creator
npm install

// Commands
npm run create        // with options
npm run test          // without options (created test app)
npm run help          // print options

// Build
npm run build         // build views
npm gulp [type]       // build styles (css, less, sass)
npm gulp watch:[type] // watch building styles (css, less, sass)
```

### *Note: gulp installation is required (https://gulpjs.com)*

### Commands [options]

```
Usage: node index [command] [options]

Options:

  -v, --version     output the version number
  -h, --help        output usage information

Commands:

  create [options]  Create new DApp package

Examples:

$ npm run create
$ npm run test
$ npm run help

Options:

-n, --name <name>            Your package name
-c, --compiler <compiler>    Target compiler
-s, --style <preprocessor>   Styles preprocessor
-f, --framework <framework>  Starter framework