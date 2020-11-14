const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const {VlCheckbox} = require('vl-ui-checkbox').Test;

class VlMapLayerSwitcher extends VlElement {
  async getCheckboxForLayer(name) {
    const element = await this.findElement(By.css(`[data-vl-layer="${name}"]`));
    return new VlCheckbox(this.driver, element);
  }
}

module.exports = VlMapLayerSwitcher;
