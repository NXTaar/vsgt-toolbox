#! /usr/bin/env node

// const { wir } = require('fs');
const path = require('path');

const pkg = path.resolve(process.cwd(), 'package.json');

console.log(pkg);
