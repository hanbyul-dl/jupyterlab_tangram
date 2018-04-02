import {
  Widget
} from '@phosphor/widgets';

import * as L from 'leaflet';
import Tangram from 'tangram/dist/tangram.debug';

import '../style/index.css';
import 'leaflet/dist/leaflet.css';

var yaml = require('js-yaml');

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'text/x-yaml';


/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'jp-OutputWidgetYAML';


/**
 * A widget for rendering YAML.
 */
export
class OutputWidget extends Widget {
  /**
   * Construct a new output widget.
   */
  constructor(options) {
    super();
    this.addClass(CLASS_NAME);
    this._map = L.map(this.node, {
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
    map.setView([37.5749, 126.9761], 14);
    return new Promise ((resolve, reject) => {
      var object = yaml.safeLoad(data);
      var tangramLayer = Tangram.leafletLayer({
        scene: object
      });
      tangramLayer.addTo(map);
      tangramLayer.on('init', function () {
        resolve();
      });
    })
  }

  onResize() {
    this.update();
  }
}


/**
 * A mime renderer factory for YAML data.
 */
export
const rendererFactory = {
  safe: false,
  mimeTypes: [MIME_TYPE],
  // TO DO: what is right number?
  defaultRank: 5,
  createRenderer: options => new OutputWidget(options)
};



const extension = {
  id: 'jupyterlab_tangram',
  name: 'Jupyterlab Tangram',
  rendererFactory,
  rank: 0,
  dataType: 'string',
  documentWidgetFactoryOptions: {
    name: 'Tangram Renderer',
    primaryFileType: 'yaml',
    fileTypes: ['yaml'],
    defaultFor: ['yaml']
  },
  fileTypes: [{
    name: 'yaml',
    mimeTypes: [MIME_TYPE],
    extensions: ['.yaml', '.yml']
  }]

};

export default extension;
