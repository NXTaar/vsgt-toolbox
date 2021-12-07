const path = require('path');
const { promises: fs } = require('fs');

function isDirectory(directory) {
    return fs
        .access(directory)
        .then(() => true)
        .catch(() => false);
}

const root = path.resolve(__dirname, '../../');
const dist = path.resolve(__dirname, 'dist');

const gitignorePath = path.join(root, '.gitignore');
const eslintignorePath = path.join(root, '.eslintignore');

async function build() {
    const dirExists = await isDirectory(dist);

    !dirExists && (await fs.mkdir(dist, { recursive: true }));

    await Promise.all([
        fs.copyFile(gitignorePath, path.join(dist, '.gitignore')),
        fs.copyFile(eslintignorePath, path.join(dist, '.eslintignore')),
    ]);

    console.log('assests copied successfully!');
}

build();
