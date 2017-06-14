import { endpoint, request } from '../http';
import { processMultipleResultsResponse } from '../tools';

const ONE_WEEK_MS = 604800000;

const getStartDefault = (end) => {
  // For now, return constant value. Later this default should be
  // "<defaultEnd> minus <constant>", e.g. 'now' minus one week
  return end - ONE_WEEK_MS;
};

const getEndDefault = () => {
  // For now, return constant value. Later this should be e.g. 'now'
  return 1455922800000;
};

const getUUIDforParcel = (parcelId) => {
  // For now, return constant value. Later on, we should have this id after
  // retrieving the parcel data from hydra-core/geoServer.
  return 'a0f2bfe3-3cbd-4084-adbe-5cca5d2feb2f';
};

// Retrieve timeseries from the timeseries API
export function getTimeseries(
  parcelId = 321,
  end = getEndDefault(),
  start = getStartDefault(end)) {

  const params = {
    uuid: getUUIDforParcel(parcelId),
    start: start,
    end: end
  };

  console.log('[*] TS request started...');
  let url = endpoint('/timeseries/', params);

  return request(url).then((result) => {
    console.log('[*] TS request finished! result =', result);
    return processMultipleResultsResponse('Timeseries', result, url);
  });
}
