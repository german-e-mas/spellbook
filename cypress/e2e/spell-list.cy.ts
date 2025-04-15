describe('Spell List', () => {
  it('Should add spell to spellbook', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('spells', '["magic-missile"]');
      },
    });

    cy.get('[data-cy="spell-list"]')
      .find('mat-list-item')
      .contains('div', /^Fireball/)
      .should('exist')
      .closest('mat-list-item')
      .contains('button', 'add')
      .click();

    cy.window().then((win) => {
      expect(win.localStorage.getItem('spells')).to.equal(
        '["magic-missile","fireball"]',
      );
    });
  });

  it('Should navigate to spell details', () => {
    cy.visit('/');

    cy.get('[data-cy="spell-list"]')
      .find('mat-list-item')
      .contains('div', /^Fireball/)
      .should('exist')
      .closest('mat-list-item')
      .contains('a', 'launch')
      .click();

    cy.url().should('include', '/spell/fireball');
  });
});
