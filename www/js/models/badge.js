var Backbone = require('backbone');

Backbone.LocalStorage = require("backbone.localstorage");

Badge = Backbone.Model.extend({
    defaults: function() {
      return {
        name: '',
        activate: 0,
        imageUrl: '',
        type:'',
        description:''
      };
    },

    initialize: function () {

    },


});
BadgeCollection = Backbone.Collection.extend({

    model: Badge,
	url: './data/badges.json',
	localStorage: new Backbone.LocalStorage("BadgeCollection"),

    parse: function(response) {
        return response;
    }

});

var instanceColl = new BadgeCollection();

module.exports = {
    instanceColl: instanceColl,
    Badge: Badge,
    BadgeCollection: BadgeCollection
};