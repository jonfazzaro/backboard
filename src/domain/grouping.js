const { groupBy } = require('lodash');
const moment = require('moment');

module.exports = { by };

function by(items, grouping) {
    return Object.entries(groupBy(items,
        (d) => moment(d.dateLastActivity).format(grouping)))
        .map(([k, i]) => {
            return {
                title: title(k, grouping),
                items: i
            };
        });
}

function title(key, by) {
    return {
        "W": "Week of " + monday(key),
        "M": month(key),
        "Q": "Q" + key
    }[by];
}

function month(number) {
    return moment()
        .date(1)
        .month(number - 1)
        .format("MMMM yyyy");
}

function monday(number) {
    return moment()
        .day("Monday")
        .week(number)
        .format("MMMM D");
}
