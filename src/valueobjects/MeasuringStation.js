import { definitionToRecord } from '../definitions';

export const MeasuringStationDefinition = {
  'metadata': 'Metadata',

  'url': null,
  'id': null,
  'timeseries': null,
  'image_url': null,
  'code': null,
  'name': null,
  'region': null,
  'station_type': null,
  'category': null,
  'frequency': null,
  'geometry': null
};

const MeasuringStationRecord = definitionToRecord(
  'MeasuringStation', MeasuringStationDefinition);

export class MeasuringStation extends MeasuringStationRecord {
}
