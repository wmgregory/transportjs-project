(function () {
    'use strict';

    // todo: move all this into a jQuery class object
    $(document).ready(function(){

        // setup transport coach stations
        var transport = new Transport();
        var coachStations = transport.CoachStations();
        coachStations.findByPostcode('WC1E 7BL', 3);
        //todo: change to $.fn for better jQuery handling
    });

})();
