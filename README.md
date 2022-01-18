# open-drugs-frontend

Frontend for age-related drugs experiments database.

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
3. Path to config: `node_modules/@coding-for-science/frontend-shared-configs/.editorconfig`

#### SassLint
1. Go to *Preferences > Plugins*, install SassLint plugin.
2. Go to preferences, SassLint plugin page and check the **Enable plugin**.
3. Path to config: `node_modules/@coding-for-science/frontend-shared-configs/.sasslint`
