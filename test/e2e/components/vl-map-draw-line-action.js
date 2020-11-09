const VlMapAction = require('./vl-map-action');

class VlMapDrawLineAction extends VlMapAction {
  async draw(c1 = {x: 10, y: 10}, c2 = {x: 20, y: 20}) {
    await this.scrollIntoView();
    const actions = this.driver.actions();
    await actions.move({origin: this, x: c1.x, y: c1.y}).click().perform();
    return actions.move({origin: this, x: c2.x, y: c2.y}).click().click().perform();
  }
}

module.exports = VlMapDrawLineAction;
