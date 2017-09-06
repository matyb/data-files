var baseUrl = 'file://' + __dirname.replace(/\\/g, '/') + '/test/';
exports.config = {
  baseUrl: baseUrl,
  onPrepare: () => {
    // By default, Protractor use data:text/html,<html></html> as resetUrl, but
    // location.replace from the data: to the file: protocol is not allowed
    // (we'll get ‘not allowed local resource’ error), so we replace resetUrl with one
    // with the file: protocol (this particular one will open system's root folder)
    browser.resetUrl = baseUrl;
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['client.spec.js'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      // --allow-file-access-from-files - allow XHR from file://
      args: ['allow-file-access-from-files']
    }
  }
};
