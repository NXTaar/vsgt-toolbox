#! /usr/bin/env node

const eslintPkg = require('@vsgt/eslint-config/package.json');
const prettierPkg = require('@vsgt/prettier-config/package.json');

const { promises: fs } = require('fs');
const path = require('path');
const targetPkgPath = path.resolve(process.cwd(), 'package.json');

const targetPkg = require(targetPkgPath);

const gitignore = path.resolve(__dirname, 'dist/.gitignore');
const eslintignore = path.resolve(__dirname, 'dist/.eslintignore');

const linters = {
    prettier: '@vsgt/prettier-config',
    eslintConfig: {
        extends: '@vsgt/eslint-config',
    },
};

const deps = {
    eslint: eslintPkg.peerDependencies.eslint.replace('^', ''),
    prettier: prettierPkg.peerDependencies.prettier.replace('^', ''),
    ['@vsgt/prettier-config']: prettierPkg.version,
    ['@vsgt/eslint-config']: eslintPkg.version,
};

const modifiedPkg = {
    ...targetPkg,
    ...linters,
    devDependencies: {
        ...(targetPkg.devDependencies || {}),
        ...deps,
    },
};

async function setup() {
    await Promise.all([
        fs.copyFile(gitignore, `${process.cwd()}/.gitignore`),
        fs.copyFile(eslintignore, `${process.cwd()}/.eslintignore`),
        fs.writeFile(targetPkgPath, JSON.stringify(modifiedPkg, null, 4), { encoding: 'utf8', flag: 'w' }),
    ]);

    console.log('Linters config files successfully added!');
}

setup();
