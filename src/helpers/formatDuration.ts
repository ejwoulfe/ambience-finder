import { ParsedDuration } from "../interfaces/parsed-duration";

interface CopyDuration {
  hours: number | 0;
  minutes: number | 0;
  seconds: number | 0;
}

export function formatDuration(parsedDuration: ParsedDuration) {
  const copy: CopyDuration = createCopy(parsedDuration);
  // format for display (00:00:00)
  let stringHours = "";
  let stringMinutes = "";
  let stringSeconds = "";
  if (copy.hours < 10) {
    stringHours = "0" + copy.hours;
  } else {
    stringHours = copy.hours.toString();
  }
  if (copy.minutes < 10) {
    stringMinutes = "0" + copy.minutes;
  } else {
    stringMinutes = copy.minutes.toString();
  }
  if (copy.seconds < 10) {
    stringSeconds = "0" + copy.seconds;
  } else {
    stringSeconds = copy.seconds.toString();
  }

  const formattedDuration = stringHours + ":" + stringMinutes + ":" + stringSeconds;

  return formattedDuration;
}

function createCopy(parsedDuration: ParsedDuration) {
  // Format will be 00:00:00, hours:minutes:seconds
  const copy = { hours: 0, minutes: 0, seconds: 0 };

  if (parsedDuration.hours !== undefined) {
    copy.hours = parsedDuration.hours;
  }
  if (parsedDuration.minutes !== undefined) {
    copy.minutes = parsedDuration.minutes;
  }
  if (parsedDuration.seconds !== undefined) {
    copy.seconds = parsedDuration.seconds;
  }
  if (parsedDuration.days !== undefined) {
    copy.hours += parsedDuration.days * 24;
  }

  return copy;
}
