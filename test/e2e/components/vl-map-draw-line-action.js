const VlMapAction = require('./vl-map-action');

class VlMapDrawLineAction extends VlMapAction {
  async draw(c1 = {x: 10, y: 10}, c2 = {x: 20, y: 20}) {
    const map = await this.getMap();
    await map.scrollIntoView();
    await map.driver.actions()
        .move({origin: map, x: c1.x, y: c1.y})
        .click()
        .move({origin: map, x: c2.x, y: c2.y})
        .click().perform();
  }
}

module.exports = VlMapDrawLineAction;
