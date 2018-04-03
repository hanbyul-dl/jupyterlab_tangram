import '../style/index.css';

import {
  Widget
} from '@phosphor/widgets';

import * as L from 'leaflet';
import * as yaml from 'js-yaml';
import Tangram from 'tangram/dist/tangram.debug';

import 'leaflet/dist/leaflet.css';

import { TangramWidget } from './tangram_widget';

/**
 * The default mime type for the extension.
 */
export const MIME_TYPE = 'text/x-yaml';

/**
 * A mime renderer factory for YAML data.
 */
export
const rendererFactory = {
  safe: false,
  mimeTypes: [MIME_TYPE],
  // TO DO: what is right number?
  defaultRank: 5,
  createRenderer: options => new TangramWidget(options)
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
