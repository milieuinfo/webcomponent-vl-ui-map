const VlMapDrawAction = require('./vl-map-draw-action');

class VlMapDrawPolygonAction extends VlMapDrawAction {
  async draw(...coordinates) {
    await super.draw(async () => {
      coordinates = coordinates.length > 0 ? coordinates : [{x: 10, y: 10}, {x: 10, y: 20}, {x: 20, y: 20}, {x: 20, y: 10}];
      const map = await this.getMap();
      const actions = this.driver.actions();
      for (let i = 0; i < coordinates.length; i++) {
        const coordinate = coordinates[i];
        if (i+1 < coordinates.length) {
          await actions.move({origin: map, x: coordinate.x, y: coordinate.y}).click();
        } else {
          await actions.move({origin: map, x: coordinate.x, y: coordinate.y}).doubleClick().perform();
        }
      }
    });
  }
}

module.exports = VlMapDrawPolygonAction;
