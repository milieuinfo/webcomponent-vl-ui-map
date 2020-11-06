const VlMapAction = require('./vl-map-action');

class VlMapDrawAction extends VlMapAction {
  draw({x = 10, y = 10} = {x: 10, y: 10}) {
    const actions = this.driver.actions();
    return actions.move({origin: this, x: x, y: y}).click().perform();
  }
}

module.exports = VlMapDrawAction;
