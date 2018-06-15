import 'core-js/es7/reflect';
require('zone.js/dist/zone');

// Angular
import '@angular/core';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/common/http';

import 'rxjs';

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development and test
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}