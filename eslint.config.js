import js from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  ignores: ['dist', 'pwa-assets.config.ts', 'tailwind.config.ts'],
  settings: { react: { version: '19.0.0' } },
  extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    vitest,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    ...vitest.configs.recommended.rules,
    'vitest/max-nested-describe': ['error', { max: 3 }],
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      {
        ignoreArrowShorthand: true,
      },
    ],
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
})
