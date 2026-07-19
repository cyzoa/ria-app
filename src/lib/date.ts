export function getTodayDateString(timezone = "Asia/Seoul"): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone }).format(new Date());
}

export function getTimezoneDayBounds(
  date: string,
  timezone = "Asia/Seoul"
): { start: string; end: string } {
  const start = new Date(`${date}T00:00:00`);
  const end = new Date(`${date}T23:59:59.999`);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  });

  const offsetPart = formatter
    .formatToParts(start)
    .find((part) => part.type === "timeZoneName")?.value;

  const offset = offsetPart?.replace("GMT", "") || "+09:00";
  const normalizedOffset =
    offset === "" ? "+00:00" : offset.includes(":") ? offset : `${offset}:00`;

  return {
    start: `${date}T00:00:00${normalizedOffset.length === 6 ? normalizedOffset : "+09:00"}`,
    end: `${date}T23:59:59.999${normalizedOffset.length === 6 ? normalizedOffset : "+09:00"}`,
  };
}
