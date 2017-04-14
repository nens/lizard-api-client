import { Record } from 'immutable';

const MetadataRecord = new Record({
  'sourceUrl': null,
  'index': null,
  'retrieved': null
}, 'Metadata');

export class Metadata extends MetadataRecord {
}
