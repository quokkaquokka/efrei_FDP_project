
const { spawn } = require('child_process');
const Path = require('path');
const getRawBody = require('raw-body');
// const config = require('../../config/config').mongodb;

const exp = module.exports = {
  executePythonScript: async function(id = "") {
    const scriptPath = Path.join(__dirname, 'HelloWorld')
    var json = JSON.stringify({ 
      // l'argument json [{"name": "Registration State", "value": "NY"}]
    });

    // le deuxieme json avec toute la data du csv
    
    const proc = spawn('scala', ['HelloWorld'/*, json*/], {cwd: __dirname});
    
      const [procStatus, stdout, stderr]  = await Promise.all([
        new Promise((resolve, reject) => {
          proc.on('exit', resolve);
          proc.on('error', reject);
        }),
        getRawBody(proc.stdout, {encoding: 'utf8'}),
        getRawBody(proc.stderr, {encoding: 'utf8'}),
      ])

      if (procStatus !== 0) {
        throw new Error('Process exited with non 0 exit code:', procStatus, '\nSTDOUT:', stdout, '\nSTDERR:', stderr);
      }
    
      console.log('resultat python: ', stdout);
      return stdout;
    }
}


async function main() {
  try {
    const result = await exp.executePythonScript()
    console.log('result', result)
  } catch(err) {
    console.log('errr', err)
  }
}

main()
