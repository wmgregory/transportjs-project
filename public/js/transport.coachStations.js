function CoachStations() {
    'use strict';

    var getCoachStations = new TransportServiceAPI().getCoachStations();
    var coachStationsElem = $('.transport__coachstations'); // todo: change to $(this)

    // todo: handle invalid postcode / distance
    function findByPostcode(postcode, distance) {
        return getCoachStations.byPostcode(postcode, distance)
            .then(function( coachStationList ) {
                __showList(coachStationList);
                __showMap(coachStationList);
            });
    }

    // todo: clean this up
    function __showList(coachStationList) {
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

    function __showMap(coachStationList) {
        var coachStationMapElem = coachStationsElem.find('.transport__coachstations-map');

        // create map todo: add config
        coachStationMapElem.googleMap();

        // add markers
        // todo: remove old markers
        $.each(coachStationList, function(index, coachStation) {
            var coords = coachStation.latlong.coordinates.reverse();
            coachStationMapElem.addMarker({
            	 coords: coords
            });
        });
    }

    return {
        findByPostcode: findByPostcode
    };
}

Transport.prototype.CoachStations = CoachStations;
