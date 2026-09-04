import { groupBy, orderBy } from "lodash";
import { Temporal } from "@js-temporal/polyfill";
import ActivityDate from "./activity-date";

const Grouping = { by };
export default Grouping;

function by(items, grouping) {
  return orderBy(
    Object.entries(
      groupBy(items, d =>
        key(ActivityDate.from(d.dateLastActivity), grouping)
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
  return Temporal.PlainDate.from({
    month: Number(parsed.value),
    year: Number(parsed.year),
    day: 1,
  }).toLocaleString(undefined, { month: "long", year: "numeric" });
}

function monday(key) {
  const parsed = parse(key);
  const firstWeekDate = Temporal.PlainDate.from({
    year: Number(parsed.year),
    month: 1,
    day: 4,
  });
  const firstMonday = firstWeekDate.subtract({
    days: firstWeekDate.dayOfWeek - 1,
  });

  return firstMonday
    .add({ weeks: Number(parsed.value) - 1 })
    .toLocaleString(undefined, { month: "long", day: "numeric" });
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

function key(date, grouping) {
  return {
    W: `${date.weekOfYear} ${date.year}`,
    M: `${date.month} ${date.year}`,
    q: `${Math.ceil(date.month / 3)} ${date.year}`,
  }[grouping];
}
