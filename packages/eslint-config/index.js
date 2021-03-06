module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['react-hooks', 'import'],
    rules: {
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'import/order': [
            'error',
            {
                groups: [['external', 'internal']],
                'newlines-between': 'always',
            },
        ],
        'react/self-closing-comp': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
