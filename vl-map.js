import { VlElement, awaitScript, define } from '../../../../../../../node_modules/vl-ui-core/vl-core.js';
import '../../../../../../../node_modules/vl-ui-select/vl-select.js';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "@charset \"UTF-8\";\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 2px solid blue;\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: rgba(0, 60, 136, 0.3);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid #eee;\n  border-top: none;\n  color: #eee;\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n}\n\n.ol-overlay-container {\n  will-change: left, right, top, bottom;\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport .ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n.ol-control {\n  position: absolute;\n  background-color: rgba(255, 255, 255, 0.4);\n  border-radius: 4px;\n  padding: 2px;\n}\n\n.ol-control:hover {\n  background-color: rgba(255, 255, 255, 0.6);\n}\n\n.ol-zoom {\n  top: 0.5em;\n  left: 0.5em;\n}\n\n.ol-rotate {\n  top: 0.5em;\n  right: 0.5em;\n  transition: opacity 0.25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.25s linear, visibility 0s linear 0.25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: 0.5em;\n}\n\n.ol-full-screen {\n  right: 0.5em;\n  top: 0.5em;\n}\n\n@media print {\n  .ol-control {\n    display: none;\n  }\n}\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: white;\n  font-size: 1.14em;\n  font-weight: bold;\n  text-decoration: none;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: 0.4em;\n  background-color: rgba(0, 60, 136, 0.5);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  font-size: 1.2em;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  background-color: rgba(0, 60, 136, 0.7);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: 0.5em;\n  right: 0.5em;\n  max-width: calc(100% - 1.3em);\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 0 0.5em;\n  font-size: 0.7rem;\n  line-height: 1.375em;\n  color: #000;\n  text-shadow: 0 0 2px #fff;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n  line-height: inherit;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: \" \";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution ul, .ol-attribution button {\n  display: inline-block;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution.ol-logo-only ul {\n  display: block;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: rgba(255, 255, 255, 0.8);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n  height: 1.1em;\n  line-height: 1em;\n}\n\n.ol-attribution.ol-logo-only {\n  background: transparent;\n  bottom: 0.4em;\n  height: 1.1em;\n  line-height: 1em;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -0.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-logo-only button,\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: 0.5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: inline-block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid #7b98bc;\n  height: 150px;\n  margin: 2px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 1px;\n  left: 2px;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: rgba(255, 255, 255, 0.8);\n}\n\n.ol-overviewmap-box {\n  border: 2px dotted rgba(0, 60, 136, 0.7);\n}\n\n@font-face {\n  font-family: \"Glyphicons Halflings\";\n  src: url(\"../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot\");\n  src: url(\"../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2\") format(\"woff2\"), url(\"../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff\") format(\"woff\"), url(\"../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf\") format(\"truetype\"), url(\"../../../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.svg#glyphicons_halflingsregular\") format(\"svg\");\n}\n.glyphicon, .info-tooltip .close, .info-tooltip .icon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: \"Glyphicons Halflings\";\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.glyphicon-asterisk:before {\n  content: \"*\";\n}\n\n.glyphicon-plus:before {\n  content: \"+\";\n}\n\n.glyphicon-euro:before,\n.glyphicon-eur:before {\n  content: \"€\";\n}\n\n.glyphicon-minus:before {\n  content: \"−\";\n}\n\n.glyphicon-cloud:before {\n  content: \"☁\";\n}\n\n.glyphicon-envelope:before {\n  content: \"✉\";\n}\n\n.glyphicon-pencil:before {\n  content: \"✏\";\n}\n\n.glyphicon-glass:before {\n  content: \"\";\n}\n\n.glyphicon-music:before {\n  content: \"\";\n}\n\n.glyphicon-search:before {\n  content: \"\";\n}\n\n.glyphicon-heart:before {\n  content: \"\";\n}\n\n.glyphicon-star:before {\n  content: \"\";\n}\n\n.glyphicon-star-empty:before {\n  content: \"\";\n}\n\n.glyphicon-user:before {\n  content: \"\";\n}\n\n.glyphicon-film:before {\n  content: \"\";\n}\n\n.glyphicon-th-large:before {\n  content: \"\";\n}\n\n.glyphicon-th:before {\n  content: \"\";\n}\n\n.glyphicon-th-list:before {\n  content: \"\";\n}\n\n.glyphicon-ok:before {\n  content: \"\";\n}\n\n.glyphicon-remove:before, .info-tooltip .close:before {\n  content: \"\";\n}\n\n.glyphicon-zoom-in:before {\n  content: \"\";\n}\n\n.glyphicon-zoom-out:before {\n  content: \"\";\n}\n\n.glyphicon-off:before {\n  content: \"\";\n}\n\n.glyphicon-signal:before {\n  content: \"\";\n}\n\n.glyphicon-cog:before {\n  content: \"\";\n}\n\n.glyphicon-trash:before {\n  content: \"\";\n}\n\n.glyphicon-home:before {\n  content: \"\";\n}\n\n.glyphicon-file:before {\n  content: \"\";\n}\n\n.glyphicon-time:before {\n  content: \"\";\n}\n\n.glyphicon-road:before {\n  content: \"\";\n}\n\n.glyphicon-download-alt:before {\n  content: \"\";\n}\n\n.glyphicon-download:before {\n  content: \"\";\n}\n\n.glyphicon-upload:before {\n  content: \"\";\n}\n\n.glyphicon-inbox:before {\n  content: \"\";\n}\n\n.glyphicon-play-circle:before {\n  content: \"\";\n}\n\n.glyphicon-repeat:before {\n  content: \"\";\n}\n\n.glyphicon-refresh:before, .info-tooltip .icon:before {\n  content: \"\";\n}\n\n.glyphicon-list-alt:before {\n  content: \"\";\n}\n\n.glyphicon-lock:before {\n  content: \"\";\n}\n\n.glyphicon-flag:before {\n  content: \"\";\n}\n\n.glyphicon-headphones:before {\n  content: \"\";\n}\n\n.glyphicon-volume-off:before {\n  content: \"\";\n}\n\n.glyphicon-volume-down:before {\n  content: \"\";\n}\n\n.glyphicon-volume-up:before {\n  content: \"\";\n}\n\n.glyphicon-qrcode:before {\n  content: \"\";\n}\n\n.glyphicon-barcode:before {\n  content: \"\";\n}\n\n.glyphicon-tag:before {\n  content: \"\";\n}\n\n.glyphicon-tags:before {\n  content: \"\";\n}\n\n.glyphicon-book:before {\n  content: \"\";\n}\n\n.glyphicon-bookmark:before {\n  content: \"\";\n}\n\n.glyphicon-print:before {\n  content: \"\";\n}\n\n.glyphicon-camera:before {\n  content: \"\";\n}\n\n.glyphicon-font:before {\n  content: \"\";\n}\n\n.glyphicon-bold:before {\n  content: \"\";\n}\n\n.glyphicon-italic:before {\n  content: \"\";\n}\n\n.glyphicon-text-height:before {\n  content: \"\";\n}\n\n.glyphicon-text-width:before {\n  content: \"\";\n}\n\n.glyphicon-align-left:before {\n  content: \"\";\n}\n\n.glyphicon-align-center:before {\n  content: \"\";\n}\n\n.glyphicon-align-right:before {\n  content: \"\";\n}\n\n.glyphicon-align-justify:before {\n  content: \"\";\n}\n\n.glyphicon-list:before {\n  content: \"\";\n}\n\n.glyphicon-indent-left:before {\n  content: \"\";\n}\n\n.glyphicon-indent-right:before {\n  content: \"\";\n}\n\n.glyphicon-facetime-video:before {\n  content: \"\";\n}\n\n.glyphicon-picture:before {\n  content: \"\";\n}\n\n.glyphicon-map-marker:before {\n  content: \"\";\n}\n\n.glyphicon-adjust:before {\n  content: \"\";\n}\n\n.glyphicon-tint:before {\n  content: \"\";\n}\n\n.glyphicon-edit:before {\n  content: \"\";\n}\n\n.glyphicon-share:before {\n  content: \"\";\n}\n\n.glyphicon-check:before {\n  content: \"\";\n}\n\n.glyphicon-move:before {\n  content: \"\";\n}\n\n.glyphicon-step-backward:before {\n  content: \"\";\n}\n\n.glyphicon-fast-backward:before {\n  content: \"\";\n}\n\n.glyphicon-backward:before {\n  content: \"\";\n}\n\n.glyphicon-play:before {\n  content: \"\";\n}\n\n.glyphicon-pause:before {\n  content: \"\";\n}\n\n.glyphicon-stop:before {\n  content: \"\";\n}\n\n.glyphicon-forward:before {\n  content: \"\";\n}\n\n.glyphicon-fast-forward:before {\n  content: \"\";\n}\n\n.glyphicon-step-forward:before {\n  content: \"\";\n}\n\n.glyphicon-eject:before {\n  content: \"\";\n}\n\n.glyphicon-chevron-left:before {\n  content: \"\";\n}\n\n.glyphicon-chevron-right:before {\n  content: \"\";\n}\n\n.glyphicon-plus-sign:before {\n  content: \"\";\n}\n\n.glyphicon-minus-sign:before {\n  content: \"\";\n}\n\n.glyphicon-remove-sign:before {\n  content: \"\";\n}\n\n.glyphicon-ok-sign:before {\n  content: \"\";\n}\n\n.glyphicon-question-sign:before {\n  content: \"\";\n}\n\n.glyphicon-info-sign:before {\n  content: \"\";\n}\n\n.glyphicon-screenshot:before {\n  content: \"\";\n}\n\n.glyphicon-remove-circle:before {\n  content: \"\";\n}\n\n.glyphicon-ok-circle:before {\n  content: \"\";\n}\n\n.glyphicon-ban-circle:before {\n  content: \"\";\n}\n\n.glyphicon-arrow-left:before {\n  content: \"\";\n}\n\n.glyphicon-arrow-right:before {\n  content: \"\";\n}\n\n.glyphicon-arrow-up:before {\n  content: \"\";\n}\n\n.glyphicon-arrow-down:before {\n  content: \"\";\n}\n\n.glyphicon-share-alt:before {\n  content: \"\";\n}\n\n.glyphicon-resize-full:before {\n  content: \"\";\n}\n\n.glyphicon-resize-small:before {\n  content: \"\";\n}\n\n.glyphicon-exclamation-sign:before {\n  content: \"\";\n}\n\n.glyphicon-gift:before {\n  content: \"\";\n}\n\n.glyphicon-leaf:before {\n  content: \"\";\n}\n\n.glyphicon-fire:before {\n  content: \"\";\n}\n\n.glyphicon-eye-open:before {\n  content: \"\";\n}\n\n.glyphicon-eye-close:before {\n  content: \"\";\n}\n\n.glyphicon-warning-sign:before {\n  content: \"\";\n}\n\n.glyphicon-plane:before {\n  content: \"\";\n}\n\n.glyphicon-calendar:before {\n  content: \"\";\n}\n\n.glyphicon-random:before {\n  content: \"\";\n}\n\n.glyphicon-comment:before {\n  content: \"\";\n}\n\n.glyphicon-magnet:before {\n  content: \"\";\n}\n\n.glyphicon-chevron-up:before {\n  content: \"\";\n}\n\n.glyphicon-chevron-down:before {\n  content: \"\";\n}\n\n.glyphicon-retweet:before {\n  content: \"\";\n}\n\n.glyphicon-shopping-cart:before {\n  content: \"\";\n}\n\n.glyphicon-folder-close:before {\n  content: \"\";\n}\n\n.glyphicon-folder-open:before {\n  content: \"\";\n}\n\n.glyphicon-resize-vertical:before {\n  content: \"\";\n}\n\n.glyphicon-resize-horizontal:before {\n  content: \"\";\n}\n\n.glyphicon-hdd:before {\n  content: \"\";\n}\n\n.glyphicon-bullhorn:before {\n  content: \"\";\n}\n\n.glyphicon-bell:before {\n  content: \"\";\n}\n\n.glyphicon-certificate:before {\n  content: \"\";\n}\n\n.glyphicon-thumbs-up:before {\n  content: \"\";\n}\n\n.glyphicon-thumbs-down:before {\n  content: \"\";\n}\n\n.glyphicon-hand-right:before {\n  content: \"\";\n}\n\n.glyphicon-hand-left:before {\n  content: \"\";\n}\n\n.glyphicon-hand-up:before {\n  content: \"\";\n}\n\n.glyphicon-hand-down:before {\n  content: \"\";\n}\n\n.glyphicon-circle-arrow-right:before {\n  content: \"\";\n}\n\n.glyphicon-circle-arrow-left:before {\n  content: \"\";\n}\n\n.glyphicon-circle-arrow-up:before {\n  content: \"\";\n}\n\n.glyphicon-circle-arrow-down:before {\n  content: \"\";\n}\n\n.glyphicon-globe:before {\n  content: \"\";\n}\n\n.glyphicon-wrench:before {\n  content: \"\";\n}\n\n.glyphicon-tasks:before {\n  content: \"\";\n}\n\n.glyphicon-filter:before {\n  content: \"\";\n}\n\n.glyphicon-briefcase:before {\n  content: \"\";\n}\n\n.glyphicon-fullscreen:before {\n  content: \"\";\n}\n\n.glyphicon-dashboard:before {\n  content: \"\";\n}\n\n.glyphicon-paperclip:before {\n  content: \"\";\n}\n\n.glyphicon-heart-empty:before {\n  content: \"\";\n}\n\n.glyphicon-link:before {\n  content: \"\";\n}\n\n.glyphicon-phone:before {\n  content: \"\";\n}\n\n.glyphicon-pushpin:before {\n  content: \"\";\n}\n\n.glyphicon-usd:before {\n  content: \"\";\n}\n\n.glyphicon-gbp:before {\n  content: \"\";\n}\n\n.glyphicon-sort:before {\n  content: \"\";\n}\n\n.glyphicon-sort-by-alphabet:before {\n  content: \"\";\n}\n\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\";\n}\n\n.glyphicon-sort-by-order:before {\n  content: \"\";\n}\n\n.glyphicon-sort-by-order-alt:before {\n  content: \"\";\n}\n\n.glyphicon-sort-by-attributes:before {\n  content: \"\";\n}\n\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\";\n}\n\n.glyphicon-unchecked:before {\n  content: \"\";\n}\n\n.glyphicon-expand:before {\n  content: \"\";\n}\n\n.glyphicon-collapse-down:before {\n  content: \"\";\n}\n\n.glyphicon-collapse-up:before {\n  content: \"\";\n}\n\n.glyphicon-log-in:before {\n  content: \"\";\n}\n\n.glyphicon-flash:before {\n  content: \"\";\n}\n\n.glyphicon-log-out:before {\n  content: \"\";\n}\n\n.glyphicon-new-window:before {\n  content: \"\";\n}\n\n.glyphicon-record:before {\n  content: \"\";\n}\n\n.glyphicon-save:before {\n  content: \"\";\n}\n\n.glyphicon-open:before {\n  content: \"\";\n}\n\n.glyphicon-saved:before {\n  content: \"\";\n}\n\n.glyphicon-import:before {\n  content: \"\";\n}\n\n.glyphicon-export:before {\n  content: \"\";\n}\n\n.glyphicon-send:before {\n  content: \"\";\n}\n\n.glyphicon-floppy-disk:before {\n  content: \"\";\n}\n\n.glyphicon-floppy-saved:before {\n  content: \"\";\n}\n\n.glyphicon-floppy-remove:before {\n  content: \"\";\n}\n\n.glyphicon-floppy-save:before {\n  content: \"\";\n}\n\n.glyphicon-floppy-open:before {\n  content: \"\";\n}\n\n.glyphicon-credit-card:before {\n  content: \"\";\n}\n\n.glyphicon-transfer:before {\n  content: \"\";\n}\n\n.glyphicon-cutlery:before {\n  content: \"\";\n}\n\n.glyphicon-header:before {\n  content: \"\";\n}\n\n.glyphicon-compressed:before {\n  content: \"\";\n}\n\n.glyphicon-earphone:before {\n  content: \"\";\n}\n\n.glyphicon-phone-alt:before {\n  content: \"\";\n}\n\n.glyphicon-tower:before {\n  content: \"\";\n}\n\n.glyphicon-stats:before {\n  content: \"\";\n}\n\n.glyphicon-sd-video:before {\n  content: \"\";\n}\n\n.glyphicon-hd-video:before {\n  content: \"\";\n}\n\n.glyphicon-subtitles:before {\n  content: \"\";\n}\n\n.glyphicon-sound-stereo:before {\n  content: \"\";\n}\n\n.glyphicon-sound-dolby:before {\n  content: \"\";\n}\n\n.glyphicon-sound-5-1:before {\n  content: \"\";\n}\n\n.glyphicon-sound-6-1:before {\n  content: \"\";\n}\n\n.glyphicon-sound-7-1:before {\n  content: \"\";\n}\n\n.glyphicon-copyright-mark:before {\n  content: \"\";\n}\n\n.glyphicon-registration-mark:before {\n  content: \"\";\n}\n\n.glyphicon-cloud-download:before {\n  content: \"\";\n}\n\n.glyphicon-cloud-upload:before {\n  content: \"\";\n}\n\n.glyphicon-tree-conifer:before {\n  content: \"\";\n}\n\n.glyphicon-tree-deciduous:before {\n  content: \"\";\n}\n\n.glyphicon-cd:before {\n  content: \"\";\n}\n\n.glyphicon-save-file:before {\n  content: \"\";\n}\n\n.glyphicon-open-file:before {\n  content: \"\";\n}\n\n.glyphicon-level-up:before {\n  content: \"\";\n}\n\n.glyphicon-copy:before {\n  content: \"\";\n}\n\n.glyphicon-paste:before {\n  content: \"\";\n}\n\n.glyphicon-alert:before {\n  content: \"\";\n}\n\n.glyphicon-equalizer:before {\n  content: \"\";\n}\n\n.glyphicon-king:before {\n  content: \"\";\n}\n\n.glyphicon-queen:before {\n  content: \"\";\n}\n\n.glyphicon-pawn:before {\n  content: \"\";\n}\n\n.glyphicon-bishop:before {\n  content: \"\";\n}\n\n.glyphicon-knight:before {\n  content: \"\";\n}\n\n.glyphicon-baby-formula:before {\n  content: \"\";\n}\n\n.glyphicon-tent:before {\n  content: \"⛺\";\n}\n\n.glyphicon-blackboard:before {\n  content: \"\";\n}\n\n.glyphicon-bed:before {\n  content: \"\";\n}\n\n.glyphicon-apple:before {\n  content: \"\";\n}\n\n.glyphicon-erase:before {\n  content: \"\";\n}\n\n.glyphicon-hourglass:before {\n  content: \"⌛\";\n}\n\n.glyphicon-lamp:before {\n  content: \"\";\n}\n\n.glyphicon-duplicate:before {\n  content: \"\";\n}\n\n.glyphicon-piggy-bank:before {\n  content: \"\";\n}\n\n.glyphicon-scissors:before {\n  content: \"\";\n}\n\n.glyphicon-bitcoin:before {\n  content: \"\";\n}\n\n.glyphicon-btc:before {\n  content: \"\";\n}\n\n.glyphicon-xbt:before {\n  content: \"\";\n}\n\n.glyphicon-yen:before {\n  content: \"¥\";\n}\n\n.glyphicon-jpy:before {\n  content: \"¥\";\n}\n\n.glyphicon-ruble:before {\n  content: \"₽\";\n}\n\n.glyphicon-rub:before {\n  content: \"₽\";\n}\n\n.glyphicon-scale:before {\n  content: \"\";\n}\n\n.glyphicon-ice-lolly:before {\n  content: \"\";\n}\n\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\";\n}\n\n.glyphicon-education:before {\n  content: \"\";\n}\n\n.glyphicon-option-horizontal:before {\n  content: \"\";\n}\n\n.glyphicon-option-vertical:before {\n  content: \"\";\n}\n\n.glyphicon-menu-hamburger:before {\n  content: \"\";\n}\n\n.glyphicon-modal-window:before {\n  content: \"\";\n}\n\n.glyphicon-oil:before {\n  content: \"\";\n}\n\n.glyphicon-grain:before {\n  content: \"\";\n}\n\n.glyphicon-sunglasses:before {\n  content: \"\";\n}\n\n.glyphicon-text-size:before {\n  content: \"\";\n}\n\n.glyphicon-text-color:before {\n  content: \"\";\n}\n\n.glyphicon-text-background:before {\n  content: \"\";\n}\n\n.glyphicon-object-align-top:before {\n  content: \"\";\n}\n\n.glyphicon-object-align-bottom:before {\n  content: \"\";\n}\n\n.glyphicon-object-align-horizontal:before {\n  content: \"\";\n}\n\n.glyphicon-object-align-left:before {\n  content: \"\";\n}\n\n.glyphicon-object-align-vertical:before {\n  content: \"\";\n}\n\n.glyphicon-object-align-right:before {\n  content: \"\";\n}\n\n.glyphicon-triangle-right:before {\n  content: \"\";\n}\n\n.glyphicon-triangle-left:before {\n  content: \"\";\n}\n\n.glyphicon-triangle-bottom:before {\n  content: \"\";\n}\n\n.glyphicon-triangle-top:before {\n  content: \"\";\n}\n\n.glyphicon-console:before {\n  content: \"\";\n}\n\n.glyphicon-superscript:before {\n  content: \"\";\n}\n\n.glyphicon-subscript:before {\n  content: \"\";\n}\n\n.glyphicon-menu-left:before {\n  content: \"\";\n}\n\n.glyphicon-menu-right:before {\n  content: \"\";\n}\n\n.glyphicon-menu-down:before {\n  content: \"\";\n}\n\n.glyphicon-menu-up:before {\n  content: \"\";\n}\n\n.ol-zoom .ol-zoom-out {\n  margin-top: 204px;\n}\n\n.ol-zoomslider {\n  background-color: transparent;\n  top: 2.3em;\n  left: 0.58em;\n}\n\n.ol-touch .ol-zoom .ol-zoom-out {\n  margin-top: 212px;\n}\n\n.ol-zoom-in.ol-has-tooltip:hover [role=tooltip],\n.ol-zoom-in.ol-has-tooltip:focus [role=tooltip] {\n  top: 3px;\n}\n\n.ol-zoom-out.ol-has-tooltip:hover [role=tooltip],\n.ol-zoom-out.ol-has-tooltip:focus [role=tooltip] {\n  top: 232px;\n}\n\n.ol-scale-line {\n  border: 1px solid #222222;\n}\n\n.ol-overviewmap {\n  margin-bottom: 30px;\n  border: 1px solid #222222;\n}\n.ol-overviewmap .ol-overviewmap-map {\n  cursor: pointer;\n  height: 100px;\n  width: 100px;\n  box-sizing: border-box;\n  margin: 0px;\n}\n.ol-overviewmap button {\n  display: none;\n}\n\n.ol-control.ol-zoom, .ol-control.layer-switcher {\n  border: 1px solid #222222;\n}\n.ol-control.layer-switcher {\n  opacity: 0.9;\n  margin-top: 50px;\n}\n.ol-control.layer-switcher button {\n  background-image: none;\n  font-family: \"Glyphicons Halflings\";\n  display: inline-block;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  color: #333;\n  font-size: 25px;\n}\n.ol-control.layer-switcher button:before {\n  content: \"\";\n}\n.ol-control.layer-switcher button:focus {\n  outline: none;\n}\n.ol-control.layer-switcher button:focus ~ .panel {\n  display: block;\n}\n.ol-control.layer-switcher .panel {\n  margin-bottom: 0px;\n}\n.ol-control.layer-switcher .panel ul {\n  margin-bottom: 0px;\n  padding: 5px 8px;\n}\n.ol-control.layer-switcher .panel ul li input {\n  width: auto;\n  margin-right: 10px;\n}\n.ol-control.layer-switcher .panel ul li label {\n  float: none;\n  clear: none;\n  margin-bottom: 0px;\n}\n\n.info-tooltip {\n  position: relative;\n  color: white;\n  background-color: black;\n  padding: 5px 10px;\n  opacity: 0.8;\n  border-radius: 5px;\n  font-size: 0.8em;\n}\n.info-tooltip .icon {\n  -animation: spin 0.7s infinite linear;\n  -webkit-animation: spin2 0.7s infinite linear;\n}\n.info-tooltip .close {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  color: white;\n  opacity: 0.6;\n  font-size: 10px;\n}\n.info-tooltip .close:hover {\n  opacity: 1;\n}\n@-webkit-keyframes spin2 {\n  from {\n    -webkit-transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n  }\n}\n@keyframes spin {\n  from {\n    transform: scale(1) rotate(0deg);\n  }\n  to {\n    transform: scale(1) rotate(360deg);\n  }\n}\n.info-tooltip .arrow {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n  left: 50%;\n  margin-left: -6px;\n  border-bottom-width: 0;\n  border-top-color: black;\n  bottom: -11px;\n  border-width: 6px;\n}\n\n.measure-tooltip {\n  position: absolute;\n  color: white;\n  background-color: black;\n  padding: 5px 10px;\n  opacity: 0.8;\n  border-radius: 5px;\n  font-size: 0.8em;\n  bottom: 20px;\n  white-space: nowrap;\n  pointer-events: none;\n}\n\n:host {\n  --vl-map--margin-top: 0px;\n}\n\n#map {\n  height: calc(var(--vl-map-height, 500px) - var(--vl-map--margin-top));\n  width: 100%;\n}\n\n.ol-zoom, .ol-zoomslider, .ol-rotate {\n  margin-top: var(--vl-map--margin-top) !important;\n}\n\n.ol-overlaycontainer-stopevent > .ol-zoom {\n  border-radius: 0;\n}\n.ol-overlaycontainer-stopevent > .ol-overviewmap {\n  border-radius: 0;\n  width: 100px;\n  height: 100px;\n}\n.ol-overlaycontainer-stopevent > .ol-scale-line {\n  border-radius: 0;\n  background-color: white;\n}\n.ol-overlaycontainer-stopevent > .ol-scale-line .ol-scale-line-inner {\n  border-color: black;\n  color: black;\n}\n.ol-overlaycontainer-stopevent > .ol-control {\n  margin-top: 0;\n}\n.ol-overlaycontainer-stopevent > .ol-zoomslider {\n  background: none;\n}\n.ol-overlaycontainer-stopevent > .ol-zoomslider .ol-zoomslider-thumb {\n  margin-bottom: 5px;\n}";
styleInject(css);

/**
 * VlMap
 * @class
 * @classdesc De kaart component.
 *
 * @extends VlElement
 * 
 * @property {boolean} disable-escape-key - Attribuut wordt gebruikt om ervoor te zorgen dat de escape toets niet gebruikt kan worden.
 * @property {boolean} disable-rotation - Attribuut wordt gebruikt om ervoor te zorgen dat het niet mogelijk is om de kaart te draaien.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
class VlMap extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
                :host {
                    display: none;
                    position: relative;
                }
                
                ${css}
            </style>

            <div id="map"></div>
        `);

        this.__updateMapSizeOnLoad();
        this.__updateOverviewMapSizeOnLoad();
    }
    
    /**
     * Geeft de OpenLayers map terug.
     * 
     * @Return {acd.ol.CustomMap}
     */
    get map() {
        return this._map;
    }

    get disableEscapeKey() {
        return this.getAttribute('disable-escape-key') != undefined;
    }

    get disableRotation() {
        return this.getAttribute('disable-rotation') != undefined;
    }

    get _geoJSON() {
        if (!this.__geoJSON) {
            this.__geoJSON = new ol.format.GeoJSON();
        }
        return this.__geoJSON;
    }

    get _mapElement() {
        return this._shadow.querySelector('#map');
    }

    get _projection() {
        return new ol.proj.Projection({
            code: 'EPSG:31370',
            extent: this._extent
        });
    }

    get _extent() {
        return [9928, 66928, 272072, 329072];
    }

    connectedCallback() {
        this.__initializeCoordinateSystem();

        this._map = new acd.ol.CustomMap({
            actions: [],
            disableEscapeKey: this.disableEscapeKey,
            disableRotation: this.disableRotation,
            customLayers: {
                baseLayerGroup: this.__createLayerGroup('Basis lagen', []),
                overviewMapLayers: [],
                overlayGroup: this.__createLayerGroup('Lagen', [])
            },
            projection: this._projection,
            target: this._mapElement
        });

        this._map.initializeView();
    }

    /**
     * Voegt een kaartactie toe aan de kaart.
     * 
     * @param {ol.interaction} action 
     */
    addAction(action) {
        this._map.addAction(action);
    }

    /**
     * Zoomt op de kaart naar de bounding box.
     * 
     * @param {Number[]} boundingbox 
     */
    zoomTo(boundingbox) {
        this._map.zoomToExtent(boundingbox);
    }

    __updateMapSize() {
        this.style.display = 'block';
        if (this._map) {
            this._map.updateSize();
        }
    }

    __updateOverviewMapSize() {
        if (this._map.overviewMapControl) {
            this._map.overviewMapControl.getOverviewMap().updateSize();
        }
    }

    __updateOverviewMapSizeOnLoad() {
        window.addEventListener('load', this.__updateOverviewMapSize.bind(this), { once: true });
    }

    __updateMapSizeOnLoad() {
        window.addEventListener('load', this.__updateMapSize.bind(this), { once: true });
    }

    __createLayerGroup(title, layers) {
        return new ol.layer.Group({
            title: title,
            layers: layers
        });
    }

    __initializeCoordinateSystem() {
        proj4.defs('EPSG:31370', '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs');
    }
}

/**
 * VlMap
 * @class
 * @classdesc De kaart overview component.
 *
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-overview-map.html|Demo}
 */
class VlMapOverviewMap extends VlElement(HTMLElement) {
    connectedCallback() {
        this._configureMap();
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    _configureMap() {
        (async () => {
            while (!(this._map && this._map.overviewMapControl)) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            this._map.addControl(this._map.overviewMapControl);
        })();
    }
}

/**
 * VlMapLayer
 * @class
 * @classdesc De kaart laag component.
 *
 * @property {string} name - Attribuut bepaalt de kaartlaag naam.
 * @property {boolean} auto-extent - Attribuut geeft aan of er automatisch gezoomt wordt op de kaartlaag zodat al de features zichtbaar zijn.
 * @property {boolean} cluster - Attribuut geeft aan of de features geclusterd moeten worden of niet.
 * @property {number} cluster-distance - Attribuut geeft aan vanaf welke afstand tussen features er geclusterd mag worden.
 * @property {string[]} features - Attribuut die de kaartlaag bevat.
 * 
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-layer.html|Demo}
 */
class VlMapLayer extends VlElement(HTMLElement) {
    static get _observedAttributes() {
        return ['auto-extent', 'features'];
    } 

    constructor() {
        super();
        VlMapLayer._counter = 0;
        this.__geoJSON = new ol.format.GeoJSON();
        this.__counter = ++VlMapLayer._counter;
    }

    connectedCallback() {
        this._layer = this.__createLayer(this._name, this.features);
        this._configureMap();
    }

    static get _counter() {
        return this.__counter;
    }

    static set _counter(counter) {
        this.__counter = counter;
    }

    /**
     * Geeft de OpenLayers kaartlaag.
     * 
     * @returns {ol.layer.Layer}
     */
    get layer() {
        return this._layer;
    }

    /**
     * Geeft de OpenLayers kaartlaag source.
     * 
     * @returns {ol.source}
     */
    get source() {
        return this._source;
    }

    /**
     * Geeft de OpenLayers features collectie van de kaartlaag terug.
     * 
     * @returns {object}
     */
    get features() {
        const features = this.getAttribute('features');
        return features ? this.__geoJSON.readFeatures(features) : [];
    }

    /**
     * Zet de OpenLayers features collectie op de kaartlaag.
     * 
     * @param {object} features
     */
    set features(features) {
        this.setAttribute('features', JSON.stringify(features));
    }

    /**
     * Geeft de OpenLayers kaartlaag stijl.
     * 
     * @returns {ol.style}
     */
    get style() {
        if (this._layer) {
            return this._layer.getStyle();
        }
    }
    
    /**
     * Zet de OpenLayers kaartlaag stijl.
     * 
     * @param {ol.style} style
     */
    set style(style) {
        this._style = style;
        this._layer.setStyle(style);
    }

    get _name() {
        return this.getAttribute('name') || 'kaartlaag';
    }

    get _autoExtent() {
        return this.getAttribute('auto-extent') != undefined;
    }

    get _cluster() {
        return this.getAttribute('cluster') != undefined;
    }

    get _clusterDistance() {
        return this.getAttribute('cluster-distance');
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    /**
     * Verwijdert de stijl van al de kaartlaag features.
     */
    verwijderFeatureStijlen() {
        if (this._source && this._source.getFeatures()) {
            this._source.getFeatures().forEach((feature) => {
                feature.setStyle(null);
            });
        }
    }

    /**
     * Rendert de kaart opnieuw.
     */
    rerender() {
        if (this._map) {
            this._map.render();
        }
    }

    /**
     * Geeft de feature terug op basis van het id attribuut.
     * 
     * @param {number} id
     */
    getFeature(id) {
        if (this._source && this._source.getFeatures()) {
            return this._source.getFeatures().filter((feature) => {
                return feature.getId() === id;
            })[0];
        }
    }

    /**
     * Geeft de cluster terug op basis van het id attribuut.
     * 
     * @param {number} id
     */
    getCluster(id) {
        if (this._layer) {
            return this._layer.getSource().getFeatures().filter((cluster) => {
                const features = cluster.get('features');
                if (features) {
                    return features.some((feature) => {
                        return feature.getId() === id;
                    });
                } else {
                    return false;
                }
            })[0];
        }
    }

    _auto_extentChangedCallback(oldValue, newValue) {
        this.__zoomToExtent();
    }

    _featuresChangedCallback(oldValue, newValue) {
        if (newValue && this._layer) {
            this._source.clear();
            this._source.addFeatures(this.features);
            this.__zoomToExtent();
            this.rerender();
        }
    }

    __zoomToExtent() {
        if (this._map && this._autoExtent) {
            this._map.zoomToExtent(this.__getBoundingbox());
        }
    }

    __createLayer(title, features) {
        const layer = new ol.layer.Vector({
            title: title,
            source: this.__createSource(features),
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        layer.set('id', this.__counter);
        return layer;
    }

    __createSource(features) {
        this._source = new ol.source.Vector({
            features: features
        });
        return this._cluster ? this.__createClusterSource(this._source) : this._source;
    }

    __createClusterSource(source) {
        return new ol.source.Cluster({
            distance: this._clusterDistance,
            source: source,
            geometryFunction: (feature) => {
                const geometry = feature.getGeometry();
                if (geometry instanceof ol.geom.Point) {
                    return geometry;
                } else {
                    return this.__negeerClustering();
                }
            }
        });
    }

    __getBoundingbox() {
        let boundingbox;
        if (this._source && this._source.getFeatures().length > 0) {
            boundingbox = this._source.getExtent();
        }
        return boundingbox;
    }

    __negeerClustering() {
        return null;
    }

    _configureMap() {
        if (this._map) {
            this._map.getOverlayLayers().push(this._layer);
            this.__zoomToExtent();
        }
    }
}

/**
 * VlMapBaseLayer
 * @class
 * @classdesc De kaart basis laag component.
 *
 * @extends VlElement
 * 
 * @property {(wmts | wfs )} type - Attribuut wordt gebruikt om aan te geven wat het type is van de kaartlaag.
 * @property {string} url - Attribuut geeft aan via welke URL gebruikt wordt om de kaartlaag op te halen.
 * @property {string} layer - Attribuut geeft aan wat de kaartlaag identifier is.
 * @property {string} title - Attribuut bepaalt de titel van de kaartlaag.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
class VlMapBaseLayer extends VlElement(HTMLElement) {
    connectedCallback() {
        this._configureMap();
    }

    /**
     * Geeft het kaartlaag type terug.
     * 
     * @Return {string}
     */
    get type() {
        return this.getAttribute('type') || 'wmts';
    }

    /**
     * Geeft de kaartlaag URL terug.
     * 
     * @Return {string}
     */
    get url() {
        return this.getAttribute('url');
    }

    /**
     * Geeft de kaartlaag identifier terug.
     * 
     * @Return {string}
     */
    get layer() {
        return this.getAttribute('layer');
    }

    /**
     * Geeft de kaartlaag titel terug.
     * 
     * @Return {string}
     */
    get title() {
        return this.getAttribute('title');
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    get _projection() {
        if (this.parentNode) {
            return this.parentNode._projection;
        }
    }

    get _WMTSSource() {
        this._wmtsSource = this._wmtsSource || this._createWMTSSource();
        return this._wmtsSource;
    }

    get _vectorSource() {
        this._createdVectorSource = this._createdVectorSource || this._createVectorSource();
        return this._createdVectorSource;
    }

    _configureMap() {
        if(this._map) {
            this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(), this._createBaseLayer());
        }
    }

    _createWMTSSource() {
        let size = ol.extent.getWidth(this._projection.getExtent()) / 256;
        let resolutions = new Array(16);
        let matrixIds = new Array(16);
        for (let z = 0; z < 16; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }

        return new ol.source.WMTS({
            url: this.url,
            layer: this.layer,
            matrixSet: 'BPL72VL',
            format: 'image/png',
            projection: this._projection,
            tileGrid: new ol.tilegrid.WMTS({
                extent: this._projection.getExtent(),
                origin: ol.extent.getTopLeft(this._projection.getExtent()),
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            style: ''
        });
    }

    _createVectorSource() {
        var self = this;
        return new ol.source.Vector({
            format: new ol.format.GeoJSON({
                defaultDataProjection: self._projection
            }),
            url: function() {
                return self.url + '&typeName=' + self.layer;
            },
            strategy: ol.loadingstrategy.bbox
        });
    }

    _createBaseLayer() {
        switch(this.type) {
            case 'wmts':
                return new ol.layer.Tile({
                    title: this.title,
                    type: 'base',
                    source: this._WMTSSource
                });
            case 'wfs':
                return new ol.layer.Vector({
                    source: this._vectorSource,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 1.0)',
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 0, 0, 1.0)'
                        })
                    })
                });
        }
    }
}

/**
 * VlMapBaseLayerGRBGray
 * @class
 * @classdesc De kaart basis laag component voor GRB grijstinten.
 *
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
class VlMapBaseLayerGRBGray extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'grb_bsk_grijs');
        this.setAttribute('title', 'GRB basis laag grijs');
    }
}

/**
 * VlMapBaseLayerGRB
 * @class
 * @classdesc De kaart layer component voor GRB.
 * 
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
class VlMapBaseLayerGRB extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'grb_bsk');
        this.setAttribute('title', 'GRB basis laag');
    }
}

/**
 * VlMapBaseLayerGRBOrtho
 * @class
 * @classdesc De kaart basis laag component voor GRB ortho.
 * 
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map.html|Demo}
 */
class VlMapBaseLayerGRBOrtho extends VlMapBaseLayer {
    constructor() {
        super();
        this.setAttribute('url', 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts');
        this.setAttribute('layer', 'omwrgbmrvl');
        this.setAttribute('title', 'GRB ortho laag');
    }
}

/**
 * VlMapAction
 * @class
 * @classdesc De abstracte kaart actie component.
 * 
 * @property {boolean} active - Attribuut bepaalt of de kaart geactiveerd is.
 * 
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 */
class VlMapAction extends VlElement(HTMLElement) {
    connectedCallback() {
        this.__registerMapActionChangedCallback();
    }

    static isVlMapAction() {
        return true;
    }

    /**
     * Geeft de event naam die gebruikt wordt wanneer een nieuwe actie toegevoegd wordt aan de kaart
     * 
     * @returns {string}
     */
    static get NEW_ACTION_EVENT_NAME() {
        return 'new-action-activated';
    }

    /**
     * Geeft de kaartlaag.
     * 
     * @returns {ol.layer.Layer}
     */
    get layer() {
        return this._layer;
    }

    /**
     * Zet de kaartlaag.
     * 
     * @param {ol.layer.Layer}
     */
    set layer(layer) {
        this._layer = layer;
        this._layerChangedCallback();
    }

    /**
     * Geeft de kaart actie.
     * 
     * @returns {ol.interaction}
     */
    get action() {
        return this._action;
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    /**
     * Activeer de kaart actie op de kaart.
     */
    activateAction() {
        if (this._action) {
            this._map.activateAction(this._action);
            this.actionChanged();
        }
    }

    /**
     * Stuurt een event om te laten weten dat de actieve kaart actie gewijzigd werd
     */
    actionChanged() {
        const event = new Event(VlMapAction.NEW_ACTION_EVENT_NAME);
        this.parentElement.dispatchEvent(event);
    }

    _layerChangedCallback() {
        this._computeAction(this._map, this.layer);
    }

    _createAction() {
        console.log('implementatie van de _createAction ontbreekt');
    }

    _computeAction(map, kaartlaag) {
        let action;
        if (map && kaartlaag) {
            action = this._createAction(kaartlaag);
            this.parentElement.addAction(action);
            this.actionChanged();
        }
        this._action = action;
    }

    __registerMapActionChangedCallback() {
        this.parentElement.addEventListener(VlMapAction.NEW_ACTION_EVENT_NAME, () => {
            this.setAttribute('active', (this._map && this._map.currentAction == this._action));
        });
    }
}

/**
 * VlMapSelectAction
 * @class
 * @classdesc De kaart selecteer actie component.
 * 
 * @property {boolean} cluster - Attribuut geeft aan of de features geclusterd zijn of niet.
 * 
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-select-action.html|Demo}
 */
class VlMapSelectAction extends VlMapAction {
    constructor() {
        super();
        this._onSelect = () => {
            console.info('er is geen onSelect functie gedefinieerd!');
        };
    }

    get style() {
        return this._style;
    }
    
    set style(style) {
        this._style = style;
    }

    get _cluster() {
        return this.getAttribute('cluster');
    }

    mark(id) {
        if (this._action && id) {
            this._action.markFeatureWithId(id, this.layer);
        }
    }
    
    removeMarks() {
        if (this._action) {
            this._action.demarkAllFeatures();
        }
    }
    
    select(feature) {
        if (this._action && feature) {
            this._action.selectFeature(feature);
        }
    }

    onSelect(callback) {
        this._onSelect = callback;
    }

    reset() {
        if (this._action) {
            this._action.clearFeatures();
        }
    }
    
    _createAction(layer) {
        return new acd.ol.action.SelectAction(layer, (args) => {this._onSelect(args);}, {
            style: this._style,
            cluster: (this._cluster != undefined)
        });
    }
}

/**
 * VlMapLayerStyle
 * @class
 * @classdesc De abstracte kaart laag style klasse.
 *
 * @extends VlElement
 *
 * @property {string} color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de kaartlaagstijl.
 * @property {string} text-color - Attribuut wordt gebruikt om aan te geven wat de kleur is van de tekst.
 * @property {number} text-offset-x - Attribuut wordt gebruikt om aan te geven wat de offset op de x-as is van de tekst.
 * @property {number} text-offset-y - Attribuut wordt gebruikt om aan te geven wat de offset op de y-as is van de tekst.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 */
class VlMapLayerStyle extends VlElement(HTMLElement) {
    connectedCallback() {
        this._setStyleOnParent();
    }

    /**
     * Geeft de color van de stijl terug.
     *
     * @Return {string}
     */
    get color() {
        return this.getAttribute('color') || 'rgba(255, 255, 255, 1)';
    }

    /**
     * Geeft de tekstkleur van de stijl terug.
     *
     * @Return {string}
     */
    get textColor() {
        return this.getAttribute('text-color') || '#FFF';
    }

    /**
     * Geeft de offset op de x-as van de tekst terug.
     *
     * @Return {number}
     */
    get textOffsetX() {
        return this.getAttribute('text-offset-x') || 0;
    }

    /**
     * Geeft de offset op de y-as van de tekst terug.
     *
     * @Return {number}
     */
    get textOffsetY() {
        return this.getAttribute('text-offset-y') || 0;
    }

    /**
     * Geeft de stijl terug.
     *
     * @Return {string}
     */
    get style() {
        console.info("opgelet vl-map-layer-style is abstract en zal geen stijl toevoegen aan de kaartlaag");
        return null;
    }

    _hasUniqueStyles(features) {
        const styles = this._getStyles(features);
        return styles && this._containsObject(styles) && this._areIdentical(styles);
    }

    _containsStyle(features) {
        return this._containsObject(features.map((feature) => feature.getStyle()));
    }

    _getStyles(features) {
        return features.map((feature) => {
            return feature.getStyle();
        });
    }

    _containsObject(objects) {
        return objects.some((object) => { return !!object; });
    }

    _areIdentical(objects) {
        return objects.every((object, i, objects) => { return object == objects[0]; });
    }

    _setStyleOnParent() {
        if (this.parentElement) {
            return this.parentElement.style = this.style;
        }
    }
}

/**
 * VlMapLayerCircleStyle
 * @class
 * @classdesc De kaart laag style klasse voor cirkels.
 *
 * @extends VlMapLayerStyle
 *
 * @property {number} size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de cirkels.
 * @property {string} border-color - Attribuut wordt gebruikt om aan te geven wat de color is van de randen van de cirkels.
 * @property {number} border-size - Attribuut wordt gebruikt om aan te geven wat de grootte is van de randen van de cirkels.
 * @property {string} cluster-text-color - Attribuut wordt gebruikt om aan te geven wat de kleur van de tekst is bij het clusteren van features.
 * @property {string} cluster-color - Attribuut wordt gebruikt om aan te geven wat de kleur is bij het clusteren van features.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-circle-style.html|Demo}
 */
class VlMapLayerCircleStyle extends VlMapLayerStyle {
    /**
     * Geeft de grootte van de cirkels terug.
     *
     * @Return {number}
     */
    get size() {
        return this.getAttribute('size') || 5;
    }

    /**
     * Geeft de randkleur van de cirkels terug.
     *
     * @Return {string}
     */
    get borderColor() {
        return this.getAttribute('border-color') || 'rgba(0, 0, 0, 1)';
    }

    /**
     * Geeft de size van de rand van de cirkels terug.
     *
     * @Return {number}
     */
    get borderSize() {
        return this.getAttribute('border-size') || 1;
    }

    /**
     * Geeft de kleur van de tekst bij het clusteren van features terug.
     *
     * @Return {string}
     */
    get clusterTextColor() {
        return this.getAttribute('cluster-text-color') || '#FFF';
    }

    /**
     * Geeft de kleur bij het clusteren van features terug.
     *
     * @Return {string}
     */
    get clusterColor() {
        return this.getAttribute('cluster-color') || 'rgba(0, 0, 0, 0)';
    }

    /**
     * Geeft de stijl terug.
     *
     * @Return {string}
     */
    get style() {
        return (feature, resolution) => {
            const features = feature && feature.get ? (feature.get('features') || []) : [];
            const size = features.length || 1;
            const clusterMultiplier = size == 1 ? 1 : Math.max(1.5, size.toString().length);
            const text = size > 1 ? size.toString() : '';
            let textColor = this.textColor;
            let kleur = this.color;
            let randKleur = this.borderColor;
            let randGrootte = this.borderSize;
            let radius =  size > 1 ? this.size * clusterMultiplier : this.size;

            if (this.parentElement && this.parentElement.cluster) {
                if (this._hasUniqueStyles(features)) {
                    let style = features[0].getStyle();
                    if (style instanceof Function) {
                        style = style();
                    }
                    const styleImage = style.getImage();
                    kleur = styleImage.getFill().getColor();
                    randKleur = styleImage.getStroke().getColor();
                    randGrootte = styleImage.getStroke().getWidth();
                    radius = size > 1 ? styleImage.getRadius() * clusterMultiplier : styleImage.getRadius();
                } else if (this._containsStyle(features)) {
                    kleur = this.clusterColor;
                    textColor = this.clusterTextColor;
                }
            }

            return new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: kleur
                    }),
                    stroke: new ol.style.Stroke({
                        color: randKleur,
                        width: randGrootte
                    }),
                    radius: radius
                }),
                text: new ol.style.Text({
                    text: text,
                    font: '12px Flanders Art',
                    fill: new ol.style.Fill({
                        color: textColor
                    }),
                    offsetX: this.textOffsetX,
                    offsetY: this.textOffsetY
                })
            });
        };
    }
}

/**
 * VlMapSearch
 * @class
 * @classdesc De kaart zoek op adres component.
 * 
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-map/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-map-search.html|Demo}
 */
class VlMapSearch extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
                @import '/node_modules/vl-ui-select/style.css';
            </style>
            <select is="vl-select" data-vl-select data-vl-select-search-empty-text="Geen adres gevonden"></select>
        `);
        this._configure();
    }

    connectedCallback() {
        this._addSearchEventListener();
        this._addChoiceEventListener();
    }

    get url() {
        return 'https://loc.geopunt.be/v4';
    }

    get searchUrl() {
        return this.url + '/Suggestion?q=';
    }

    get locationUrl() {
        return this.url + '/Location?q=';
    }

    get _selectElement() {
        return this._shadow.querySelector('select');
    }

    get _parentElement() {
        if (this.parentNode) {
            return this.parentNode.host;
        }
    }

    _addSearchEventListener() {
        if (!this.__searchEventListenerRegistered) {
            this.__searchEventListenerRegistered = true;
            this._selectElement.addEventListener('search', (event) => {
                if (event && event.detail && event.detail.value) {
                    fetch(this.searchUrl + event.detail.value)
                        .then((response) => {
                            return response.json();
                        }).then((data) => {
                            if (data && data.SuggestionResult) {
                                const resultaten = data.SuggestionResult.map((resultaat) => {
                                    return {
                                        value: resultaat,
                                        label: resultaat
                                    }
                                });
                                this._selectElement.choices = resultaten;
                            }
                        });
                }
            });
        }
    }

    _addChoiceEventListener() {
        if (!this.__choiceEventListenerRegistered) {
            this.__choiceEventListenerRegistered = true;
            this.__choiceEventListener = this._selectElement.addEventListener('choice', (event) => {
                if (event && event.detail && event.detail.choice) {
                    fetch(this.locationUrl + event.detail.choice.value)
                        .then((response) => {
                            return response.json();
                        }).then((data) => {
                            if (data && data.LocationResult) {
                                this._parentElement.zoomTo([data.LocationResult[0].BoundingBox.LowerLeft.X_Lambert72, data.LocationResult[0].BoundingBox.LowerLeft.Y_Lambert72, data.LocationResult[0].BoundingBox.UpperRight.X_Lambert72, data.LocationResult[0].BoundingBox.UpperRight.Y_Lambert72]);
                            }
                        });
                }
            });
        }
    }

    _configure() {
        customElements.whenDefined('vl-map').then(() => {
            if (this.parentNode && this.parentNode.map) {
                this.parentNode._shadow.prepend(this);
                this.parentNode.host.style.setProperty('--vl-map--margin-top', "35px");
            }
        });
    }
}

Promise.all([
    awaitScript('vl-map-openlayers', '/node_modules/vl-mapactions/lib/openlayers/dist/ol.js'),
    awaitScript('vl-map-proj4', '/node_modules/proj4/dist/proj4.js'),
    awaitScript('vl-map-mapactions', '/node_modules/vl-mapactions/dist/mapactions-min.js')]
).then(() => {
    define('vl-map', VlMap);
    define('vl-map-overview-map', VlMapOverviewMap);
    define('vl-map-layer', VlMapLayer);
    define('vl-map-baselayer', VlMapBaseLayer);
    define('vl-map-baselayer-grb-gray', VlMapBaseLayerGRBGray);
    define('vl-map-baselayer-grb', VlMapBaseLayerGRB);
    define('vl-map-baselayer-grb-ortho', VlMapBaseLayerGRBOrtho);
    define('vl-map-action', VlMapAction);
    define('vl-map-select-action', VlMapSelectAction);
    define('vl-map-layer-style', VlMapLayerStyle);
    define('vl-map-layer-circle-style', VlMapLayerCircleStyle);
    define('vl-map-search', VlMapSearch);
});

export { VlMap, VlMapAction, VlMapBaseLayer, VlMapBaseLayerGRB, VlMapBaseLayerGRBGray, VlMapBaseLayerGRBOrtho, VlMapLayer, VlMapLayerCircleStyle, VlMapLayerStyle, VlMapOverviewMap, VlMapSearch, VlMapSelectAction };
