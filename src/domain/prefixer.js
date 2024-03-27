import words from './words';
import { orderBy, uniq } from 'lodash';

const Prefixer = { group };
export default Prefixer;

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
        return orderBy(
            cards.filter(c => words.prefix(c) === prefix), 
            "dateLastActivity");
    }
}        
