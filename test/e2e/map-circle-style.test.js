const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlMapCircleStylePage = require('./pages/vl-map-circle-style.page');

describe('vl-map-circle-style', async () => {
  const vlMapPage = new VlMapCircleStylePage(driver);

  before(() => {
    return vlMapPage.load();
  });

  it('als gebruiker kan ik een layer met circle stijl definiëren met standaard stijl', async () => {
    const style = await vlMapPage.getStandaardCircleStyle();

    await assert.eventually.equal(style.getColor(), 'rgba(255, 255, 255, 1)');
    await assert.eventually.equal(style.getSize(), '5');
    await assert.eventually.isNull(style.getBorderColor());
    await assert.eventually.isNull(style.getBorderSize());
    await assert.eventually.isNull(style.getTextColor());
    await assert.eventually.isNull(style.getTextOffsetX());
    await assert.eventually.isNull(style.getTextOffsetY());
  });

  it('als gebruiker kan ik een layer met circle stijl definiëren met aangepaste stijl', async () => {
    const style = await vlMapPage.getAangepasteCircleStyle();

    await assert.eventually.equal(style.getColor(), '#fff');
    await assert.eventually.equal(style.getSize(), '10');
    await assert.eventually.equal(style.getBorderColor(), '#000');
    await assert.eventually.equal(style.getBorderSize(), '2');
    await assert.eventually.isNull(style.getTextColor());
    await assert.eventually.isNull(style.getTextOffsetX());
    await assert.eventually.isNull(style.getTextOffsetY());
  });
});
