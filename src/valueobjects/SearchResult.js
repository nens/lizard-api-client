import { Record } from 'immutable';

const SearchResultRecord = Record({
  // Metadata, filled in by http.js
  'metadata': null,

  // Fields from the API
  'id': null,
  'title': null,
  'description': null,
  'rank': null,
  'entity_name': null,
  'entity_id': null,
  'entity_url': null,
  'view': null
});

export default class SearchResult extends SearchResultRecord {
}
