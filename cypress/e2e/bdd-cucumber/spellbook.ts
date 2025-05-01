import {
  Given,
  When,
  Then,
  BeforeAll,
} from '@badeball/cypress-cucumber-preprocessor';

// Setup
BeforeAll(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

// Background
Given('I am at the Spellbook page', () => {
  cy.visit('/spellbook');
});

// Scenario #1 - Empty spellbook
Given('I have no spells in my spellbook', () => {
  cy.window().then((win) => {
    expect(win.localStorage.getItem('spells')).to.be.null;
  });
});

Then('I see a warning in the page', () => {
  cy.get('div.error').should('exist');
});

// Scenario #2 - See the spell list
Given('Fireball and Magic Missile are in my Spellbook', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('spells', '["fireball", "magic-missile"]');
  });
});

Then('I see Fireball and Magic Missile in the list of spells', () => {
  cy.get('div.error').should('not.exist');

  cy.get('[data-cy="spellbook"]')
    .children()
    .filter('mat-list-item')
    .should('have.length', 2);
});

// Scenario #3 - Remove a spell
When('I click on the Remove button', () => {
  cy.get('[data-cy="spellbook"]')
    .find('mat-list-item')
    .contains('div', /^Fireball/)
    .should('exist')
    .closest('mat-list-item')
    .contains('button', 'delete')
    .click();
});

Then('Fireball should no longer be in the list', () => {
  cy.get('[data-cy="spellbook"]')
    .children()
    .filter('mat-list-item')
    .should('have.length', 1);
});

// Scenario #4 - See the details of a spell
Given('Fireball is in my Spellbook', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('spells', '["fireball"]');
  });
});

When('I click on the Details button', () => {
  cy.get('[data-cy="spellbook"]')
    .find('mat-list-item')
    .contains('div', /^Fireball/)
    .should('exist')
    .closest('mat-list-item')
    .contains('a', 'launch')
    .click();
});

Then('I am taken to the Fireball spell detail page', () => {
  cy.url().should('include', '/spell/fireball');
});
