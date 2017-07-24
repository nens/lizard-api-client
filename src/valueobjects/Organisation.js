import { Record } from 'immutable';

const OrganisationRecord = new Record({
  'url': null,
  'unique_id': null,
  'users_url': null,
  'name': null
});

export default class Organisation extends OrganisationRecord {
}

