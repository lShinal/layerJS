var StageView = require('../../src/framework/stageview.js');
var LayerView = require('../../src/framework/layerview.js');
var FrameView = require('../../src/framework/frameview.js');
var state = require('../../src/framework/state.js');
var utilities = require("./helpers/utilities.js");

var ViewsCommonIdentifyTests = require('./helpers/views/common/identifytests.js');
var ViewsCommonViewTests = require('./helpers/views/common/viewtests.js')

describe("FrameView", function() {


  ViewsCommonViewTests('simple_frame_1.js', function() {
    return {
      ViewType: FrameView,
      htmlElement: require('./htmlelements/simple_frame_1.js')
    }
  });

  ViewsCommonIdentifyTests('div data-lj-type="frame"', FrameView, function() {
    var element = document.createElement('div');
    element.setAttribute('data-lj-type', 'frame');

    return element;
  }, true);

  ViewsCommonIdentifyTests('div', FrameView, function() {
    return document.createElement('div');
  }, false);

  describe('event', function() {

    describe('sizeChanged', function() {
      it('will remove cached transformData and will trigger a renderRequired event', function(done) {
        var element = utilities.appendChildHTML(require('./htmlelements/simple_stage_1.js'));

        var stageView = new StageView({
          el: element
        });
        var layerView = stageView.getChildViews()[0];
        var frameView = layerView.getChildViews()[0];

        spyOn(layerView, 'render').and.callThrough();
        spyOn(layerView, 'showFrame');

        frameView.on('renderRequired', function() {
          setTimeout(function() {
            expect(layerView.render).toHaveBeenCalled();
            expect(frameView.transformData.isDirty).toBe(true);
            done();
          }, 1);
        });

        frameView.trigger('sizeChanged');
        expect(frameView.transformData.isDirty).toBe(true);
      });

    });

    describe('attributesChanged', function() {
      function renderRequiredTriggered(action, done) {
        var element = utilities.appendChildHTML(require('./htmlelements/simple_stage_1.js'));

        var stageView = new StageView({
          el: element
        });

        var layerView = stageView.getChildViews()[0];
        var frameView = layerView.getChildViews()[0];

        spyOn(layerView, 'render').and.callThrough();
        spyOn(layerView, 'showFrame');

        frameView.on('renderRequired', function() {
          setTimeout(function() {
            // give layer view the posibility to get invoked
            expect(layerView.render).toHaveBeenCalled();
            expect(frameView.transformData.isDirty).toBe(true);
            done();
          }, 1);
        });

        action(frameView.outerEl);
      }

      it('fit-to will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('data-lj-fit-to', 'width');
        }, done);
      });

      it('elastic-left will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('data-lj-elastic-left', '10');
        }, done);
      });

      it('elastic-right will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('data-lj-elastic-right', '10');
        }, done);
      });

      it('elastic-top will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('data-lj-elastic-top', '10');
        }, done);
      });

      it('elastic-bottom will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('data-lj-elastic-bottom', '10');
        }, done);
      });

      it('width will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('lj-width', '10');
        }, done);
      });

      it('height will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('lj-height', '10');
        }, done);
      });

      it('rotation will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('lj-rotation', '10');
        }, done);
      });

      it('x will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('lj-x', '10');
        }, done);
      });

      it('y will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('lj-y', '10');
        }, done);
      });

      it('scale-x will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('lj-scale-x', '10');
        }, done);
      });

      it('scale-y will remove the cached transformData and will trigger a renderRequired event', function(done) {
        renderRequiredTriggered(function(element) {
          element.setAttribute('lj-scale-y', '10');
        }, done);
      });
    });


    describe('renderRequired', function() {
      it('will call the renderChildPosition and showFrame method of it\'s layer', function(done) {
        var stageView = new StageView({
          el: utilities.appendChildHTML(require('./htmlelements/simple_stage_1.js'))
        });

        var layerView = stageView.getChildViews()[0];

        spyOn(layerView, '_renderChildPosition');
        spyOn(layerView, 'showFrame');

        var frameView = layerView.innerEl.children[0]._ljView;

        frameView.on('renderRequired', function() {
          expect(layerView._renderChildPosition).toHaveBeenCalled();
          expect(layerView.showFrame).toHaveBeenCalled();

          done();
        });

        frameView.trigger('renderRequired', frameView.name());
      });

    });
  });

  describe('dimensions', function() {
    var sourceElement;

    beforeEach(function() {
      sourceElement = utilities.appendChildHTML(require('./htmlelements/simple_frame_1.js'));
    });

    it('will add the margin to the height', function() {
      var view = new FrameView({
        el: sourceElement
      });
      var element = view.outerEl;
      element.style.height = '100px';

      var height = view.height();
      element.style.marginTop = '50px';
      element.style.marginBottom = '20px';

      expect(view.height()).toBe(height + 70);
    });

    it('will add the margin to the width', function() {
      var view = new FrameView({
        el: sourceElement
      });
      var element = view.outerEl;
      element.style.width = '100px';

      var width = view.width();
      element.style.marginLeft = '50px';
      element.style.marginRight = '20px';

      expect(view.width()).toBe(width + 70);
    });

    it('will subtract the margin when setting the height', function() {
      var view = new FrameView({
        el: sourceElement
      });
      var element = view.outerEl;
      element.style.marginTop = '50px';
      element.style.marginBottom = '20px';
      view.setHeight(170);
      expect(element.style.height).toBe('100px');
    });

    it('will subtract the margin when setting the width', function() {
      var view = new FrameView({
        el: sourceElement
      });
      var element = view.outerEl;
      element.style.marginLeft = '50px';
      element.style.marginRight = '20px';
      view.setWidth(170);
      expect(element.style.width).toBe('100px');
    });

  });
})
