/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-framework7/spec/node-make-spec-md.js
 */

var Spec = require('tgi-spec/dist/tgi.spec.js');
var testSpec = require('../dist/tgi-interface-framework7.spec');
var TGI = require('../dist/tgi-interface-framework7');
var fs = require('fs');
var _package = require('../package');

if (_package.version != TGI.INTERFACE.FRAMEWORK7().version) {
  console.error('Library version %s does not match package.json %s',TGI.INTERFACE.FRAMEWORK7().version,_package.version);
  process.exit(1);
}

var spec = new Spec();
testSpec(spec, TGI);
spec.runTests(function (msg) {
  if (msg.error) {
    console.error(msg.error);
    process.exit(1);
  } else if (msg.done) {
    console.log(msg.testsCreated + ' tests passed.');
    if (msg.testsPending)
      console.log(msg.testsPending + ' tests pending.');
    if (msg.testsFailed)
      console.log(msg.testsFailed + ' tests failed.');

    if (msg.testsFailed || msg.testsPending) {
      fs.writeFileSync('spec/README.md', spec.githubMarkdown(), 'utf8');
      process.exit(1);
    } else {
      fs.writeFileSync('spec/README.md', spec.githubMarkdown(), 'utf8');
    }

  } else if (msg.log) {
    //console.log(msg.log);
  }
});
