# Spellbook for Dungeons and Dragons 5E

<p align="center">
  <img src="https://github.com/user-attachments/assets/1179fd87-d655-45a4-965e-c2684fab73ff" alt="Spellbook demo" />
</p>

## Try it yourself!

> [!TIP]
> The app is deployed to Github pages. You can access it [here](https://german-e-mas.github.io/spellbook/).

## Background

The back of my D&D character sheets usually look like a long list of random notes about everything. My inventory also is full of baubles, trinkets and assorted garbage, like a late-game graphic adventure. Nowadays I am playing a Wizard, and since I have to keep track of my known spells, I ran out of space quickly.

There are tons of apps out there to track your spells and slots, but why not invent another wheel and build my own?

This is a fun personal project to try different technologies and features, such as:

- Use [D&D 5e API](https://www.dnd5eapi.co/).
- Angular 19 [resources](https://angular.dev/api/core/Resource) and elements of the [new control flow](https://angular.dev/guide/templates/control-flow).
- Unit and Integration tests with Angular's [default testing configuration](https://angular.dev/guide/testing), which involves Karma and Jasmine.
- E2E tests with [Cypress](https://www.cypress.io/).
- Try some BDD with [Cucumber](https://cucumber.io/) using [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)

## Running the app locally

1. Clone this repository and `cd` into it.
2. Make sure you have [Node v22](https://nodejs.org/) installed.
3. Run: `npm install`
4. Run: `npm start`

## Running tests

For unit and integration tests, which run using the Angular CLI, run `npm run test`.

For E2E tests, run `npm run cypress:run`.

You can also run `npm run e2e` or `npm run cypress:open` to open Cypress and run specs manually, which is helpful for debugging the tests.

## Deployment

This app is deployed to Github pages. That can be done by manually uploading the build artifacts to a branch and have Github deploy from there, but I'm using [angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages), which is the preferred way to do so according to [Angular's Deployment documentation](https://angular.dev/tools/cli/deployment#automatic-deployment-with-the-cli).

Once everything is in place, you can deploy by running `ng deploy --base-href=/spellbook/`.

> [!NOTE]
> The `/` surrounding the repository name are important!

## Notes

- Spells are stored in the Local Storage simply because I didn't want to deal with a database for this project.
- I believe the API doesn't support pagination so the first list spells is quite large.
- It would be nice to filter by class, school and level. The list contains Druid spells for example. Ew.
