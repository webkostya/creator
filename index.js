//  ✍️  👀 💼 🥂 📦 🔑 🛠 🗄
const program = require( 'commander' );
const inquirer = require( 'inquirer' );

const { create } = require( './app/cmd' );

program.version( '1.0' );

program
  .command( 'create' )
  .description( '🛠   Create new DApp package' )
  .option( '-n, --name <name>', '🏷   Your package name' )
  .option( '-c, --compiler <compiler>', '🛠   Target compiler', /^(ts|es6)$/i )
  .option( '-s, --style <preprocessor>', '💈   Styles preprocessor', /^(less|sass)$/ )
  .option( '-f, --framework <framework>', '📦  Starter framework', /^(angular|react|vue)$/ )
  .action( create );

program.parse( process.argv );