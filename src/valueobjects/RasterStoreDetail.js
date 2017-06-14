import { definitionToRecord } from '../definitions';

// Fields from the detail page, more than from the list page
export const RasterStoreDetailDefinition = {
  // Metadata
  'metadata': 'Metadata',

  // Fields from the API
  'url': null,
  'uuid': null,

  'name': null,
  'description': null,
  'organisation': null,
  'access_modifier': null,
  'origin': null,
  'interval': null,
  'first_value_timestamp': null,
  'last_value_timestamp': null,
  'supplier': null,
  'supplier_code': null,
  'last_modified': null,

  'wms_info': 'WmsInfo',
  'options': null
};

const RasterStoreDetailRecord = definitionToRecord(
  'RasterStoreDetail', RasterStoreDetailDefinition);

export class RasterStoreDetail extends RasterStoreDetailRecord {
}
