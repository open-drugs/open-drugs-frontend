# open-drugs-frontend

Frontend for age-related drugs experiments database.

## Before you start

```
npm install -g @angular/cli
```
For more information please visit [https://angular.io/guide/setup-local](Angular official guide)

## Start locally

```
npm i
```
```
npm run start
```

[https://localhost:4200/](https://localhost:4200/)

---
## Build for different environments

Developers stand test build: `npm run build-dev`

Demo stand build: `npm run build-demo`

Production AOT build: `npm run build-prod`

## Setup configs
### IDEA

Add to package.json

```
"@coding-for-science/frontend-shared-configs": "^0.1.0",
```

Configuration files package folder path:

```
node_modules/@coding-for-science/frontend-shared-configs/
```

#### .editorconfig 
1. Go to *Preferences > Editor > Code Style > EditorConfig > Export > EditorConfig File*.
2. Choose: `node_modules/@coding-for-science/frontend-shared-configs/.editorconfig`
3. Check the **Enable EditorConfig** support checkbox.

#### ESLint
1. Go to *Preferences > Languages and Frameworks > JavaScript > Code Quality Tools > ESLint*.
3. Path to config: `node_modules/@coding-for-science/frontend-shared-configs/.eslintrc.json`

#### SassLint
1. Go to *Preferences > Plugins*, install SassLint plugin.
2. Go to preferences, SassLint plugin page and check the **Enable plugin**.
3. Path to config: `node_modules/@coding-for-science/frontend-shared-configs/.sasslint`
