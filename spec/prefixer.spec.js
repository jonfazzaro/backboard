import subject from '../src/domain/prefixer'

describe('The prefixer', () => {
  describe('when grouping cards by prefix', () => {
    it('returns a group for each different prefix', () => {
      const cards = [
        { name: 'Spiral: out' },
        { name: 'Spiral: in' },
        { name: 'Keep: going' },
      ]
      expect(JSON.stringify(subject.group(cards))).toEqual(
        JSON.stringify([
            { prefix: 'Spiral', count: 2, cards: [cards[0], cards[1]] },
            { prefix: 'Keep', count: 1, cards: [cards[2]] },
        ]),
      )
    })
  })
})
