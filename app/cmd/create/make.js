const { ncp } = require( 'ncp' );
const path = require( 'path' );
const md5 = require( 'md5' );
const fs = require( 'fs' );
const os = require( 'os' );

async function appPack ( options ) {
  const app = path.resolve( 'app' );
  const cmp = path.resolve('app', 'cmp');
  
  const framework = path.join(cmp, 'framework', options.framework);
  const compiler = path.join(cmp, 'compiler', options.compiler);
  const styles = path.join(cmp, 'styles', 'index.css');

  const unic = options.name.replace(RegExp(' ', 'g') , '_').toLowerCase();
  const homedir = os.homedir();
  const dirpath = path.resolve(homedir, unic);

  // Create Dir
  const dirname = await new Promise((resolve, reject) => {
    fs.mkdir(dirpath, error => {
      if ( error ) return reject( error );
      resolve( dirpath );
    });
  });

  // Framework
  await new Promise((resolve, reject) => {
    ncp(framework, dirname, error => {
      if ( error ) return reject();
      resolve();
    });
  });
  
  // Compiler
  await new Promise((resolve, reject) => {
    ncp(compiler, dirname, error => {
      if ( error ) return reject();
      resolve();
    });
  });

  // Styles
  await new Promise((resolve, reject) => {
    fs.copyFile(styles, path.format({
      dir: path.resolve(dirname, 'vendors'),
      name: 'index.',
      ext: options.style
    }), error => {
      if ( error ) return reject();
      resolve();
    });
  });

  // Read Manifest
  const manifest = await readDataFile(path.join(app, 'manifest.json'));
  manifest.name = options.name;
  manifest.hash = md5( unic );
  manifest.unic = unic;

  // Make Manifest
  await writeDataFile(manifest, path.resolve(dirname, 'manifest.json'));

  // Read Package
  const package = await readDataFile(path.join(app, 'package.json'));
  package.name = unic;

  // Make Package
  await writeDataFile(package, path.resolve(dirname, 'package.json'));

  // Move Webpack
  await new Promise((resolve, reject) => {
    fs.copyFile(
      path.join(app, 'webpack.config.js'),
      path.resolve(dirname, 'webpack.config.js'), error => {
      if ( error ) return reject();
      resolve();
    });
  });

  // Move Gulp
  await new Promise((resolve, reject) => {
    fs.copyFile(
      path.join(app, 'gulpfile.js'),
      path.resolve(dirname, 'gulpfile.js'), error => {
      if ( error ) return reject();
      resolve();
    });
  });
}

async function readDataFile ( path ) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, buffer) => {
      if ( error ) return reject();

      try {
        var object = JSON.parse( buffer.toString() );
      } catch ( error ) {
        return reject();
      }

      resolve( object );
    });
  });
}

async function writeDataFile (data, path) {
  return new Promise((resolve, reject) => {
    const string = JSON.stringify(data, false, 2);

    fs.writeFile(path, string, 'utf8', error => {
      if ( error ) return reject();
      resolve();
    });
  });
}

module.exports = appPack;