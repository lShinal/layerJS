describe('ParseMananger', function() {
  var WL, defaults;
  var utilities = require('./helpers/utilities.js');

  beforeEach(function() {
    WL = require('../../src/framework/wl.js');
    defaults = require('../../src/framework/defaults.js');
  });


  it('will fill add stageData to the repository from DOM elements', function() {
    utilities.setHtml("<div data-wl-id='1' data-wl-type='stage'></div><div data-wl-id='2' data-wl-type='stage'>");

    var repository = WL.repository;
    var parseManager = WL.parseManager;

    parseManager.parseDocument();

    var stage = repository.get(1, defaults.version);
    expect(stage).toBeDefined();
    expect(stage.attributes.id).toBe('1');
    expect(stage.attributes.type).toBe('stage');
    expect(stage.attributes.children.length).toBe(0);

    stage = repository.get(2, defaults.version);
    expect(stage).toBeDefined();
    expect(stage.attributes.id).toBe('2');
    expect(stage.attributes.type).toBe('stage');
    expect(stage.attributes.children.length).toBe(0);
  });
});
