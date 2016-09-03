function CoachStations() {
    'use strict';

    var getCoachStations = new TransportServiceAPI().getCoachStations();

    function findByPostcode(postcode, distance) {
        return getCoachStations.byPostcode(postcode, distance)
            .then(function( coachStationList ) {
                __showList(coachStationList);
                __showMap(coachStationList);
            });
    }

    // todo: clean this up
    function __showList(coachStationList) {

        // clear the existing list
        $('.transport__coachstations .transport__coachstations-list li').remove();

        // display a new list
        $.each(coachStationList, function(index, coachStation) {

            $('.transport__coachstations .transport__coachstations-list').append(
                '<li><a class="transport__coachstations-list-item list-group-item">'
                + coachStation.name
                + '</a></li>'
            );
        });
    }

    function __showMap() {

    }

    return {
        findByPostcode: findByPostcode
    };
}

Transport.prototype.CoachStations = CoachStations;
