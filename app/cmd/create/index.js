// const { objectSwitch } = require("../switch")

const colors = require( 'colors' );
const inquirer = require( 'inquirer' );
const make = require( './make' );

const defaultValues = {
  compiler: 'es6',
  style: 'sass'
}

const messages = {
  style: '💈  Please choice style preprocessor',
  compiler: '🛠  Please choice compiler',
  name: '🏷  Enter your package name',
  framework: '📦  Starter framework'
}

const inputTypes = {
  framework: 'list',
  compiler: 'list',
  style: 'list',
  name: 'input'
}

const inputChoices = {
  compiler: ['es6', 'typescript'],
  style: ['sass', 'less'],
  framework: ['angular', 'react']
}

const command = async (env, options) => {
  let properties = ['name', 'framework', 'compiler', 'style'];
  let output = {}
  let steps = [];

  properties.forEach(name => {
    let exists = typeof( env[name] ) == 'string';
    
    if ( exists ) return output[name] = env[name];
     
    let query = {
      message: messages[name],
      type: inputTypes[name],
      name,

      // Inject default value if exists
      ...(defaultValues[name]
        ? {default: defaultValues[name]}
        : {}
      ),
      
      // Inject choices
      ...((inputTypes[name] == 'list')
        ? {choices: inputChoices[name]}
        : {}
      )
    }
    
    steps.push( query );
  });

  try {
    let answers = await inquirer.prompt( steps );

    output = {
      ...output,
      ...answers
    }

    await make( output );

    console.log( `\nDApp "${output.name}" created successful`.blue.bold );
    console.log( `cd ${output.name}`.grey );
  } catch ( error ) {
    console.error( error );
  }
}

module.exports = command;