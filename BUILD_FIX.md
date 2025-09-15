# Build Fix: TypeScript Module Resolution Error

## Issue
The build was failing with the error:
```
Error: vite.config.mts(2,17): error TS2307: Cannot find module '@vitejs/plugin-vue' or its corresponding type declarations.
There are types at '/home/runner/work/prefect-design/prefect-design/node_modules/@vitejs/plugin-vue/dist/index.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.
```

## Root Cause
The TypeScript configuration in `tsconfig.json` was using `"moduleResolution": "node"`, which is the legacy module resolution strategy. Modern TypeScript projects with Vite should use a more recent module resolution strategy to properly resolve ES modules and their type declarations.

## Solution
Updated `tsconfig.json` line 18 from:
```json
"moduleResolution": "node"
```
to:
```json
"moduleResolution": "bundler"
```

The `"bundler"` option is specifically designed for bundlers like Vite and provides better module resolution for modern JavaScript/TypeScript projects.

## Verification
- The Vite build now completes successfully
- The original `@vitejs/plugin-vue` module resolution error is resolved
- Build artifacts are generated in the `dist/` directory as expected

## Files Changed
- `tsconfig.json` - Updated moduleResolution setting