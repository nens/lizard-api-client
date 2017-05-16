import { definitionToRecord } from '../definitions';

export const WmsInfoDefinition = {
  'layer': null,
  'endpoint': null,
  'example_url': null
};

const WmsInfoRecord = definitionToRecord('WmsInfo', WmsInfoDefinition);

export class WmsInfo extends WmsInfoRecord {
}
