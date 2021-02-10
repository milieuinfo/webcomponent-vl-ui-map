const VlMapAction = require('./vl-map-action');

class VlMapDrawPointAction extends VlMapAction {
  async draw({x, y} = {x: 10, y: 10}) {
    const map = await this.getMap();
    await map.scrollIntoView();
    const actions = this.driver.actions();
    await actions.move({origin: map, x: x, y: y}).click().perform();
  }
}

module.exports = VlMapDrawPointAction;
