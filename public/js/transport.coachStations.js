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

            coachStationsListElem.append(
                '<li class="transport__coachstations-list-item">'
                + '<a class="list-group-item" href="#">'
                + coachStation.name
                + '</a></li>'
            );
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
            text: 'lorem ipsum',
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
                text: 'National coach code: ' + coachStation.nationalcoachcode,
                distance: coachStation.distance,
            	coords: coachStation.latlong.coordinates.reverse()
            };

            coachStationMapElem.addMarker(marker);
        });
    }

    return {
        findByPostcode: findByPostcode
    };
}
