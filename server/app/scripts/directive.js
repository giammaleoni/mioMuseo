'use strict';

angular.module('yapp')

.directive("filesread", [function () {
    return {
        scope: {
            filesread: "=",
            uris: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = [];
                var count = 0;
                for (var i = 0; i < changeEvent.target.files.length; i++) {
                  reader = new FileReader();
                  scope.filesread = [];
                  scope.uris = [];
                  var f = changeEvent.target.files[i];
                  reader.onload = (function(f) {
                    return function(e) {
                      var dataUri = e.target.result;
                        // console.log( "Got the file.n"
                        //       +"name: " + f.name + "\n"
                        //       +"type: " + f.type + "\n"
                        //       +"size: " + f.size + " bytes\n");
                        scope.$apply(function () {
                            //scope.filesread.push({"name":f.name, "size": f.size, "type": f.type, "lastEdit": f.lastModifiedDate, "uri": dataUri});
                            scope.filesread.push({"name":f.name, "size": f.size, "type": f.type, "lastEdit": f.lastModifiedDate});
                            scope.uris.push({"name":f.name, "size": f.size, "uri": dataUri});
                        });
                    };
                  })(f);
                  reader.readAsDataURL(f);
                  // console.log(reader);
                }

            });
        }
    }
}])

.directive('audio', function($sce) {
  return {
    restrict: 'A',
    scope: { code:'=' },
    replace: true,
    template: '<audio ng-src="{{url}}" controls style="vertical-align:middle"></audio>',
    link: function (scope) {
        scope.$watch('code', function (newVal, oldVal) {
           if (newVal !== undefined) {
               scope.url = $sce.trustAsResourceUrl(newVal);
           }
        });
    }
  };
});
