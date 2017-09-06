describe('basic file import', () => {
  function expectAlert(text){
    const ec = protractor.ExpectedConditions;
    browser.wait(ec.alertIsPresent(), 5000, "Alert is not getting presented :(");
    const alertWin = browser.switchTo().alert();
    expect(alertWin.getText()).toEqual(text);
    alertWin.accept();
  }
  it('should import a file', () => {
    const driver = browser.driver;
    const path = require('path');
    driver.ignoreSynchronization = true;
    driver.get(browser.baseUrl + 'index.html');
    const fileSelect = driver.findElement(by.id('file'));
    // attach listener (ie use)
    fileSelect.sendKeys(path.resolve(__dirname, '../server/test-data.txt'));
    expectAlert("resetting view");
    expectAlert("type:test data:data");
    expectAlert("type:test data:data2");
    expectAlert("type: data:undefined");
  });
});
