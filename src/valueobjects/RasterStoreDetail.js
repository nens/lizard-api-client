import { Record } from 'immutable';

// Fields from the detail page, more than from the list page
const RasterStoreDetailRecord = Record({
  // Metadata
  'metadata': null,

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

  'wms_info': null,
  'options': null
}, 'RasterStoreDetailRecord');

export default class RasterStoreDetail extends RasterStoreDetailRecord {
}
