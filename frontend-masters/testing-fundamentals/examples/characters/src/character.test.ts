import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Character } from './character.js';
import { Person } from './person.js';

const firstName = "Eyub"
const lastName = "Eyub"
const role = "founder"

describe('Character', () => {
  let character = {}
  beforeEach(() => {
    vi.spyOn(Math, "random").mockImplementation(() => 0.5)
    character = new Character(firstName, lastName, role)
  })
  it(
    'should create a character with a first name, last name, and role',
    () => {
      expect.objectContaining({ firstName, lastName, role })
    },
  );

  it('should allow you to increase the level', () => {
    const initialLevel = character.level
    character.levelUp()
    expect(character.level).toBeGreaterThan(initialLevel)
  });

  it('should update the last modified date when leveling up', () => {
    const oldModified = character.lastModified;
    character.levelUp()
    expect(character.lastModified).not.toBe(oldModified)

  });
});
