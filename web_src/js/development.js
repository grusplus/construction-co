#!/usr/bin/env node
/*
 * development.js
 *
 * Add on the JS for development, like the testing module and such.
 * It comes after the web module.
 *
 */
@import './vendors.js';
@import './app/startup-pre.js';
@import './web.js';
// @import './test/test.js';
// @import './test/fixtures.js';
@import './app/startup-post.js';