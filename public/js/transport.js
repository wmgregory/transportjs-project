var Transport = function() {}

Transport.prototype.CoachStations = CoachStations;

function CoachStations() {
    'use strict';

    // todo: remove later when API installed
    var coachStationList = [
      {
        'ospoint': {
          'type': 'Point',
          'crs': {
            'type': 'name',
            'properties': {
              'name': 'EPSG27700'
            }
          },
          'coordinates': [
            527910,
            182032
          ]
        },
        'nationalcoachcode': '900057378M',
        'name': 'Baker Street',
        'latlong': {
          'type': 'Point',
          'crs': {
            'type': 'name',
            'properties': {
              'name': 'EPSG4326'
            }
          },
          'coordinates': [
            -0.15771316479289943,
            51.522728429703754
          ]
        },
        'distance': 1808.643795502,
        'atcocode': '490000011B'
      }
    ];

    //todo: use a service
    function findByPostcode(postcode, distance) {
        return coachStationList;
    }

    return {
        findByPostcode: findByPostcode
    };
}
