import { definitionToRecord } from '../definitions';

export const TimeseriesDefinition = {
  // Metadata, filled in by http.js
  'metadata': 'Metadata',

  // Fields from the API
  'uuid': null,
  'name': null,
  'parcel_id': null,
  'start': null,
  'end': null,
  'events': null
};

const TimeseriesRecord = definitionToRecord(
  'Timeseries', TimeseriesDefinition);

export class Timeseries extends TimeseriesRecord {
}
