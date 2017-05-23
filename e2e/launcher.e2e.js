import { expect } from 'chai';
import testUtils from './utils';

describe('application launch', () => {
  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('it shows an empty input field', function () {
    return this.app.client.getText('#commandline').then((text) => {
      expect(text).to.equal('');
    });
  });

  it('it shows a suggestion when i write one into the commandline', function () {
	  this.app.client.setValue('#commandline', 'one').then(() => {

		  let sug = this.app.client.elements('.suggestion');

		  expect(sug.length).to.equal(1);
	  });
  });

  it('it shows ten suggestions when i write ten into the commandline', function () {
	  this.app.client.setValue('#commandline', 'ten').then(() => {

		  let sug = this.app.client.elements('.suggestion');

		  expect(sug.length).to.equal(10);
	  });
  });
});
