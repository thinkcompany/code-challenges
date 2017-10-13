import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import './vendor';
import 'whatwg-fetch';

const STL: number = 50;

Error.stackTraceLimit = process.env.ENV === 'production' ? STL : Infinity;
