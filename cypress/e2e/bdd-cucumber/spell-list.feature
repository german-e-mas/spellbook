Feature: Spell List
    Background:
        Given I am at the home page
        Given I look for the Fireball spell

    Scenario: Add a spell to the Spellbook
        When I click on the Add button
        Then the Fireball spell is added to the Spellbook

    Scenario: See the details of a spell
        When I click on the Details button
        Then I am taken to the Fireball spell detail page