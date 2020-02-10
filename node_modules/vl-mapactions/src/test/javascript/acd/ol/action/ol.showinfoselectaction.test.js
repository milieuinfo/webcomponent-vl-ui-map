describe('show info select action', function() {
	var map, showInfoSelectAction, feature, source, doneFunctionCalled, visibility, mapWasRerendered;
	function waitFor(done, callback) {
	    if (done() && callback) {
	        callback();
	    } else {
	        window.setTimeout(function () {
	            waitFor(done, callback);
	        }, 50);
	    }
	}
	
	beforeEach(function() {
        mapWasRerendered = false;
        source = new ol.source.Vector();
		var infoPromise = function() {
			return {
				then: function(callback) {
					callback('content of info object');
				}
			}
		};
		map = {
			overlays: [],
			addOverlay: function(overlay) {
				this.overlays.push(overlay);
			},
			removeOverlay: function(overlay) {
				this.overlays.splice(this.overlays.indexOf(overlay), 1);
			},
            render: function() {
                mapWasRerendered = true;
			},
			on: jasmine.createSpy(),
			un: jasmine.createSpy()
		};
		feature = new ol.Feature();
		feature.setGeometry(new ol.geom.Point([0, 0]));
		doneFunctionCalled = false;
		showInfoSelectAction = new acd.ol.action.ShowInfoSelectAction({getSource: function() {return source;}, setVisible: function(visible) {visibility = visible;}, getVisible: function() {return visibility;}}, infoPromise, 'loading message', function(){
			doneFunctionCalled = true
		});
		showInfoSelectAction.map = map;
	});

	it('bij het activeren wordt de laag op visible gezet', function() {
		visibility = false;
		showInfoSelectAction.activate();
		expect(visibility).toBe(true);
	});
	
	it('bij het deactiveren wordt de laag zichtbaarheid weer op de oorspronkelijke waarde gezet', function() {
		visibility = false;
		showInfoSelectAction.activate();
		showInfoSelectAction.deactivate();
		expect(visibility).toBe(false);
		
		visibility = true;
		showInfoSelectAction.activate();
		showInfoSelectAction.deactivate();
		expect(visibility).toBe(true);
	});

	it('zet een overlay op de map wanneer punt getekend werd, met daarin inhoud van de promise', function(done) {
		showInfoSelectAction.selectInteraction.getFeatures().push(feature);
		var event = {type: 'select', mapBrowserEvent: {coordinate: [0, 0]}};
		showInfoSelectAction.selectInteraction.dispatchEvent(event);

		function contentShown() {
			return map.overlays.length === 1	&& map.overlays[0].getElement().innerHTML ===
					'<span class="content">content of info object</span><div class="arrow"></div>';
		}
		
		waitFor(contentShown, function() {
			expect(map.overlays[0].getPosition()).toEqual([0, 0]);
			expect(doneFunctionCalled).toBe(true);
			done();
		});
	});

	it('er wordt een loading message getoond als de promise er lang over doet om zijn resultaat te resolven', function(done) {
		var infoPromise = function() {
			return {
				then: function(callback) {
					setTimeout(function(){
						callback('content of info object');
					}, 600);
				}
			}
		};
		showInfoSelectAction = new acd.ol.action.ShowInfoSelectAction({getSource: function() {return  new ol.source.Vector();}, setVisible: function() {}, getVisible: function() {}}, infoPromise, 'loading message', function(){});
		showInfoSelectAction.map = map; 

		showInfoSelectAction.selectInteraction.getFeatures().push(feature);
		var event = {type: 'select', mapBrowserEvent: {coordinate: [0, 0]}};
		showInfoSelectAction.selectInteraction.dispatchEvent(event);

		function loadingShown() {
			return map.overlays.length === 1	&& map.overlays[0].getElement().innerHTML ===
				'<span class="content"><span class="icon"></span> loading message</span><div class="arrow"></div>';
		}
		
		function contentShown() {
			return map.overlays.length === 1	&& map.overlays[0].getElement().innerHTML ===
					'<span class="content">content of info object</span><div class="arrow"></div>';
		}
		
		waitFor(loadingShown, function() {
			waitFor(contentShown, function(){
                expect(mapWasRerendered).toBe(true);
                done();
			})
		});
	});

	it('overlays worden verwijderd als de interactie gedeactiveerd wordt', function(done) {
		showInfoSelectAction.selectInteraction.getFeatures().push(feature);
		var event = {type: 'select', mapBrowserEvent: {coordinate: [0, 0]}};
		showInfoSelectAction.selectInteraction.dispatchEvent(event);

		function contentShown() {
			return map.overlays.length === 1;
		}
		
		waitFor(contentShown, function() {
			showInfoSelectAction.deactivate();
			expect(map.overlays.length).toBe(0);
			expect(source.getFeatures().length).toBe(0);
			done();
		});
	});

    it('een default offset van [0, -10] wordt gebruikt wanneer er geen offset wordt meegegeven', function(done) {
        var infoPromise = function() {
            return {
                then: function(callback) {
                    setTimeout(function(){
                        callback('content of info object');
                    }, 600);
                }
            }
        };
        showInfoSelectAction = new acd.ol.action.ShowInfoSelectAction({getSource: function() {return  new ol.source.Vector();}, setVisible: function() {}, getVisible: function() {}}, infoPromise, 'loading message', function(){});
        showInfoSelectAction.map = map;

        showInfoSelectAction.selectInteraction.getFeatures().push(feature);
        var event = {type: 'select', mapBrowserEvent: {coordinate: [0, 0]}};
        showInfoSelectAction.selectInteraction.dispatchEvent(event);


        function contentShown() {
            return map.overlays.length === 1	&& map.overlays[0].getElement().innerHTML ===
                '<span class="content">content of info object</span><div class="arrow"></div>'
                && map.overlays[0].getOffset().length === 2 && map.overlays[0].getOffset()[0] === 0 && map.overlays[0].getOffset()[1] === -10;
        }

		waitFor(contentShown, function(){
			done();
		});
    });

    it('een meegegeven offset wordt gebruikt', function(done) {
        var infoPromise = function() {
            return {
                then: function(callback) {
                    setTimeout(function(){
                        callback('content of info object');
                    }, 600);
                }
            }
        };
        showInfoSelectAction = new acd.ol.action.ShowInfoSelectAction({getSource: function() {return  new ol.source.Vector();}, setVisible: function() {}, getVisible: function() {}}, infoPromise, 'loading message', function(){}, { offset: [0, 0] });
        showInfoSelectAction.map = map;

        showInfoSelectAction.selectInteraction.getFeatures().push(feature);
        var event = {type: 'select', mapBrowserEvent: {coordinate: [0, 0]}};
        showInfoSelectAction.selectInteraction.dispatchEvent(event);


        function contentShown() {
            return map.overlays.length === 1	&& map.overlays[0].getElement().innerHTML ===
                '<span class="content">content of info object</span><div class="arrow"></div>'
                && map.overlays[0].getOffset().length === 2 && map.overlays[0].getOffset()[0] === 0 && map.overlays[0].getOffset()[1] === 0;
        }

        waitFor(contentShown, function(){
            done();
        });
    });
});