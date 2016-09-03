Transport.prototype.CoachStations = CoachStations;

function CoachStations() {
    'use strict';

    //todo: use a service
    function findByPostcode(postcode, distance) {
        return TransportServiceAPI()
            .getCoachStationsByPostcode(postcode, distance)
            .then(function(response) {
                return response.result;
            });
    }

    return {
        findByPostcode: findByPostcode
    };
}
