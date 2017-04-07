import { Record } from 'immutable';

const OrganisationRecord = new Record({
  "metadata": null,
  "url": null,
  "unique_id": null,
  "users_url": null,
}, 'Organisation');


export class Organisation extends OrganisationRecord {
}
