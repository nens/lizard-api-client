import { request } from './http';
import { Record } from 'immutable';
import { Organisation } from './organisation';

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
export class RasterStore extends RasterStoreRecord {
  getData(filters = {}) {
    return request('/rasters/' + this.uuid + '/data/', filters);
  }

  getTimesteps(filters = {}) {
    return request('/rasters/' + this.uuid + '/timesteps/', filters);
  }
}

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

export class RasterStoreDetail extends RasterStoreDetailRecord {
  getWmsUrl() {
  }
}

// Retrieve rasters from the API rasterstore list page.
export function getRasters(filters = {}) {
  return request('/rasters/', filters).then(function (results) {
    return results.map(function (result) {
      if (result.organisation) {
        result = result.set('organisation', new Organisation(result.organisation));
      }
      return new RasterStore(result);
    });
  });
}

export function getRasterDetail(uuid) {
  return request('/rasters/' + uuid + '/').then(function (data) {
    if (data.organisation) {
      data = data.set('organisation', new Organisation(data.organisation));
    }
    return new RasterStoreDetail(data);
  });
}
