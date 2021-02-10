module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "ignorePatterns": ["./tmp", "./node_modules", "./scripts"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "no-new": "off",
        "consistent-return": "error",
        "indent": ["warn", 4, {
            "SwitchCase": 1,
        }],
        "quotes": ["warn", "single"],
        "semi": ["error", "always"],
        "semi-spacing": "warn",
        "comma-spacing": ["warn", { "before": false, "after": true }],
        "no-trailing-spaces": "warn",
        "no-whitespace-before-property": "warn",
        "space-infix-ops": "warn",
        "keyword-spacing": "warn",
        "key-spacing": "warn",
        "space-in-parens": "warn",


        "space-before-blocks": "warn",
        // "space-before-function-paren": "warn",
        "space-unary-ops": "warn",
        // "spaced-comment": "warn",

        "eol-last": "warn",
        "lines-between-class-members": "warn",
        "strict": "error",

        "linebreak-style": ["warn", "windows"],

        "@typescript-eslint/prefer-namespace-keyword": "off",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/explicit-member-accessibility": ["error", {
            "overrides": {
                "constructors": "no-public"
            }
        }],
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-dynamic-delete": "error",
        "@typescript-eslint/default-param-last": "error",
        "@typescript-eslint/comma-spacing": "warn",
        "@typescript-eslint/typedef": ["error", {
            "arrayDestructuring": true,
            "arrowParameter": true,
            "memberVariableDeclaration": true,
            "objectDestructuring": true,
            "parameter": true,
            "propertyDeclaration": true,
            "variableDeclaration": true,
            "variableDeclarationIgnoreFunction": true
        }],
        "@typescript-eslint/ban-types": ["error", {
            "types": {
                "Array": "Use [] instead",
                "Object": "Use {} instead",
                "String": "Use string instead",
                "Number": "Use number instead",
                "Boolean": "Use boolean instead",
                "Function": "Use (...) => {...} instead"
            }
        }],
        // "@typescript-eslint/strict-boolean-expressions": ["warn", { "ignoreRhs": true }], // TODO works incorrect in KPIElementMaint.ts

        // Best Practices ES rules:
        "accessor-pairs": "error",
        "array-callback-return": "error",
        "block-scoped-var": "error",
        "complexity": ["error", { "max": 30 }],
        // "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
        "curly": "error",
        // "default-case": "error",
        "default-param-last": "error",
        "dot-location": ["error", "property"],
        "dot-notation": "error",
        "eqeqeq": "error",
        "grouped-accessor-pairs": "error",
        "guard-for-in": "error",
        "max-classes-per-file": "error",
        "no-alert": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-constructor-return": "error",
        "no-div-regex": "error",
        "no-else-return": "error",
        "no-empty-function": "error",
        "no-empty-pattern": "error",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
        "no-fallthrough": "error",
        "no-floating-decimal": "error",
        "no-global-assign": "error",
        "no-implicit-coercion": "error",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-invalid-this": "error",
        "no-iterator": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-loop-func": "error",
        "no-multi-spaces": "warn",
        "no-multi-str": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-proto": "error",
        "no-redeclare": "error",
        "no-restricted-properties": "error",
        "no-return-assign": ["error", "always"],
        "no-return-await": "error",
        "no-script-url": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "error",
        // "no-unused-expressions": "error", // TODO: why use strict is unused expression?
        "no-unused-labels": "error",
        "no-useless-call": "error",
        "no-useless-catch": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-warning-comments": "warn",
        "no-with": "error",
        // "prefer-named-capture-group": "error",
        "prefer-promise-reject-errors": "error",
        "prefer-regex-literals": "error",
        "radix": "error",
        // "require-await": "error",
        // "require-unicode-regexp": "error",
        "vars-on-top": "error",
        "wrap-iife": "error",
        "yoda": "error",

        // Generated
        "new-parens": "error",
        "no-bitwise": "error",
        "no-duplicate-imports": "error",
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "no-shadow": ["error", { "hoist": "all" }], // TODO: check KPIMaint.ts
        "prefer-const": "warn",
        "no-underscore-dangle": "error",
        "no-var": "error",
        "one-var": ["error", "never"],
        "id-match": "error",
        "max-len": ["warn", { "code": 200 }],

        "id-blacklist": [
            "error",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "Null",
            "null", // TODO: Why not work ?
        ],


        "comma-dangle": [
            "error",
            {
                "objects": "always",
                "arrays": "always",
                "functions": "always-multiline"
            }
        ],

        "@typescript-eslint/member-ordering": [
            "warn",
            { "default": [
                "signature",

                "public-static-field",
                "private-static-field",
                "protected-static-field",

                "public-instance-field",
                "private-instance-field",
                "protected-instance-field",

                "public-abstract-field",
                "private-abstract-field",
                "protected-abstract-field",

                "public-field",
                "private-field",
                "protected-field",

                "static-field",
                "instance-field",
                "abstract-field",

                "field",

                "constructor",

                "public-static-method",
                "private-static-method",
                "protected-static-method",

                "public-instance-method",
                "private-instance-method",
                "protected-instance-method",

                "public-abstract-method",
                "private-abstract-method",
                "protected-abstract-method",

                "public-method",
                "private-method",
                "protected-method",

                "static-method",
                "instance-method",
                "abstract-method",

                "method"
            ]
        }],

        //https://eslint.org/docs/rules/
        //https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "no-console": "error",
        "no-debugger": "error"
    },
    "settings": {}
};