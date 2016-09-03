(function () {
    'use strict';

    $(document).ready(function(){

        // setup transport coach stations
        var transport = new Transport();
        var coachStations = transport.CoachStations();

        console.log(coachStations.findByPostcode('WC1E 7BL', 3));
    });

})();
