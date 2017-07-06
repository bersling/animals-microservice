#!/usr/bin/env bash

rootdir="animals"
server="ubuntu@35.158.213.131"

echo "Upload contents"
scp -r ./ "${server}:${rootdir}"

echo "Done!"
