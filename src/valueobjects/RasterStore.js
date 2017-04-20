import { request } from '../http';
import { Record } from 'immutable';

// Definition of the fields that a RasterStore from the list view has. Not exported.
const RasterStoreRecord = Record({
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
  'last_modified': null
}, 'RasterStore');

// Subclass that defines helper methods.
export default class RasterStore extends RasterStoreRecord {
  getData(filters = {}) {
    return request('/rasters/' + this.uuid + '/data/', filters);
  }

  getTimesteps(filters = {}) {
    return request('/rasters/' + this.uuid + '/timesteps/', filters);
  }
}
