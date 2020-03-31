
const { spawn } = require('child_process');
const Path = require('path');
const getRawBody = require('raw-body');

/*const exp = */module.exports = {
  executeScalaScript: async function() {
    const scriptPath = Path.join(__dirname, '../scala')
    var json = JSON.stringify({ 
      // l'argument json [{"name": "Registration State", "value": "NY"}]
    });

    // le deuxieme json avec toute la data du csv
    
    const proc = spawn('scala', [scriptPath, json /*, json2 */]);
    
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
    
      console.log('resultat scala: ', stdout);
      return stdout;
    }
}

/*
async function main() {
  try {
    const result = await exp.executePythonScript()
    console.log('result', result)
  } catch(err) {
    console.log('errr', err)
  }
}

main()

*/