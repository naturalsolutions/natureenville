'use strict';

var Backbone = require('backbone'),
    _ = require('lodash'),
    moment = require('moment'),
    MagicTourRequest = require('./magictourrequest');

Backbone.LocalStorage = require("backbone.localstorage");

var MagicTour = Backbone.Model.extend({
    /* Expected attributes :
        {
            nb_stops: "2",      // Useless, length of the array beloaw
            stops: [],          // List of POIs on this tour
            t_length: "0",      // Tour length in meters
            time: "0",          // Tour length in minutes
            trip: []            // Tour path as a list of WKT linestring geometries
        }
    */

    url: 'http://dev.optitour.fr/magic/naturalsolution/magictour/',

    initialize: function() {
        this.request = new MagicTourRequest();
        this.listenTo(this.request, 'reload', this.reload);
    },

    reload: function() {
        this.fetch();
    },

    fetch: function(options) {
        // Always load request for the current day/time
        this.request.set({
            option_date: moment().format("DD/MM/YYYY"),
            option_heure: moment().diff(moment().startOf('day'), 'minutes')
        });
        // Automatically include request params
        options = _.extend({data: this.request.attributes, type: 'POST'}, options);
        // Relay to original Backbone fetch method
        return Backbone.Model.prototype.fetch.call(this, options);
    },

    parse: function(response, options){
        if(response.success){
            if(response.tours){
                return response.tours[0];
            }
        }else{
            //TODO manage Optimisation Request Error
            console.log(response.Error);
            return defaultTour;
        }
    }
});

module.exports = new MagicTour();


var defaultTour = {
    nb_stops: "6",
    trip:[
            {
            geom: "LINESTRING (5.3700760000000001 43.2973300000000023, 5.3703712000000001 43.2971652000000020, 5.3703700000000003 43.2971700000000013, 5.3703599999999998 43.2971599999999981, 5.3703700000000003 43.2970600000000019, 5.3703799999999999 43.2969900000000010, 5.3704400000000003 43.2966499999999996, 5.3704400000000003 43.2966100000000012, 5.3704400000000003 43.2965700000000027, 5.3704299999999998 43.2965299999999971, 5.3704311999999996 43.2965323999999967, 5.3704311999999996 43.2965323999999967, 5.3704299999999998 43.2965299999999971, 5.3704099999999997 43.2964899999999986, 5.3704099999999997 43.2964600000000033, 5.3704099999999997 43.2964100000000016, 5.3704400000000003 43.2962500000000006, 5.3704599999999996 43.2961499999999972, 5.3704618999999996 43.2961519999999993, 5.3704618999999996 43.2961519999999993, 5.3704599999999996 43.2961499999999972, 5.3718000000000004 43.2962800000000030, 5.3725800000000001 43.2963600000000000, 5.3726799999999999 43.2963600000000000, 5.3727799999999997 43.2963600000000000, 5.3728600000000002 43.2963499999999968, 5.3729600000000000 43.2963400000000007, 5.3730000000000002 43.2963299999999975, 5.3730399999999996 43.2963200000000015, 5.3731799999999996 43.2962899999999991, 5.3733300000000002 43.2962500000000006, 5.3734299999999999 43.2962199999999982, 5.3734900000000003 43.2962100000000021, 5.3735600000000003 43.2961999999999989, 5.3735999999999997 43.2961900000000028, 5.3737100000000000 43.2961600000000004, 5.3738099999999998 43.2961299999999980, 5.3739200000000000 43.2961000000000027, 5.3740100000000002 43.2960700000000003, 5.3740057999999999 43.2960690999999969, 5.3740057999999999 43.2960690999999969, 5.3740100000000002 43.2960700000000003, 5.3740399999999999 43.2960500000000010, 5.3740899999999998 43.2960199999999986, 5.3741399999999997 43.2959999999999994, 5.3741599999999998 43.2959900000000033, 5.3741899999999996 43.2959600000000009, 5.3742099999999997 43.2959400000000016, 5.3742299999999998 43.2959200000000024, 5.3742400000000004 43.2959099999999992, 5.3742500000000000 43.2958900000000000, 5.3742599999999996 43.2958700000000007, 5.3742700000000001 43.2958599999999976, 5.3742999999999999 43.2957899999999967, 5.3743200000000000 43.2957200000000029, 5.3744100000000001 43.2952799999999982, 5.3744399999999999 43.2951600000000028, 5.3745099999999999 43.2948599999999999, 5.3745300000000000 43.2947599999999966, 5.3745399999999997 43.2946900000000028, 5.3745399999999997 43.2946499999999972, 5.3745500000000002 43.2946099999999987, 5.3745500000000002 43.2945800000000034, 5.3745500000000002 43.2945700000000002, 5.3745399999999997 43.2945199999999986, 5.3745300000000000 43.2944699999999969, 5.3745200000000004 43.2944200000000023, 5.3745000000000003 43.2943799999999968, 5.3744899999999998 43.2943500000000014, 5.3744800000000001 43.2943300000000022, 5.3744500000000004 43.2942899999999966, 5.3743999999999996 43.2942400000000021, 5.3743499999999997 43.2941900000000004, 5.3742799999999997 43.2941700000000012, 5.3742099999999997 43.2941500000000019, 5.3742063000000000 43.2941477000000035, 5.3742063000000000 43.2941477000000035, 5.3742099999999997 43.2941500000000019, 5.3739999999999997 43.2940800000000010, 5.3737700000000004 43.2940100000000001, 5.3737300000000001 43.2939999999999969, 5.3735900000000001 43.2939700000000016, 5.3732699999999998 43.2938899999999975, 5.3727499999999999 43.2937599999999989, 5.3722200000000004 43.2936300000000003, 5.3715900000000003 43.2934699999999992, 5.3714899999999997 43.2934399999999968, 5.3713800000000003 43.2934199999999976, 5.3711200000000003 43.2933599999999998, 5.3703200000000004 43.2931499999999971, 5.3697100000000004 43.2930399999999977, 5.3686800000000003 43.2928599999999975, 5.3682999999999996 43.2927800000000005, 5.3671300000000004 43.2925600000000017, 5.3669399999999996 43.2924799999999976, 5.3668500000000003 43.2924700000000016, 5.3660800000000002 43.2923600000000022, 5.3660788000000004 43.2923565999999980, 5.3660788000000004 43.2923565999999980, 5.3660800000000002 43.2923600000000022, 5.3661799999999999 43.2920200000000008, 5.3661778000000000 43.2920231000000015, 5.3658809999999999 43.2919763808999960)"
        },
        {
            geom: "LINESTRING (5.3658809999999999 43.2919763808999960, 5.3661778000000000 43.2920231000000015, 5.3661799999999999 43.2920200000000008, 5.3660800000000002 43.2923600000000022, 5.3660788000000004 43.2923565999999980, 5.3660788000000004 43.2923565999999980, 5.3660800000000002 43.2923600000000022, 5.3659200000000000 43.2923299999999998, 5.3655900000000001 43.2922900000000013, 5.3653100000000000 43.2922599999999989, 5.3652499999999996 43.2922500000000028, 5.3651999999999997 43.2922599999999989, 5.3650799999999998 43.2922700000000020, 5.3649800000000001 43.2922500000000028, 5.3649100000000001 43.2922399999999996, 5.3647000000000000 43.2922300000000035, 5.3645300000000002 43.2922200000000004, 5.3643599999999996 43.2922200000000004, 5.3640499999999998 43.2922200000000004, 5.3640466000000000 43.2922154000000035, 5.3640466000000000 43.2922154000000035, 5.3640499999999998 43.2922200000000004, 5.3639999999999999 43.2922200000000004, 5.3639200000000002 43.2922200000000004, 5.3638800000000000 43.2922200000000004, 5.3638199999999996 43.2922200000000004, 5.3637300000000003 43.2922200000000004, 5.3636799999999996 43.2922200000000004, 5.3632900000000001 43.2922200000000004, 5.3632200000000001 43.2922200000000004, 5.3631099999999998 43.2922300000000035, 5.3624900000000002 43.2922500000000028, 5.3621400000000001 43.2922399999999996, 5.3613799999999996 43.2922599999999989, 5.3613838999999999 43.2922645000000017, 5.3613920000000004 43.2924282625999979)"
        }
    ],
    t_length: "4265",
    stops: [
        {
            arrival: "0",
            date: "31/07/2015",
            departure: "540",
            desc: "",
            geom: "POINT (5.3700760000000001 43.2973300000000023)",
            image: "",
            length_to_next_point: "685",
            place_name: "",
            place_type: "0",
            time_to_next_point: "8",
            visit_time: "0"
        },
        {
            arrival: "548",
            date: "31/07/2015",
            departure: "568",
            desc: "",
            geom: "POINT (5.3658809999999999 43.2919763808999960)",
            image: "",
            length_to_next_point: "420",
            place_name: "Jardin du Carénage",
            place_type: "1",
            poi_id: "30",
            time_to_next_point: "6",
            visit_time: "20"
        },
        {
            arrival: "574",
            date: "31/07/2015",
            departure: "594",
            desc: "",
            geom: "POINT (5.3613920000000004 43.2924282625999979)",
            image: "",
            length_to_next_point: "1210",
            place_name: "Square Manouchian",
            place_type: "1",
            poi_id: "28",
            time_to_next_point: "14",
            visit_time: "20"
        },
        {
            arrival: "608",
            date: "31/07/2015",
            departure: "613",
            desc: "citizen science project : Sauvages de ma rue - photo : Catherine LEGRAND, licence CC-BY-SA",
            geom: "POINT (5.3697800000000004 43.2964800000000025)",
            image: "http://api.tela-botanica.org/img:000247372L.jpg",
            length_to_next_point: "964",
            place_name: "Amaranthus deflexus L.",
            place_type: "12",
            poi_id: "343",
            time_to_next_point: "11",
            visit_time: "5"
        },
        {
            arrival: "624",
            date: "31/07/2015",
            departure: "644",
            desc: "",
            geom: "POINT (5.3666130000000001 43.2897688493999908)",
            image: "",
            length_to_next_point: "986",
            place_name: "Jardin de la Corderie",
            place_type: "1",
            poi_id: "55",
            time_to_next_point: "11",
            visit_time: "20"
        },
        {
            arrival: "655",
            date: "31/07/2015",
            departure: "0",
            desc: "",
            geom: "POINT (5.3700760000000001 43.2973300000000023)",
            image: "",
            length_to_next_point: "0",
            place_name: "",
            place_type: "0",
            time_to_next_point: "0",
            visit_time: "0"
        }
    ],
    time: "115"
};