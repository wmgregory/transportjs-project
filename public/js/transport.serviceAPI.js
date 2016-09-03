function TransportServiceAPI() {
    'use strict';

    var baseUrl = 'https://data.gov.uk/data/api/service/transport/';

    function __getAPI(url, params) {
        return $.get(baseUrl + url, params);
    }

    // todo: clean this up so it's able to be extended
    function getCoachStationsByPostcode(postcode, distance) {
        return __getAPI('naptan_coach_stations/postcode', { postcode: postcode, distance: distance })
            .then(function(response) {
                return response.result;
            });
    }

    return {
        getCoachStationsByPostcode: getCoachStationsByPostcode
    };
}
