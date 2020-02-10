acd.ol.MapWithActions = function (options) {
  var self = this;
  this.actions = [];

  options = options || {};
  var enableRotation = !options.disableRotation;
  var enableMouseWheelZoom = !options.disableMouseWheelZoom;
  var interactions = ol.interaction.defaults({altShiftDragRotate: enableRotation, pinchRotate: enableRotation, mouseWheelZoom: enableMouseWheelZoom});
  if(options && options.interactions){
    options.interactions.forEach(function(interaction) {interactions.push(interaction);});
  }
  options.interactions = interactions;
  ol.Map.call(this, options);

  options.actions.forEach(function (action) {
    self.addAction(action);
  });

  self.activateDefaultAction();

  if (!options.disableEscapeKey) {
    function activateFirstActionOnEscapeKey(e) {
      if (e && e.keyCode && e.keyCode == 27) {
        self.activateDefaultAction();
      }
    }

    document.body.removeEventListener('keydown',
        activateFirstActionOnEscapeKey);
    document.body.addEventListener('keydown', activateFirstActionOnEscapeKey);
  }
};

acd.ol.MapWithActions.prototype = Object.create(ol.Map.prototype);

acd.ol.MapWithActions.prototype.activateAction = function (action) {
  if (this.currentAction) {
    if (this.currentAction == action) {
      return false;
    }

    this.currentAction.deactivate();
    clearTimeout(this.timeout);
  }

  this.currentAction = action;

  // delay the activation of the action with 300ms because ol has a timeout of 251ms to detect a double click event
  // when we don't use a delay some click and select events of the previous action will be triggered on the new action
  this.timeout = setTimeout(function () {
    action.activate();
  }, acd.ol.MapWithActions.prototype.CLICK_COUNT_TIMEOUT);
};

acd.ol.MapWithActions.prototype.addAction = function (action) {
  var self = this;
  this.actions.push(action);
  action.map = this;
  action.interactions.forEach(function (interaction) {
    self.addInteraction(interaction);
  });
};

acd.ol.MapWithActions.prototype.removeAction = function (action) {
  var self = this;
  if (this.currentAction == action) {
    self.activateDefaultAction();
  }
  action.interactions.forEach(function (interaction) {
    self.removeInteraction(interaction);
  });
  this.actions.splice(this.actions.indexOf(action), 1);
};

acd.ol.MapWithActions.prototype.activateDefaultAction = function () {
  if (this.actions.length > 0 && this.actions[0]) {
    if (this.currentAction == this.actions[0]) {
      this.currentAction.deactivate();
      this.currentAction = undefined;
    }
    this.activateAction(this.actions[0]);
  }
};

acd.ol.MapWithActions.prototype.CLICK_COUNT_TIMEOUT = 300;