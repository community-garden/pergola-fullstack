var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
    savePath: 'test-results',
    consolidateAll: false
});
jasmine.getEnv().addReporter(junitReporter)
