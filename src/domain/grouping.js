import { groupBy, orderBy, chain } from 'lodash';
import moment from 'moment';

export default { by };

function by(items, grouping) {
    return orderBy(Object.entries(groupBy(items,
        (d) => moment(d.dateLastActivity).format(grouping + " yyyy"))),
        ([k, i]) => sortKey(k))
        .map(([k, i]) => {
            return {
                title: title(k, grouping),
                items: i
            };
        });
}

function title(value, by) {
    return {
        "W": "Week of " + monday(value),
        "M": month(value),
        "Q": "Q" + value
    }[by[0]];
}

function month(key) {
    const parsed = parse(key);
    return moment()
        .date(1)
        .month(parsed.value - 1)
        .year(parsed.year)
        .format("MMMM yyyy");
}

function monday(key) {
    const parsed = parse(key);
    return moment()
        .weekYear(parsed.year)
        .week(parsed.value)
        .day("Monday")
        .format("MMMM D");
}

function parse(key) {
    return {
        value: key.split(' ')[0],
        year: key.split(' ')[1]
    }
}

function sortKey(key) {
    const parsed = parse(key);
    return `${parsed.year} ${parsed.value.padStart(2, '0')}`;
}