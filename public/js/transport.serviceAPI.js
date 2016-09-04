/**
 * TransportServiceAPI
 * API service to connect to gov.co.uk
 *
 * @constructor
 */
function TransportServiceAPI() {
    'use strict';

    /** @private */
    var baseUrl = 'https://data.gov.uk/data/api/service/transport';

    /**
    * API call to gov.co.uk
    *
    * @private
    * @param {url} string
    * @param {params} object
    */
    function __getTransportAPI(url, params) {
        return $.get(baseUrl + url, params);
    }

    /**
     * Creates an API service for getting coach stations
     *
     * @constructor
     * @return {getCoachStations} object.
     */
    function getCoachStations() {

        /** @private */
        var baseUrl = '/naptan_coach_stations';

        /**
         * An API service for getting coach stations by postcode
         *
         * @param {postcode} string
         * @param {distance} number
         * @return {getCoachStations} object.
         */
        function byPostcode(postcode, distance) {

            // todo: add error handling
            return __getTransportAPI(baseUrl + '/postcode', { postcode: postcode, distance: distance })
                .then(function(response) {

                    // return just the results or empty array
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
