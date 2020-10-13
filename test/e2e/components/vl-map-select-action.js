const VlMapAction = require('./vl-map-action');

class VlMapSelectAction extends VlMapAction {
  async isClustered() {
    return this.hasAttribute('cluster');
  }
}

module.exports = VlMapSelectAction;
