

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        '@vue/eslint-config-prettier'
    ],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off'
    },
    parserOptions: {
        ecmaVersion: 'latest'
    }
}