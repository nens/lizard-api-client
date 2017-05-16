import { Record } from 'immutable';

const TimeseriesRecord = Record({
  // Metadata, filled in by http.js
  'metadata': null,

  // Fields from the API
  'uuid': null,
  'name': null,
  'parcel_id': null,
  'start': null,
  'end': null,
  'events': null
});

export default class Timeseries extends TimeseriesRecord {
}
