import { endpoint, request } from '../http';
import Metadata from '../valueobjects/Metadata';
import Organisation from '../valueobjects/Organisation';
import { valueObjects } from '../valueobjects/index';

const DEFAULT_SRID = 4326;

export function searchParcels(q, bbox) {
  const params = { q: q, type: 'parcel' };
  if (bbox) {
    params.in_bbox = bbox;
    params.srid = DEFAULT_SRID;
  }
  const url = endpoint('/search/', params);
  return request(url).then(
    data => {
      const listOfPromises = data.results.map(result =>
        request(result.entity_url)
      );
      return Promise.all(listOfPromises).then(allPromisesData => {
        return allPromisesData.map(result =>
          processSingleParcelResponse(result, url)
        );
      });
    }
  );
}

function processSingleParcelResponse(result, url) {
  const props = result.properties;
  const processedResult = {
    geometry: result.geometry,
    id: result.id,
    code: props.code,
    name: props.name,
    external_id: props.external_id,
    organisation: new Organisation({
      name: props.organisation.name,
      unique_id: props.organisation.unique_id,
      url: props.organisation.url,
      users_url: props.organisation.users_url
    }),
    metadata: new Metadata({
      sourceUrl: url,
      index: null,
      retrieved: Date.now()
    })
  };
  return new valueObjects.Parcel(processedResult);
}


