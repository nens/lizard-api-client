import { request } from '../http';
import RasterStore from '../valueobjects/RasterStore';
import RasterStoreDetail from '../valueobjects/RasterStoreDetail';
import Organisation from '../valueobjects/Organisation';

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
