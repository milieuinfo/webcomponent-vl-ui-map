const {VlElement} = require('vl-ui-core').Test;
const VlMap = require('./vl-map');

class VlMapAction extends VlElement {
  async isActive() {
    return this.hasAttribute('active');
  }

  async getMap() {
    const map = await new VlMap(this.driver, await this.driver.executeScript('return arguments[0]._mapElement', this));
    await this.driver.wait(async () => {
      try {
        await this.driver.wait(this.driver.executeScript('return arguments[0].ready', map), 1000);
        return true;
      } catch (error) {
        return false;
      }
    });
    return map;
  }
}

module.exports = VlMapAction;
