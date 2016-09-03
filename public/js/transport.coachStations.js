Transport.prototype.CoachStations = CoachStations;

function CoachStations() {
    'use strict';

    return {
        findByPostcode: findByPostcode
    };

    //todo: use a service
    function findByPostcode(postcode, distance) {
        return TransportServiceAPI()
            .getCoachStationsByPostcode(postcode, distance)
            .then(function( coachStationList ) {
                __showList(coachStationList);
                __showMap(coachStationList);
            });
    }

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
}
