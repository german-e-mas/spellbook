import {
  Given,
  When,
  Then,
  BeforeAll,
} from '@badeball/cypress-cucumber-preprocessor';

let fireballElement: Cypress.Chainable<JQuery<HTMLElement>>;

// Setup
BeforeAll(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

// Background
Given('I am at the home page', () => {
  cy.visit('/');
});

Given('I look for the Fireball spell', () => {
  fireballElement = cy
    .get('[data-cy="spell-list"]')
    .find('mat-list-item')
    .contains('div', /^Fireball/)
    .should('exist')
    .closest('mat-list-item');
});

// Scenario #1 - Add a spell to the Spellbook
When('I click on the Add button', () => {
  fireballElement.contains('button', 'add').click();
});

Then('the Fireball spell is added to the Spellbook', () => {
  cy.window().then((win) => {
    expect(win.localStorage.getItem('spells')).to.equal('["fireball"]');
  });
});

// Scenario #2 - See the details of a spell
When('I click on the Details button', () => {
  fireballElement.contains('a', 'launch').click();
});

Then('I am taken to the Fireball spell detail page', () => {
  cy.url().should('include', '/spell/fireball');
});
