/**
* CoachStations prototype object
*/
Transport.prototype.CoachStations = CoachStations;

/**
 * CoachStations Service
 * Creates an instance of CoachStations service to search
 * for available stations in a given area and display them.
 *
 * @constructor
 * @this {CoachStations}
 * @extends {Transport} object
 */
function CoachStations() {
    'use strict';

    /** @private */
    var getCoachStations = new TransportServiceAPI().getCoachStations();
    var coachStationsElem = $('.transport__coachstations'); // todo: change to $(this)

    /**
    * Finds and displays a list and map of coach stations by postcode
    * @todo handle invalid postcode / distance
    *
    * @param {postcode} string
    * @param {distance} number
    * @return {coachStationList} array
    */
    function findByPostcode(postcode, distance) {
        return getCoachStations.byPostcode(postcode, distance)
            .then(function( coachStationList ) {
                __showList(postcode, coachStationList);
                __showMap(postcode, coachStationList);

                return coachStationList;
            });
    }

    /**
    * Show list of coach stations
    * @todo clean this up
    *
    * @private
    * @param {postcode} string
    * @param {coachStationList} array
    */
    function __showList(postcode, coachStationList) {
        var coachStationsListElem = coachStationsElem.find('.transport__coachstations-list');

        // clear the existing list
        coachStationsListElem.find('li').remove();

        // display a new list
        $.each(coachStationList, function(index, coachStation) {
            var listText = $('<strong>' + coachStation.name + '</strong>');

            var listDistance = $('<span>' + __getDistance(coachStation.distance) + '</span>')
                .addClass('text-right pull-right');

            var listAnchor = $('<a href="#" />')
                .addClass('list-group-item')
                .append(listText)
                .append(listDistance);

            var listItem = $('<li />')
                .addClass('transport__coachstations-list-item')
                .append(listAnchor);

            coachStationsListElem.append(listItem);
        });
    }

    /**
    * Show map of coach stations
    * @todo refator into smaller chuncks
    *
    * @private
    * @param {postcode} string
    * @param {coachStationList} array
    */
    function __showMap(postcode, coachStationList) {
        var coachStationMapElem = coachStationsElem.find('.transport__coachstations-map');
        var image = 'https://maps.gstatic.com/tactile/minimap/pegman-offscreen-2x.png';

        // create map todo: add config
        coachStationMapElem.googleMap({
            center: postcode
        });

        // todo: remove old markers
        coachStationMapElem.addMarker({
            id: 'youAreHere',
            title: 'You are here',
            address: postcode,
            icon: image,
            animation: google.maps.Animation.DROP,
        });

        // add markers
        $.each(coachStationList, function(index, coachStation) {


            // todo: move to DAO
            var marker = {
                id: coachStation.nationalcoachcode,
                title: coachStation.name,
                text: __getMapDescription(coachStation),
                distance: coachStation.distance,
            	coords: coachStation.latlong.coordinates.reverse()
            };

            coachStationMapElem.addMarker(marker);
        });
    }

    /**
    * Show map description
    *
    * @private
    * @param {coachStation} object
    * @param {__getMapDescription} string
    */
    function __getMapDescription(coachStation) {
        var nationalCode = '<strong>National coach code:</strong> ' + coachStation.nationalcoachcode;
        var distance = '<strong>Distance:</strong> ' + __getDistance(coachStation.distance);
        return nationalCode + '<br />' + distance;
    }

    /**
    * Show distance in km
    *
    * @private
    * @param {distance} number
    * @param {__distance} string
    */
    function __getDistance(distance) {
        var __distance = parseFloat(distance) / 1000;
        return __distance.toFixed(2)+ 'km' || '';
    }

    return {
        findByPostcode: findByPostcode
    };
}
