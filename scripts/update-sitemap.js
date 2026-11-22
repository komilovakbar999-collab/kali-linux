#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var TODAY = '2026-11-22';
var EXCLUDE = /\/(admin|cms|404)\.html(?=[?#"]|$)|\/(admin|cms|404)(?=[?#"]|$)/i;

function main() {
  var file = path.resolve(__dirname, '..', 'sitemap.xml');
  var xml = fs.readFileSync(file, 'utf8');

  // Remove excluded URL entries (admin/cms/404) if present.
  xml = xml.replace(/<url>\s*<loc>([\s\S]*?)<\/loc>[\s\S]*?<\/url>\s*/g, function (block, loc) {
    if (EXCLUDE.test(String(loc))) return '';
    return block;
  });

  // Update all <lastmod> to today.
  var count = 0;
  xml = xml.replace(/<lastmod>[^<]*<\/lastmod>/g, function () {
    count += 1;
    return '<lastmod>' + TODAY + '</lastmod>';
  });

  // Basic XML validation.
  validateXml(xml);

  fs.writeFileSync(file, xml, 'utf8');
  process.stdout.write('sitemap.xml updated: ' + count + ' lastmod entries -> ' + TODAY + '\n');
}

function validateXml(xml) {
  var issues = [];

  if (!/^<\?xml\s+version="1.0"\s+encoding="UTF-8"\?>/.test(xml)) {
    issues.push('Missing or invalid XML declaration');
  }
  if (xml.indexOf('<urlset') === -1 || xml.indexOf('</urlset>') === -1) {
    issues.push('Missing <urlset> root');
  }
  if (EXCLUDE.test(xml)) {
    issues.push('Excluded page found (admin/cms/404)');
  }

  // Simple tag balance check for common tags used in this sitemap.
  var tags = ['urlset', 'url', 'loc', 'lastmod', 'changefreq', 'priority'];
  tags.forEach(function (tag) {
    var open = (xml.match(new RegExp('<' + tag + '(?:\\s|>)', 'g')) || []).length;
    var close = (xml.match(new RegExp('</' + tag + '>', 'g')) || []).length;
    if (open !== close) issues.push('Tag mismatch: <' + tag + '> ' + open + ' vs </' + tag + '> ' + close);
  });

  // Ensure all <url> have <loc> and <lastmod>.
  var urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  urlBlocks.forEach(function (block, i) {
    if (block.indexOf('<loc>') === -1) issues.push('url[' + i + '] missing <loc>');
    if (block.indexOf('<lastmod>') === -1) issues.push('url[' + i + '] missing <lastmod>');
  });

  // Parse check using a minimal well-formedness heuristic: no stray '&' outside entities.
  var badAmp = xml.match(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g);
  if (badAmp) issues.push('Unescaped ampersand(s) found: ' + badAmp.length);

  if (issues.length) {
    process.stderr.write('XML validation failed:\n- ' + issues.join('\n- ') + '\n');
    process.exit(1);
  }
}

main();
