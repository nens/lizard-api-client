import { request, combineUrlAndParams } from '../http';
import { DateTime } from '../datetime';
import { definitionToRecord } from '../definitions';
import { processSingleResultResponse } from '../tools';

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

  getLimits(leafletArrayBounds, width, height) {
    // Do a WMS GetLimits request to the raster server (it's not standard WMS).
    // Gets the minimum and maximum value for this layer, in the area defined
    // by the (array form of the) Leaflet bounds and the width and height of the map.
    // Leaflet array looks like [[southwest-lat, southwest-lng],
    // [northeast-lat, northeast-lng]].

  }

  getLegend(styles, steps=10) {
    const wmsEndpoint = 'https://nxt.staging.lizard.net/api/v3/wms'; // this.endpoint!

    const params = {
      service: 'wms',
      request: 'getlegend',
      layer: this.layer,
      steps: steps,
      style: styles
    };

    const url = combineUrlAndParams(wmsEndpoint, params);
    return request(url).then(function (data) {
      return processSingleResultResponse('LegendData', data, url);
    });
  }
}
