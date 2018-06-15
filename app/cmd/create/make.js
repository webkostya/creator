const { ncp } = require( 'ncp' );
const path = require( 'path' );
const fs = require( 'fs' );

const make = async options => {
  const cmp = path.resolve('app', 'cmp');
  const view = path.join(cmp, 'views', options.framework);
  const style = path.join(cmp, 'style', options.style);
  const compile = path.join(cmp, 'style', options.compiler);

  const dirname = await new Promise((resolve, reject) => {
    fs.mkdir(options.name, error => {
      if ( error ) return reject( error );
      resolve( options.name );
    });
  });

  await new Promise((resolve, reject) => {
    ncp(view, dirname, error => {
      if ( error ) return reject();
      resolve();
    });
  });
}

module.exports = make;