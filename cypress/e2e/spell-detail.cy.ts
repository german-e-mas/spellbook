describe('Spell Details', () => {
  it('Should show the spell information', () => {
    cy.visit('/spell/fireball');

    cy.get('mat-card-title').contains('Fireball');
    cy.get('mat-card-subtitle').contains('3rd level');
    cy.get('mat-card-content').contains('8d6 fire damage on a failed save');
    cy.get('mat-card-footer').contains('Sphere, 20 feet');
  });

  it('Should not have any active tabs on Spell Detail page', () => {
    cy.visit('/spell/fireball');

    cy.get('[data-cy="tabs"] a')
      .filter('.mdc-tab--active')
      .should('have.length', 0);
  });

  it('Should show a warning if spell is not found', () => {
    cy.visit('/spell/bad-fireball');

    cy.get('div.error').should('exist');
  });
});
