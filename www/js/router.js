'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');

var poi = require('./models/poi');
var magicTour = require('./models/magictour');
var userInstance = require('./models/user').instance;
var controller = require('./controller');


var badgesInstanceColl = require('./models/badge').instanceColl;


var profileView = require('./profile/profile'),
    boucleDetailView = require('./boucleDetail/boucleDetail'),
    boucleCarteView = require('./boucleCarte/boucleCarte'),
    fichePoiView = require('./fichePoi/fichePoi'),
    Router = Backbone.Router.extend({
        routes: {
            '': "homeViewDisplay",
            'profile': "profileViewDisplay",
            'loop/map': "boucleCarteViewDisplay",
            'loop/details': "boucleDetailViewDisplay",
            'fiche/:poiId': "ficheViewDisplay",
            'contribution': 'contributionViewDisplay'
        },

        homeViewDisplay: function() {
            controller.homeViewDisplay();
        },

        contributionViewDisplay: function() {
            controller.contributionViewDisplay();
        },

        profileViewDisplay: function() {
            $('body').alterClass('section-*', 'section-loop section-profile');
            var profileV = new profileView.view({
                    model: userInstance,
                    collection: badgesInstanceColl
                });
            this.displayView(profileV);
        },

        boucleDetailViewDisplay: function() {
            $('body').alterClass('section-*', 'section-loop section-loop-details');
            var boucleDetailV = new boucleDetailView.view({
                model: magicTour
            });
            this.displayView(boucleDetailV);
        },
        boucleCarteViewDisplay: function() {
            $('body').alterClass('section-*', 'section-loop section-loop-map');
            var boucleCarteV = new boucleCarteView.view({
                model: magicTour
            });
            this.displayView(boucleCarteV);
        },
        ficheViewDisplay: function(poiId) {
            $('body').alterClass('section-*', 'section-poi');
            var currentPOI = _.find(magicTour.attributes.stops, function(item) {
                return item.poi_id == poiId;
            });

            var poiM = new poi.Poi();
            poiM.set({
            	'externalId': currentPOI.poi_id,
            	'desc_fr': currentPOI.desc,
            	'url_img1': currentPOI.image,
            	'name_fr': currentPOI.place_name
            });
            var ficheV = new fichePoiView.view({
                model: poiM
            });
            this.displayView(ficheV);
        },

        _currentView: null,

        displayView: function(view) {
            if (this._currentView) {
                this._currentView.remove();
                this._currentView.off();
            }
            this._currentView = view;
            $('#main').empty();
            $('#main').append(view.el);
            view.render();
        },
    });

var router = new Router();

module.exports = router;