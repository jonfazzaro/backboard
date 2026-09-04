import { Temporal } from "@js-temporal/polyfill";

const ActivityDate = { from };
export default ActivityDate;

function from(value) {
  if (!value.includes("T")) return Temporal.PlainDate.from(value);

  return Temporal.Instant.from(value)
    .toZonedDateTimeISO(Temporal.Now.timeZoneId())
    .toPlainDate();
}
