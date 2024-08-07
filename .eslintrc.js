/* eslint-disable */

module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: [
        "react-hooks",
        "@typescript-eslint",
        "react"
    ],
    ignorePatterns: ["node_modules/*", "dist/*", "tsconfig.json"],
    settings: {
        react: {
            version: "detect"
        }
    },
    rules:{
        quotes: "warn",
        "react/no-unknown-property": ["off", { "ignore": ["JSX"] }],
        semi: "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "react-hooks/rules-of-hooks": "error",
        "no-unused-vars": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-empty": [
            "error",
            {
                allowEmptyCatch: true
            }
        ],
        "arrow-spacing": [
            "warn",
            {
                "before": true,
                "after": true
            }
        ],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: ["variable", "function"],
                format: ["snake_case", "PascalCase", "camelCase", "UPPER_CASE"],
                leadingUnderscore: "allow",
                trailingUnderscore: "allow",
            }
        ],
        "no-console": [
            "warn", 
            { 
                "allow": ["debug", "error"] 
            }
        ],
        "no-trailing-spaces": [
            "error",
            {
                skipBlankLines: true
            }
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_"
            },
        ],
    }
}