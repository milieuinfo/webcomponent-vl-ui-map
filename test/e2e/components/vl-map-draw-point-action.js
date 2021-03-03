const VlMapDrawAction = require('./vl-map-draw-action');

class VlMapDrawPointAction extends VlMapDrawAction {
  async draw({x = 10, y= 10} = {x: 10, y: 10}) {
    await super.draw(async () => {
      const map = await this.getMap();
      const actions = this.driver.actions();
      await actions.move({origin: map, x: x, y: y}).click().perform();
    });
  }
}

module.exports = VlMapDrawPointAction;
