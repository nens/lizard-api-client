import { fromJS } from 'immutable';
import Metadata from './valueobjects/Metadata';

const baseUrl = (() => {
  let absoluteBase = 'http://demo.lizard.net';

  if (typeof window !== 'undefined') {
    const protocol = window && window.location.protocol;

    const host = window && window.location.host;

    absoluteBase = `${protocol}//${host}/api/v3`;
  }
  return absoluteBase;
})();

export function request(endpoint, filters = {}) {
  let totalFilters = Object.assign({'format': 'json'}, filters);
  let url = baseUrl + (endpoint[0] === '/' ? '' : '/') + endpoint;

  let query = Object.keys(totalFilters).map(
    k => encodeURIComponent(k) + '=' + encodeURIComponent(totalFilters[k])
  ).join('&');

  if (query) {
    url = url + '?' + query;
  }

  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    let result;

    console.log('We get here (1), url is ' + url);

    request.onreadystatechange = function () {
      if (this.readyState !== 4) return;

      if (this.status >= 200 && this.status < 300) {
        let json = JSON.parse(this.response);

        if (json && json['results']) {
          // Add metadata to items in results, return the array.
          result = json.results.map(function (result, idx) {
            result.metadata = new Metadata({
              'sourceUrl': url,
              'index': idx,
              'retrieved': Date.now()
            });
            return result;
          });
        } else {
          // Return the parsed JSON as-is.
          result = json;

          if (typeof result === 'object') {
            result.metadata = new Metadata({
              'sourceUrl': url,
              'index': null,
              'retrieved': Date.now()
            });
          }
        }

        resolve(fromJS(result));  // Turn into Immutable object
      } else {
        reject(`Status ${this.status}, '${this.statusText}' for URL ${url}.`);
      }
    };

    request.open('GET', url);
    request.send();
  });
}
