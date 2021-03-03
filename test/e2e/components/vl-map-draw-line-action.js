const VlMapDrawAction = require('./vl-map-draw-action');

class VlMapDrawLineAction extends VlMapDrawAction {
  async draw(c1 = {x: 10, y: 10}, c2 = {x: 20, y: 20}) {
    await super.draw(async () => {
      const map = await this.getMap();
      await map.driver.actions()
          .move({origin: map, x: c1.x, y: c1.y})
          .click()
          .move({origin: map, x: c2.x, y: c2.y})
          .doubleClick().perform();
    });
  }
}

module.exports = VlMapDrawLineAction;
