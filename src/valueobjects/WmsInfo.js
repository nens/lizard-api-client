import { insertGetParam } from '../http';
import { DateTime } from '../datetime';

import { definitionToRecord } from '../definitions';

export const WmsInfoDefinition = {
  'layer': null,
  'endpoint': null,
  'example_url': null
};

const WmsInfoRecord = definitionToRecord('WmsInfo', WmsInfoDefinition);

export class WmsInfo extends WmsInfoRecord {
  addTimeToEndpoint(date, start, end) {
    return insertGetParam(
      this.endpoint,
      'TIME',
      new DateTime(date).asWmsTimeParam(start, end));
  }
}
