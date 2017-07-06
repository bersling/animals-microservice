#!/usr/bin/env bash

rootdir="animals"
server="ubuntu@35.158.213.131"

echo "Upload contents"
rsync -avz --delete -e 'ssh' "./" "${server}:${rootdir}"

echo "(Re-)Start server"
ssh ${server} "forever stop ${rootdir}/server.js"
ssh ${server} "forever start ${rootdir}/server.js"

echo "Done!"
