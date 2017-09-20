/* Helper functions for datetimes, to configure which time to show,
   convert them to formats, etc.
  */

export class DateTime {
  /*
  Our DateTime class.

  The format for configuring a datetime to show is as follows:

  For absolute times:

  {
    type: "absolute",
    date: new Date()  // For a single time
  }

  An argument that is a Date or a timestamp gets converted to an absolute time.

  For relative times:

  {
    type: "relative",
    to: "now",  // or "start" or "end" (of a timeseries)
    offset: // Number of seconds for a single time
  }

  If "to" isn't given, it's to now; if offset isn't given, it's 0.

  If only a string "absolute" is given, it's absolute now (doesn't change after). If
  "relative" is given, it's relative now (keeps moving).

  If a DateTime instance is given, create a copy.
  */

  constructor (date) {
    if (date === "absolute") {
      date = {type: "absolute"};
    } else if (date === "relative") {
      date = {type: "relative"};
    } else if (date instanceof Date) {
      date = {type: "absolute", date: date}
    } else if (typeof date === 'number') {
      date = {type: "absolute", date: new Date(date)}
      console.log("Date is number, date is now", date);
    } else if (typeof date === DateTime) {
      date = date.asObject();
    }

    this.type = date.type;
    this.date = null;
    this.to = null;
    this.offset = null;

    if (this.type === "absolute") {
      this.date = date.date || new Date();
    } else {
      // Relative
      this.to = date.to || "now";
      this.offset = date.offset || 0;
    }
  }

  asDate(start, end) {
    // Needs to be passed the start and end of a timeseries, in case
    // time can be relative to that.
    console.log("asDate", this.type, this.to, this.offset, this.date, start, end);
    if (this.type === "absolute") {
      return this.date;
    }
    if (this.type === "relative") {
      let base;
      if (this.to === "now") {
        base = new Date();
      } else if (this.to === "start") {
        base = new DateTime(start).asDate();
      } else if (this.to === "end") {
        base = new DateTime(end).asDate();
      } else {
        console.log("No this.to (", this.to, ")");
        return null;
      }
      return new Date(base.getTime() + (this.offset || 0) * 1000);
    }
  }

  // Convert to various formats
  asObject() {
    // To make copies
    return {
      type: this.type,
      date: this.date,
      to: this.to,
      offset: this.offset
    };
  }

  asWmsTimeParam(start, end) {
    const d = this.asDate(start, end);
    let utcTime = d.toISOString();
    // String now has '.000Z' at the end, not sure if that is OK -- but it seems to work
    // after removing my hacks that removed it.
    return utcTime
  }

  asTimestamp(start, end) {
    return this.asDate(start, end).getTime();
  }

  needsStartEnd() {
    // If this datetime is relative to a start or end, then they need to be passed. If not,
    // then it's OK to not compute them and just pass in null.
    return this.type === "relative" && (
      this.to === "start" || this.to === "end");
  }
}


export class Period {
  /*
    A time period (to show in a graph, for instance) is two DateTimes.

    So a time period that shows all the available data in a timeseries is e.g.

    [{type: "relative", to: "start", offset: 0},
     {type: "relative", to: "end", offset: 0}]
   */
  constructor(start, end) {
    if (!(start instanceof DateTime)) {
      start = DateTime(start);
    }
    if (!(end instanceof DateTime)) {
      end = DateTime(end);
    }
    this.start = start;
    this.end = end;
  }

  durationSeconds(start, end) {
    // Pass the start and end of a timeseries if times can be relative to that.
    const startDate = this.start.asDate(start, end);
    const endDate = this.end.asDate(start, end);

    return endDate.getTime() - startDate.getTime();
  }
}
