import { groupBy, orderBy } from "lodash";
import { DateTime } from "luxon";

const Grouping = { by };
export default Grouping;

function by(items, grouping) {
  return orderBy(
    Object.entries(
      groupBy(items, d =>
        DateTime.fromISO(d.dateLastActivity).toFormat(grouping + " yyyy")
      )
    ),
    ([k, _]) => sortKey(k)
  ).map(([k, i]) => {
    return {
      title: title(k, grouping),
      items: i,
    };
  });
}

function title(value, by) {
  return {
    W: "Week of " + monday(value),
    M: month(value),
    q: "Q" + value,
  }[by[0]];
}

function month(key) {
  const parsed = parse(key);
  return DateTime.fromObject({
    day: 1,
    month: parsed.value,
    year: parsed.year,
  }).toFormat("MMMM yyyy");
}

function monday(key) {
  const parsed = parse(key);
  return DateTime.fromObject({
    weekYear: parsed.year,
    weekNumber: parsed.value,
    weekday: 1
  }).toFormat("MMMM d");
}

function parse(key) {
  return {
    value: key.split(" ")[0],
    year: key.split(" ")[1],
  };
}

function sortKey(key) {
  const parsed = parse(key);
  return `${parsed.year} ${parsed.value.padStart(2, "0")}`;
}
