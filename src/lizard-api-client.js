import { getRasters } from './rasterstore';

export class LizardApiClient {
  rasters (filters={}) {
    return getRasters(filters)
  }

  raster (uuid) {
    return this.rasters({'uuid': uuid}).then(function (rasters) {
      if (rasters.length > 0) {
        return rasters[0];
      }
    });
  }
}
