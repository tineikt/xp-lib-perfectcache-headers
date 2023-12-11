module.exports = {
    'parser': 'babel-eslint',
    'parserOptions': {
        'sourceType': 'module'
    },
    'extends': 'eslint:recommended',
    'plugins': ['babel'],
    'rules': {
        'import/no-unresolved': 'off',
        'semi': ['error', 'always'],
        'object-curly-spacing': ["error", "always"]
    },
    'globals': {
        'resolve': true, // enonic global
        'exports': true, // enonic global
        'log': true, // enonic global
        'app': true, // enonic global
        'Java': true // Enonic Global
    }
};
