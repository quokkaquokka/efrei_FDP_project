
const { spawn } = require('child_process');
const Path = require('path');
const getRawBody = require('raw-body');

const exp = module.exports = {
  executeScalaScript: async function(id = "") {
    const scriptPath = Path.join(__dirname, 'HelloWorld')
    const proc = spawn('scala', ['HelloWorld'], {cwd: __dirname});
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


async function main() {
  try {
    const result = await exp.executeScalaScript()
    // console.log('result', result)
  } catch(err) {
    // console.log('errr', err)
  }
}

main()
