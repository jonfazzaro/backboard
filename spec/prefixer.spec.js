import { describe, it, expect } from 'vitest';
import subject from '../src/domain/prefixer'

describe('The prefixer', () => {
  describe('when grouping cards by prefix', () => {
    it('returns a group for each different prefix', () => {
      const cards = [
        { name: 'Spiral: out', dateLastActivity: "2022-05-06T20:20:02.718Z" },
        { name: 'Spiral: in', dateLastActivity: "2022-04-06T20:20:02.718Z" },
        { name: 'Keep: going', dateLastActivity: "2022-03-06T20:20:02.718Z" },
      ]
      expect(JSON.stringify(subject.group(cards))).toEqual(
        JSON.stringify([
            { prefix: 'Spiral', count: 2, cards: [cards[1], cards[0]] },
            { prefix: 'Keep', count: 1, cards: [cards[2]] },
        ]),
      )
    })
  })
})
