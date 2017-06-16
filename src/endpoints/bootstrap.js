import { request } from '../http';
import { processSingleResultResponse, flatten } from '../tools';

export function getBootstrap() {
  let url = '/bootstrap/lizard/';

  return request(url).then(function (result) {
    // This endpoint's JSON is quite nested, but the nesting isn't very relevant
    // to what we want from it. So we just flatten the structure and treat is
    // as a flat object.
    const r = flatten(result);

    return processSingleResultResponse('Bootstrap', r, url);
  });
}
