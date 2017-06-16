import { definitionToRecord } from '../definitions';
import { addGetParameter } from '../urls';

export const BootstrapDefinition = {
  'metadata': 'Metadata',
  'username': null,
  'first_name': null,
  'authenticated': null,
  'login': null,
  'logout': null
};

const BootstrapRecord = definitionToRecord('Bootstrap', BootstrapDefinition);

export class Bootstrap extends BootstrapRecord {
  doLogout() {
    window.location = addGetParameter(
      this.logout, 'next', window.location.href);
  }

  doLogin() {
    window.location = addGetParameter(
      this.login, 'next', window.location.href);
  }
}
