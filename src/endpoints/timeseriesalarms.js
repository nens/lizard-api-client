import { endpoint, request } from '../http';
import { processMultipleResultsResponse } from '../tools';

export function getTimeseriesAlarms(filters = {}) {
  let url = endpoint('/timeseriesalarms/', filters);

  return request(url).then(function (results) {
    results = {
      'count': 2,
      'next': null,
      'previous': null,
      'results': [
        {
          'url': 'https://nxt.staging.lizard.net/api/v3/timeseriesalarms/a5370b1e-610e-4d11-b5d0-1e2d110e2041/',
          'uuid': 'a5370b1e-610e-4d11-b5d0-1e2d110e2041',
          'name': 'Testalarm',
          'organisation': {
            'url': 'https://nxt.staging.lizard.net/api/v3/organisations/61f5a464c35044c19bc7d4b42d7f58cb/',
            'name': 'Nelen & Schuurmans',
            'unique_id': '61f5a464c35044c19bc7d4b42d7f58cb',
            'users_url': 'https://nxt.staging.lizard.net/api/v3/organisations/61f5a464c35044c19bc7d4b42d7f58cb/users/'
          },
          'active': true,
          'timeseries': {
            'url': 'https://nxt.staging.lizard.net/api/v3/timeseries/0ec8a6b9-c2f0-4240-b663-f073895d4744/',
            'uuid': "bf34f12e-08c5-4226-a03d-fcf3a86cf1f9",
            'name': 'OMZD_30,1_BARO',
            'code': '0ec8a6b9-c2f0-4240-b663-f073895d4744'
          },
          'comparison': '>',
          'observation_type': {
            'url': 'https://nxt.staging.lizard.net/api/v3/observationtypes/28/',
            'code': 'WNS9040',
            'parameter': 'Stijghoogte',
            'unit': 'mNAP',
            'scale': 'interval',
            'description': '',
            'domain_values': null,
            'reference_frame': 'NAP',
            'compartment': 'GW'
          },
          'thresholds': [],
          'messages': [],
          'warning_threshold': true,
          'warning_value': null,
          'warning_timestamp': null
        },
        {
          'url': 'https://nxt.staging.lizard.net/api/v3/timeseriesalarms/e86fbb4a-28d0-439f-ad2f-12ea3081c309/',
          'uuid': 'e86fbb4a-28d0-439f-ad2f-12ea3081c309',
          'name': 'Test migratie Parramatta alarmen',
          'organisation': {
            'url': 'https://nxt.staging.lizard.net/api/v3/organisations/61f5a464c35044c19bc7d4b42d7f58cb/',
            'name': 'Nelen & Schuurmans',
            'unique_id': '61f5a464c35044c19bc7d4b42d7f58cb',
            'users_url': 'https://nxt.staging.lizard.net/api/v3/organisations/61f5a464c35044c19bc7d4b42d7f58cb/users/'
          },
          'active': true,
          'timeseries': {
            'url': 'https://nxt.staging.lizard.net/api/v3/timeseries/0ec8a6b9-c2f0-4240-b663-f073895d4744/',
            'uuid': '0ec8a6b9-c2f0-4240-b663-f073895d4744',
            'name': 'WNS1400',
            'code': 'WNS1400::second::1::3600'
          },
          'comparison': '>',
          'observation_type': {
            'url': 'https://nxt.staging.lizard.net/api/v3/observationtypes/128/',
            'code': 'WNS1400',
            'parameter': 'Regen',
            'unit': 'mm',
            'scale': 'ratio',
            'description': '',
            'domain_values': null,
            'reference_frame': '',
            'compartment': ''
          },
          'thresholds': [],
          'messages': [],
          'warning_threshold': null,
          'warning_value': null,
          'warning_timestamp': null
        }
      ]
    };
    return processMultipleResultsResponse('TimeseriesAlarm', results, url);
  });
}
