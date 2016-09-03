(function () {
    'use strict';

    $(document).ready(function(){

        // setup transport coach stations
        var transport = new Transport();
        var coachStations = transport.CoachStations();
        var coachStationList = coachStations.findByPostcode('WC1E 7BL', 3);

        // clear the existing list
        $('.transport__coachstations .transport__coachstations-list li').remove();

        $.each(coachStationList, function(index, coachStation) {
          $('.transport__coachstations .transport__coachstations-list').append('<li><a class="transport__coachstations-list-item list-group-item">'
            + coachStation.name
            + '</a></li>');
        });
    });

})();
