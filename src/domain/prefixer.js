import words from './words';
import { orderBy, uniq } from 'lodash';

export default { group };

function group(cards) {
    return orderBy(
        uniq(words.prefixes(cards)).map(grouped(cards)), 
        g => g.count, 
        "desc");
}

function grouped(cards) {
    return prefix => {
        const groupCards = byPrefix(cards, prefix);
        return { 
            prefix, 
            count: groupCards.length, 
            cards: groupCards 
        }
    }

    function byPrefix(cards, prefix) {
        return cards.filter(c => words.prefix(c) === prefix);
    }
}        
