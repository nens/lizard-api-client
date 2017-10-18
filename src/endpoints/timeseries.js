import { endpoint, request } from '../http';
import { processMultipleResultsResponse } from '../tools';

const ONE_WEEK_MS = 604800000;

const getStartDefault = (end) => {
  // For now, return constant value. Later this default should be
  // "<defaultEnd> minus <constant>", e.g. 'now' minus one week
  return end - ONE_WEEK_MS;
};

const getEndDefault = () => {
  // Now.
  return (new Date()).getTime();
};

const getUUIDforParcel = (parcelId) => {
  // For now, return constant value. Later on, we should have this id after
  // retrieving the parcel data from hydra-core/geoServer.
  return 'a0f2bfe3-3cbd-4084-adbe-5cca5d2feb2f';
};

// Retrieve timeseries from the timeseries API
export function getTimeseries(timeseriesUuid, start, end, params) {
  let parameters = {};

  if (params) {
    Object.assign(parameters, params);
  }
  parameters.uuid = timeseriesUuid;

  if (start && end) {
    parameters.start = start;
    parameters.end = end;
  };

  let url = endpoint('/timeseries/', parameters);

  return request(url).then((result) => {
    return processMultipleResultsResponse('Timeseries', result, url);
  });
}
