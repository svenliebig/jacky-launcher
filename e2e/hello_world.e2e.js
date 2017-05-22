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
});
