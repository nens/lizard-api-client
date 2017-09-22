import { definitionToRecord } from '../definitions';

export const TimeseriesDefinition = {
  // Metadata, filled in by http.js
  'metadata': 'Metadata',

  // Fields from the API
  'uuid': null,
  'name': null,
  'start': null,
  'end': null,
  'events': null,
  'observation_type': 'ObservationType',
  'last_value': null
};

const TimeseriesRecord = definitionToRecord(
  'Timeseries', TimeseriesDefinition);

export class Timeseries extends TimeseriesRecord {
}
