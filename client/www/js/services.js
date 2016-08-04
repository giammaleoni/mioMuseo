angular.module('app.services', [])

.factory('MuseiService', [function(){
  var musei = [
    {
      'id' : '91349486-98ab-463a-bffe-9cca62678319',
      'nick' : 'Louvre',
      'pic' : 'img/jCXMU2zyQFWFX94tQT3X_photo.jpg',
      'detail': 'Rue de test'
    },
    {
      'id': 'a5d6f4d7-b73c-4db5-a450-e3f90441b3d6',
      'nick' : 'Prado',
      'pic' : 'img/jCXMU2zyQFWFX94tQT3X_photo.jpg',
      'detail': 'Avenida de test'
    }
  ];

  return {
    musei: musei,
    getMuseo: function(id) {
      for (var i = 0; i < musei.length; i++) {
        if (musei[i].id == id) {
          return musei[i];
        }
      }
    }
  }

}])

.service('BlankService', [function(){

}]);
