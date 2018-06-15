#!/usr/bin/env node

//  ✍️  👀 💼 🥂 📦 🔑 🛠 🗄
const program = require( 'commander' );
const inquirer = require( 'inquirer' );

const { create } = require( './app/cmd' );

program.version('1.0.0', '-v, --version');

program
  .command( 'create' )
  .description( 'Create new DApp package \n' )
  .option( '-n, --name <name>', 'Your package name' )
  .option( '-c, --compiler <compiler>', 'Target compiler', /^(ts|es6)$/i )
  .option( '-s, --style <preprocessor>', 'Styles preprocessor', /^(less|sass)$/ )
  .option( '-f, --framework <framework>', 'Starter framework', /^(angular|react|vue|vanilla)$/ )
  .action( create );

program.on('--help', function(){
  console.log('Examples:');
  console.log('\n$ npm run create');
  console.log('$ npm run test');
  console.log('$ npm run help \n');

  console.log('Options: \n');
  console.log('-n, --name <name>', '           Your package name');
  console.log('-c, --compiler <compiler>', '   Target compiler');
  console.log('-s, --style <preprocessor>', '  Styles preprocessor');
  console.log('-f, --framework <framework>', ' Starter framework \n');
});

program.parse( process.argv );