import { definitionToRecord } from '../definitions';

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
  // Todo: these should support an optional 'next' parameter.
  doLogout() {
    window.location = this.logout;
  }

  doLogin() {
    window.location = this.login;
  }
}
