// const { objectSwitch } = require("../switch")

const colors = require( 'colors' );
const inquirer = require( 'inquirer' );
const make = require( './make' );

const defaultValues = {
  compiler: 'es6',
  style: 'sass'
}

const messages = {
  name: '🏷  Enter your package name',
  view: '📦  Starter framework',
  style: '💈  Please choice style preprocessor',
  compiler: '🛠  Please choice compiler'
}

const inputTypes = {
  view: 'list',
  compiler: 'list',
  style: 'list',
  name: 'input'
}

const inputChoices = {
  compiler: ['es6', 'typescript'],
  style: ['sass', 'less'],
  view: ['angular', 'react', 'vue', 'vanilla']
}

const command = async (env, options) => {
  let properties = ['name', 'view', 'compiler', 'style'];
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

    const dirname = output.name.replace(RegExp(' ', 'g') , '_').toLowerCase();

    console.log( `\n"${output.name}" created successful`.blue.bold );
    console.log( `\ncd ${dirname} && npm install`.grey );
  } catch ( error ) {
    console.error( error );
  }
}

module.exports = command;