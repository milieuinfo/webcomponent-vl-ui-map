import{VlElement}from"/node_modules/vl-ui-core/vl-core.js";export class VlMapAction extends(VlElement(HTMLElement)){connectedCallback(){this.__registerMapActionChangedCallback()}static isVlMapAction(){return!0}static get NEW_ACTION_EVENT_NAME(){return"new-action-activated"}get layer(){return this._layer}set layer(t){this._layer=t,this._layerChangedCallback()}get action(){return this._action}get _map(){if(this.parentNode)return this.parentNode.map}activateAction(){this._action&&(this._map.activateAction(this._action),this.actionChanged())}actionChanged(){const t=new Event(VlMapAction.NEW_ACTION_EVENT_NAME);this.parentElement.dispatchEvent(t)}_layerChangedCallback(){this._computeAction(this._map,this.layer)}_createAction(){console.log("implementatie van de _createAction ontbreekt")}_computeAction(t,e){let a;t&&e&&(a=this._createAction(e),this.parentElement.addAction(a),this.actionChanged()),this._action=a}__registerMapActionChangedCallback(){this.parentElement.addEventListener(VlMapAction.NEW_ACTION_EVENT_NAME,()=>{this.setAttribute("active",this._map&&this._map.currentAction==this._action)})}}