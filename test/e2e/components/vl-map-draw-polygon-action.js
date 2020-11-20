const VlMapAction = require('./vl-map-action');

class VlMapDrawPolygonAction extends VlMapAction {
  async draw(...coordinates) {
    coordinates = coordinates.length > 0 ? coordinates : [{x: 100, y: 100}, {x: 100, y: 200}, {x: 200, y: 200}, {x: 200, y: 100}];
    await this.scrollIntoView();
    const actions = this.driver.actions();
    for (let i = 0; i < coordinates.length; i++) {
      const coordinate = coordinates[i];
      if (i+1 < coordinates.length) {
        await actions.move({origin: this, x: coordinate.x, y: coordinate.y}).click();
      } else {
        await actions.move({origin: this, x: coordinate.x, y: coordinate.y}).doubleClick().perform();
      }
    }
  }
}

module.exports = VlMapDrawPolygonAction;
