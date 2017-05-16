import { request } from '../http';
import { definitionToRecord } from '../definitions';

// Definition of the fields that a RasterStore from the list view has.
export const RasterStoreDefinition = {
  'metadata': 'Metadata',

  // Fields from the API
  'url': null,
  'uuid': null,

  'name': null,
  'description': null,
  'organisation': 'Organisation',
  'access_modifier': null,
  'origin': null,
  'interval': null,
  'first_value_timestamp': null,
  'last_value_timestamp': null,
  'supplier': null,
  'supplier_code': null,
  'last_modified': null
};

const RasterStoreRecord = definitionToRecord('RasterStore', RasterStoreDefinition);

// Subclass that defines helper methods.
export class RasterStore extends RasterStoreRecord {
  getData(filters = {}) {
    return request('/rasters/' + this.uuid + '/data/', filters);
  }

  getTimesteps(filters = {}) {
    return request('/rasters/' + this.uuid + '/timesteps/', filters);
  }
}
