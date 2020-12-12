module.exports.src =
`
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "baseUrl": ".",
    "moduleResolution": "node",
    "paths": {
      "@components/*": ["src/components/*"],
      "@pages/*": ["src/pages/*"]
    }
  }
}
`