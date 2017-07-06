const find = require("find");
const express = require('express');
const path = require('path');
const server = express();
require('fs-lock')({'file_accessdir': [ __dirname ], 'open_basedir': [ __dirname ]});

const fs = require('fs');

const animalsPath = path.join(__dirname, '/animals');

server.get('/find', function (req, res) {
  const ext = req.query.ext ? '\\.' + req.query.ext : '';
  const q = req.query.q;
  if (q) {
    const pattern = new RegExp(`(.*?)${q}(.*?)${ext}`)
    find.file(pattern, animalsPath, function(files) {
      const randomFile = files[Math.floor(Math.random()*files.length)];
      const relPath = path.relative(__dirname, randomFile);
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

const port = process.argv[2] || 4145;
server.listen(port, function() {});
