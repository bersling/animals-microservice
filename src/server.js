const find = require("find");
const express = require('express');
const path = require('path');
const server = express();
const cors = require('cors');
require('fs-lock')({'file_accessdir': [ __dirname ], 'open_basedir': [ __dirname ]});
const fs = require('fs');

const animalsDir = 'assets/animals';

server.use(cors());

server.get('/', function(req, res) {
  res.send({
    welcome: 'Welcome to the animals service API'
  })
});

server.get('/find', function (req, res) {
  if (req.query.q) {
    const pattern = new RegExp(`(.*?)${req.query.q}(.*?).svg`);
    find.file(pattern, path.join(__dirname, `/${animalsDir}`), function(files) {
      const randomFile = files[Math.floor(Math.random()*files.length)];
      const relPath = randomFile ? path.relative(__dirname, randomFile) : `${animalsDir}/not-found.svg`;
      res.send({
        path: relPath,
        urlEncodedPath: encodeURIComponent(relPath)
      });
    })
  } else {
    res.status(400).send('You need a "q" query parameter');
  }
});

server.get('/animals', function(req, res) {
  if (req.query.path) {
    res.header('Content-Type', 'image/svg+xml');
    fs.readFile(path.join(__dirname, req.query.path), {encoding: 'utf-8'}, function (err, data) {
      if (!err) {
        res.write(data);
        res.end();
      } else {
        console.log(err);
      }
    });
  } else {
    res.status(400).send('You need a "path" query parameter');
  }
});

const port = process.env.PORT || 57253;
server.listen(port, function() {
  console.log('started server at port', port);
});
