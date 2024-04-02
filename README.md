# Lego minifigs

## Prerequisites

- Node v20.8.0 and higher
- NPM 10.1.0 and higher

## Setup

Make sure to install the dependencies:

```bash
npm install
```

Create an environment file in the root directory. All necessary parameters are listed in `/env` directory, which will be later validated using `zod`

## Run a project

```bash
npm run build
```

After successful build, start the app using the command

```bash
node .output/server/index.mjs
```

## Project

### Homepage

The homepage is a starter point of the app. Homepage can be displayed in two states

1. User has not selected a figure yet and is presented with link to the selection feature
2. User has completed an order and is shown a thank-you message for choosing a figure

### Selection

Selection automatically loads three random figures and saves them to localStorage. This way we will only allow user to trigger randomized selection only once and have user choose from these three

### Order

Order page for specific figure can only be accessed if its id is saved in localStorage, otherwise it will redirect user to homepage

These precautions are implemnted in order to follow business logic, in real life scenario it should not be handled by localStorage because this can be easily ovewritten
