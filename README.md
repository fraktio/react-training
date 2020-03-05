# React training

## Introduction

Welcome to this two-day React training! It is very important that you **read and follow these instructions before the actual training**.

## Human requirements

- You are a developer, devsigner or such with working professional knowledge on JavaScript, HTML and CSS. You don't have to be a guru, but the training is not suitable for total beginners.
- Learn the ES6 syntax (see below) beforehand so you don't have to spend time learning it in the training.
- We are going to show code examples and use [TypeScript](http://www.typescriptlang.org/) in our training so it will help you immensely to know the basics. However, you don't have to write TypeScript if you don't want to.

### ES6 syntax

We are going to use the "new" ES6 syntax to write our JavaScript. Features / syntax you will definitely need to know are:

- Block scoped variables: `let` and `const`

```js
const foo = 'bar'
let quux = 123
```

- Modules and their `import` and `export` syntax

```js
import React, { useState } from 'react'

export function App() {
  ...
}
```

- Arrow function syntax

```js
const getStuff = (id) => {  ... }
```

- Array / object destructing

```js
const { persons } = props
const [person1, person2] = persons
```

- `Promise`s and `async` / `await` syntax

```js
async function getStuff() {
  ...
}

const stuff = await getStuff()
```

## Computer requirements

- MacOS and Linux will definitely work. Windows should probably work too, but please test it before hand!
- A recent version of [Node.js](https://nodejs.org/en/). Node.js 10 or newer will likely work.
- The [Yarn](https://yarnpkg.com/lang/en/) package manager is recommended. NPM will work too if you're old school.
- [VSCode](https://code.visualstudio.com/) is the recommended editor and the project is preconfigured to work with it. Other editors / IDEs will of course work too but are not officially supported.

### Browser extensions

Install these Chrome extensions, or similar ones for your browser of choice.

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Installation

Start by cloning this repository.

If you don't know how to use Git then please spend some time to [learn the basics](https://guides.github.com/introduction/git-handbook/).

`step0` is the branch that contains the starting point for our training.

- `git checkout step0`

### client

- `cd client`
- `yarn` to install packages
- `yarn start` to start the client

Open browser and go to http://localhost:3000/. You should see a very simple welcoming page.

### server

- `cd server`
- `yarn` to install packages
- `yarn start` to start the server

Open browser and go to http://localhost:8889/persons and you should see big list of persons in JSON.

If you can open both the client and the server successfully in your browser then you are good to go!
