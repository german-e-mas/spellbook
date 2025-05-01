describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial page and load spells', () => {
    cy.get('[data-cy="title"]').contains(
      'Dungeons and Dragons 5th Edition Spells',
    );

    cy.get('[data-cy="spell-list"]')
      .children()
      .should('have.length.greaterThan', 1);
  });

  it('Should have the active spell list tab', () => {
    cy.get('[data-cy="tabs"] a')
      .filter('.mdc-tab--active')
      .should('have.length', 1)
      .contains('Spell List');
  });
});
