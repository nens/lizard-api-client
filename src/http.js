const baseUrl = (() => {
  let absoluteBase = 'http://demo.lizard.net/api/v3';

  if (typeof window !== 'undefined') {
    const protocol = window && window.location.protocol;

    const host = window && window.location.host;

    absoluteBase = `${protocol}//${host}/api/v3`;
  }
  return absoluteBase;
})();

export function endpoint(urlFragment, params = {}) {
  let totalParams = Object.assign({'format': 'json'}, params);
  let url = baseUrl + (urlFragment[0] === '/' ? '' : '/') + urlFragment;

  let query = Object.keys(totalParams).map(
    k => encodeURIComponent(k) + '=' + encodeURIComponent(totalParams[k])
  ).join('&');

  if (query) {
    url = url + '?' + query;
  }

  return url;
}

export function request(url) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (this.readyState !== 4) return;

      if (this.status >= 200 && this.status < 300) {
        let json = JSON.parse(this.response);

        resolve(json);
      } else {
        reject(`Status ${this.status}, '${this.statusText}' for URL ${url}.`);
      }
    };

    request.withCredentials = true; // Send cookie.
    request.open('GET', url);
    request.send();
  });
}

export function insertGetParam(url, key, value) {
  // Helper function that escapes key and value and adds it to the URL, works
  // if there are already params present and when not.
  // Does not yet check if key already exists, also not if '#' is
  // present, just adds to the end!

  key = encodeURIComponent(key);
  value = encodeURIComponent(value);
  const kvp = key + '=' + value;

  if (url.indexOf('?') >= 0) {
    return url + '&' + kvp;
  } else {
    return url + '?' + kvp;
  }
}
