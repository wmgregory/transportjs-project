function CoachStations() {
    'use strict';

    var getCoachStations = new TransportServiceAPI().getCoachStations();
    var coachStationsElem = $('.transport__coachstations'); // todo: change to $(this)

    // todo: handle invalid postcode / distance
    function findByPostcode(postcode, distance) {
        return getCoachStations.byPostcode(postcode, distance)
            .then(function( coachStationList ) {
                __showList(postcode, coachStationList);
                __showMap(postcode, coachStationList);
            });
    }

    // todo: clean this up
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

    function __showMap(postcode, coachStationList) {
        var coachStationMapElem = coachStationsElem.find('.transport__coachstations-map');

        // create map todo: add config
        coachStationMapElem.googleMap({
            center: postcode
        });

        // todo: remove old markers
        coachStationMapElem.addMarker({
            id: 'youAreHere',
            title: 'You are here',
            text: 'lorem ipsum',
            address: postcode
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

Transport.prototype.CoachStations = CoachStations;
