(function () {
    'use strict';

    // todo: move all this into a jQuery class object
    $(document).ready(function(){

        // setup transport coach stations
        var transport = new Transport();
        var coachStations = transport.CoachStations();

        coachStations.findByPostcode('WC1E 7BL', 3).then(function( coachStationList ) {

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
        });
    });

})();
