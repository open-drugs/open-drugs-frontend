# open-drugs-frontend

Frontend for age-related drugs experiments database.

## Before you start, make sure you have Node, npm and Angular CLI installed in your environment: 

- [Get Node.js and npm](https://nodejs.org/)
- Install Angular CLI:
```
npm install -g @angular/cli
```
For more information please visit [https://angular.io/guide/setup-local](Angular official guide)

## Start a project locally

```
npm i
```
```
npm run start
```

[https://localhost:4200/](https://localhost:4200/)

JIT compilation for developers test environment: `npm run start-test`

---

## Setup configs

### For IDEA

#### .editorconfig 
1. Go to *Preferences > Editor > Code Style > EditorConfig > Export > EditorConfig File*.
2. Choose: `.editorconfig`
3. Check the **Enable EditorConfig** support checkbox.

#### ESLint
1. Go to *Preferences > Languages and Frameworks > JavaScript > Code Quality Tools > ESLint*.
3. Path to config: `.eslintrc.json`

#### Prettier
1. Go to *Preferences > Plugins*, install Prettier plugin.
2. Go to preferences, Prettier plugin page and check the **Enable plugin**.
3. Path to config: `.prettierrc.json`

---

### Linting

```
ng lint
```

---

## Build for different environments

- Developers test environment AOT build: `npm run build-test`
- Production AOT build: `npm run build-prod`
