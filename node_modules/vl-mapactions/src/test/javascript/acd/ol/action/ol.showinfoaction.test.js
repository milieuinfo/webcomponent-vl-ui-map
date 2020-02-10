describe('show info action', function() {
	var map, showInfoAction, feature, source, mapWasRerendered;

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
			}
		};
		feature = new ol.Feature();
		feature.setGeometry(new ol.geom.Point([0, 0]));
		showInfoAction = new acd.ol.action.ShowInfoAction({getSource: function() {return source;}}, infoPromise, 'loading message');
		showInfoAction.map = map; 
	});

	it('zet een overlay op de map wanneer punt getekend werd, met daarin inhoud van de promise', function(done) {
		showInfoAction.drawInteraction.dispatchEvent({type: 'drawend', feature: feature});

		function contentShown() {
			return map.overlays.length === 1 && map.overlays[0].getElement().innerHTML ===
					'<span class="content">content of info object</span><div class="arrow"></div>';
		}
		
		waitFor(contentShown, function() {
			expect(map.overlays[0].getPosition()).toEqual([0, 0]);
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
		showInfoAction = new acd.ol.action.ShowInfoAction({getSource: function() {return  new ol.source.Vector();}}, infoPromise, 'loading message');
		showInfoAction.map = map;

		showInfoAction.drawInteraction.dispatchEvent({type: 'drawend', feature: feature});

		function loadingShown() {
			return map.overlays.length === 1 && map.overlays[0].getElement().innerHTML ===
				'<span class="content"><span class="icon"></span> loading message</span><div class="arrow"></div>';
		}
		
		function contentShown() {
            return map.overlays.length === 1 && map.overlays[0].getElement().innerHTML ===
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
		showInfoAction.drawInteraction.dispatchEvent({type: 'drawend', feature: feature});
		source.addFeature(feature);
		showInfoAction.drawInteraction.dispatchEvent({type: 'drawend', feature: feature});

		function contentShown() {
			return map.overlays.length === 2 && source.getFeatures().length > 0;
		}
		
		waitFor(contentShown, function() {
			showInfoAction.deactivate();
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

        showInfoAction = new acd.ol.action.ShowInfoAction({getSource: function() {return  new ol.source.Vector();}}, infoPromise, 'loading message');
        showInfoAction.map = map;

        showInfoAction.drawInteraction.dispatchEvent({type: 'drawend', feature: feature});

        function contentShown() {
            return map.overlays.length === 1 && map.overlays[0].getElement().innerHTML ===
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

        showInfoAction = new acd.ol.action.ShowInfoAction({getSource: function() {return  new ol.source.Vector();}}, infoPromise, 'loading message', { offset: [0, 0] });
        showInfoAction.map = map;

        showInfoAction.drawInteraction.dispatchEvent({type: 'drawend', feature: feature});

        function contentShown() {
            return map.overlays.length === 1 && map.overlays[0].getElement().innerHTML ===
                '<span class="content">content of info object</span><div class="arrow"></div>'
                && map.overlays[0].getOffset().length === 2 && map.overlays[0].getOffset()[0] === 0 && map.overlays[0].getOffset()[1] === 0;
        }

        waitFor(contentShown, function(){
            done();
        });
    });
});