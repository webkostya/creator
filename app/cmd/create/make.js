const { ncp } = require( 'ncp' );
const path = require( 'path' );
const fs = require( 'fs' );

const make = async options => {
  const app = path.resolve( 'app' );
  const cmp = path.resolve('app', 'cmp');
  
  const view = path.join(cmp, 'views', options.view);
  const style = path.join(cmp, 'style', options.style);
  const compiler = path.join(cmp, 'style', options.compiler);

  const name = options.name.replace(RegExp(' ', 'g') , '_').toLowerCase();

  const dirname = await new Promise((resolve, reject) => {
    fs.mkdir(name, error => {
      if ( error ) return reject( error );
      resolve( name );
    });
  });

  await new Promise((resolve, reject) => {
    ncp(view, dirname, error => {
      if ( error ) return reject();
      resolve();
    });
  });

  const data = await new Promise((resolve, reject) => {
    fs.readFile(path.join(app, 'manifest.json'), (error, buffer) => {
      if ( error ) return reject();

      try {
        var object = JSON.parse( buffer.toString() );
      } catch ( error) {
        return reject();
      }

      object.name = name;
      resolve( object );
    });
  });

  await new Promise((resolve, reject) => {
    const string = JSON.stringify(data, false, 2);

    fs.writeFile(path.resolve(dirname, 'manifest.json'), string, 'utf8', error => {
      if ( error ) return reject();
      resolve();
    });
  });
}

module.exports = make;