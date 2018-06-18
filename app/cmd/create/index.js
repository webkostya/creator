// const { objectSwitch } = require("../switch")

const colors = require( 'colors' );
const inquirer = require( 'inquirer' );
const appPack = require( './make' );

const defaultValues = {
  compiler: 'es6',
  style: 'css'
}

const messages = {
  name: '🏷  Enter your package name',
  framework: '📦  Starter framework',
  style: '💈  Please choice style preprocessor',
  compiler: '🛠  Please choice compiler'
}

const inputTypes = {
  framework: 'list',
  compiler: 'list',
  style: 'list',
  name: 'input'
}

const inputChoices = {
  compiler: ['es6', 'typescript'],
  style: ['css', 'sass', 'less'],
  framework: ['angular', 'react', 'vue', 'vanilla']
}

const command = async (env, options) => {
  let properties = ['name', 'framework', 'compiler', 'style'];
  let output = {}
  let steps = [];

  properties.forEach(name => {
    if ( typeof( env[name] ) == 'string' )
      return output[name] = env[name];
     
    const query = {
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
    const answers = await inquirer.prompt( steps );

    output = {
      ...output,
      ...answers
    }

    await appPack( output );

    const dirname = output.name.replace(RegExp(' ', 'g') , '_').toLowerCase();

    console.log( `\n"${output.name}" created successful`.blue.bold );
    console.log( `\ncd ${dirname} && npm install && npm run build`.grey );
  } catch ( error ) {
    console.error( error );
  }
}

module.exports = command;