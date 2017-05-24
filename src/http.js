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

    request.open('GET', url);
    request.send();
  });
}
