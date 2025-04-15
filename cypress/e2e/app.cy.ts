describe('Homepage', () => {
  it('Visits the initial page and load spells', () => {
    cy.visit('/');

    cy.get('[data-cy="title"]').contains(
      'Dungeons and Dragons 5th Edition Spells',
    );

    cy.get('[data-cy="spell-list"]')
      .children()
      .should('have.length.greaterThan', 1);
  });

  it('Should have the active spell list tab', () => {
    cy.visit('/');

    cy.get('[data-cy="tabs"] a')
      .filter('.mdc-tab--active')
      .should('have.length', 1)
      .contains('Spell List');
  });

  it('Should have the active spellbook tab', () => {
    cy.visit('/spellbook');

    cy.get('[data-cy="tabs"] a')
      .filter('.mdc-tab--active')
      .should('have.length', 1)
      .contains('Spellbook');
  });

  it('Should not have any active tabs on Spell Detail page', () => {
    cy.visit('/spell/fireball');

    cy.get('[data-cy="tabs"] a')
      .filter('.mdc-tab--active')
      .should('have.length', 0);
  });
});
