"use strict";

const Hapi = require("hapi");
const Path = require('path')
const glob = require('glob');
const chalk = require('chalk');
const Inert = require('inert');



const init = async () => {

  const server = Hapi.server({
    host: process.env.HOST || "localhost",
    port: 8000,
    routes: { 
      cors: true,
      files: {
        relativeTo: Path.join(__dirname, '../dist')
      }
    }
  });

  await server.register(Inert);

  server.state("session", {
    ttl: 7 * 1000 * 60 * 60 * 24, // 7 day lifetime
    encoding: "base64json",
    isSecure: true,
    isHttpOnly: true,
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // cookie data is JSON-stringified and Base64 encoded
  });


  const loadRoutes = async function() {
    const cwd = Path.resolve(__dirname, '.');
      console.log('loadRoutes - __dirname', __dirname)
      const routes = glob.sync('**/*.route.js', {cwd: cwd})

      routes.forEach(route => {
        var route = require(Path.resolve(cwd, route));

        try {
          server.route(route)
          console.log('Route: ', route.path, '(' + route.method + ')');
        } catch (e) {
          throw new Error('Cannot load route ' + route + ':\n' + e.stack.replace(/^/gm, chalk.grey('  > ')))
        }
    })
  }

  server.route({
    method: 'GET',
    path:'/healthcheck',
    handler: (request, h) => {
      return {status: 'ok'};
    }
  });

  const serveFile = () => {
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '../dist',
          index: true,
        }
      }
    });    
  }


  // Start the server
  try {
    await loadRoutes()
    serveFile()
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();