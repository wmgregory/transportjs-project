function TransportServiceAPI() {
    'use strict';

    var baseUrl = 'https://data.gov.uk/data/api/service/transport/';

    function __getTransportAPI(url, params) {
        return $.get(baseUrl + url, params);
    }

    function getCoachStations() {
        var baseUrl = 'naptan_coach_stations/';

        // todo: add error handling
        function byPostcode(postcode, distance) {
            return __getTransportAPI(baseUrl + 'postcode', { postcode: postcode, distance: distance })
                .then(function(response) {
                    // return just the results
                    return response.result || [];
                });
        }

        return {
            byPostcode: byPostcode
        };
    }

    return {
        getCoachStations: getCoachStations
    };
}
