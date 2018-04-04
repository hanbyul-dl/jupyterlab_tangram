import {
  Widget
} from '@phosphor/widgets';

import * as L from 'leaflet';
import * as yaml from 'js-yaml';
import Tangram from 'tangram/dist/tangram.debug';

import 'leaflet/dist/leaflet.css';

import { MIME_TYPE } from './lab_extension'
import { parseFunction } from './utils/parse_function'
/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'jp-OutputWidgetYAML';

/**
 * A widget for rendering YAML.
 */
export
class TangramWidget extends Widget {
  /**
   * Construct a new output widget.
   */
  constructor(options) {
    super();
    this.addClass(CLASS_NAME);
    const mapContainer = document.createElement('div');
    mapContainer.id = 'map';
    this.node.appendChild(mapContainer);
    this._map = L.map(mapContainer, {
        // trackResize option set to false as it is not needed to track
        // window.resize events since we have individual phosphor resize
        trackResize: false
    });
  }

  /**
   * Dispose of the widget.
   */
  dispose() {
    // Dispose of leaflet map
    this._map.remove();
    this._map = null;
    super.dispose();
  }

  /**
   * Render YAML into this widget's node.
   */
  renderModel(model) {
    var data = model.data[MIME_TYPE];
    var map = this._map;
    // TO DO: Make the view flexible to the customized data layer
    var sceneObject = yaml.safeLoad(data);
    var tangramLayer = Tangram.leafletLayer({
      scene: sceneObject
    });
    tangramLayer.addTo(map);

    const funcObj = parseFunction(sceneObject.jupyterlab.tangramEvents.init);
    const initFunction = new Function(funcObj.args, funcObj.body);
    initFunction(map, tangramLayer);

    return new Promise ((resolve, reject) => {
      tangramLayer.on('init', function () {
        resolve();
      });
    })
  }

  onResize() {
    this.update();
  }
}
