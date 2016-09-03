var Transport = function() {}

Transport.prototype.CoachStations = CoachStations;

function TransportServiceAPI() {
    'use strict';

    var baseUrl = 'https://data.gov.uk/data/api/service/transport/';

    function __getAPI(url, params) {
        return $.get(baseUrl + url, params);
    }

    function getCoachStationsByPostcode(postcode, distance) {
        return __getAPI('naptan_coach_stations/postcode', { postcode: postcode, distance: distance });
    }
    return {
        getCoachStationsByPostcode: getCoachStationsByPostcode
    };
}

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
