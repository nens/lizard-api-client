import { endpoint, request } from '../http';
import Metadata from '../valueobjects/Metadata';
import Organisation from '../valueobjects/Organisation';
import { valueObjects } from '../valueobjects/index';

import { processSingleResultResponse } from "../tools";

const DEFAULT_SRID = 4326;

export function search(q, types = null, exclude = []) {
  let params = {
    'q': q
  };

  if (types && types.length) {
    params.types = types.join();
  }

  if (exclude && exclude.length) {
    params.exclude = exclude.join();
  }

  return request('/search/', params).then(
    (results) =>
      results.map(
        (result) => new SearchResult(result)
      )
  );
}

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
          processSingleResultResponse('Parcel', result, url)
        );
      });
    }
  );
}
