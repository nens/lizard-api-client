import { request } from '../http';
import SearchResult from '../valueobjects/SearchResult';

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
