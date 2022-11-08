module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte']
    },
    env: {
        es6: true,
        browser: true
    },
    overrides: [
        {
            files: ['**/*.svelte'],
            processor: "svelte3/svelte3"
        }
    ],
    rules: {
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        "keyword-spacing": ["error", { "before": true }],
        "space-infix-ops": [2, {"int32Hint": false}],
        "array-bracket-spacing": [2, "always"],
        "indent": ["error", 2],
        "space-before-function-paren": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        quotes: [ 'error', 'single', { allowTemplateLiterals: true } ],
        'no-var': [ 'error' ],
    },
    settings: {
        'svelte3/typescript': true,
        // ignore style tags in Svelte because of Tailwind CSS
        // See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
        // 'svelte3/ignore-styles': () => true
    },
    plugins: ['svelte3', '@typescript-eslint'],
    ignorePatterns: ['node_modules'],
    
}