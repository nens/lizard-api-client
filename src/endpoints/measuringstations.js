import { endpoint, request } from '../http';
import { processMultipleResultsResponse } from '../tools';

// Retrieve measuringstations from the API measuringstation list page.
export function getMeasuringStations(filters = {}) {
  let url = endpoint('/measuringstations/', filters);

  return request(url).then(function (results) {
    console.log("Results in LAC:", results);
    return processMultipleResultsResponse('MeasuringStation', results, url);
  });
}
