var app = angular.module('StarterApp', ['ngRoute', 'LocalStorageModule', 'angularify.semantic', 'socket-io']);

app.controller('AppCtrl', ['$scope', '$location',
    function($scope, $location){
        $scope.menu = [];

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.menu.push({
            name: 'General',
            url: '/general',
            type: 'link',
            icon: 'settings',
        });

        $scope.menu.push({
            name: 'Lower Thirds',
            url: '/lowerThirds',
            type: 'link',
            icon: 'violet list layout'
        });

        $scope.menu.push({
            name: 'Grid',
            url: '/grid',
            type: 'link',
            icon: 'teal grid layout',
        });

        $scope.menu.push({
            name: 'Roses',
            url: '/roses',
            type: 'link',
            icon: 'yellow trophy',
        });

        $scope.menu.push({
            name: 'Boxing',
            url: '/boxing',
            type: 'link',
            icon: 'olive users',
        });

        $scope.menu.push({
            name: 'Football/Rugby',
            url: '/football',
            type: 'link',
            icon: 'soccer',
        });

        $scope.menu.push({
            name: 'Darts',
            url: '/darts',
            type: 'link',
            icon: 'red bullseye',
        });

        $scope.menu.push({
            name: 'Swimming',
            url: '/swimming',
            type: 'link',
            icon: 'blue life ring',
        });

        $scope.menu.push({
            name: 'Basketball',
            url: '/basketball',
            type: 'link',
            icon: 'orange clockwise rotated loading life ring',
        });

        $scope.menu.push({
            name: 'Archery',
            url: '/archery',
            type: 'link',
            icon: 'bullseye',
        });
    }
]);

/*
 *  Configure the app routes
 */
app.config(['$routeProvider', 'localStorageServiceProvider',
    function($routeProvider, localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('la1tv');

        $routeProvider
            .when("/general", {
                templateUrl: '/admin/templates/general.tmpl.html',
                controller: 'generalCGController'
            })
            .when("/lowerThirds", {
                templateUrl: '/admin/templates/lowerThirds.tmpl.html',
                controller: 'lowerThirdsCGController'
            })
            .when("/boxing", {
                templateUrl: '/admin/templates/boxing.tmpl.html',
                controller: 'boxingCGController'
            })
            .when("/roses", {
                templateUrl: '/admin/templates/roses.tmpl.html',
                controller: 'rosesCGController'
            })
            .when("/football", {
                templateUrl: '/admin/templates/football.tmpl.html',
                controller: 'footballCGController'
            })
            .when("/darts", {
                templateUrl: '/admin/templates/darts.tmpl.html',
                controller: 'dartsCGController'
            })
            .when("/swimming", {
                templateUrl: '/admin/templates/swimming.tmpl.html',
                controller: 'swimmingCGController'
            })
            .when("/grid", {
                templateUrl: '/admin/templates/grid.tmpl.html',
                controller: 'gridCGController'
            })
            .when("/basketball", {
                templateUrl: '/admin/templates/basketball.tmpl.html',
                controller: 'basketballCGController'
            })
            .when("/archery", {
                templateUrl: '/partials/archery.tmpl.html',
                controller: 'archeryCGController'
            })
            .otherwise({redirectTo: '/general'});
    }
]);

app.controller('archeryCGController', ['$scope', 'socket',
  function($scope, socket) {
      socket.on("archery", function (msg) {
          $scope.archery = msg;
      });

      $scope.$watch('archery', function() {
          if ($scope.archery) {
              socket.emit("archery", $scope.archery);
          } else {
              getArcheryData();
          }
      }, true);


      function getArcheryData() {
          socket.emit("archery:get");
      }

      $scope.archeryReset1 = function() {
          $scope.archery.score1 = 0;
      };

      $scope.archeryHit1 = function(){
        if($scope.archery.shots1.length < 6) {
          $scope.archery.shots1 += "H";
          var tmp = Number($scope.archery.score1);
          var newScore = (tmp + 1);
          $scope.archery.score1 = newScore;
          debugger
        }
      }

      $scope.archeryHit2 = function(){
        if($scope.archery.shots2.length < 6) {
          $scope.archery.shots2 += "H";
          var tmp = Number($scope.archery.score2);
          var newScore = (tmp + 1);
          $scope.archery.score2 = newScore;
        }
      }

      $scope.archeryMiss1 = function(){
        if($scope.archery.shots1.length < 6) {
          $scope.archery.shots1 += "M";
        }
      }

      $scope.archeryMiss2 = function(){
        if($scope.archery.shots2.length < 6) {
          $scope.archery.shots2 += "M";
        }
      }

      $scope.archeryReset2 = function() {
          $scope.archery.score2 = 0;
      };

      $scope.archeryHitsReset1 = function() {
          $scope.archery.shots1 = [];
      };

      $scope.archeryHitsReset2 = function() {
          $scope.archery.shots2 = [];
      };
  }
]);

app.controller('generalCGController', ['$scope', 'socket',
    function($scope, socket){
        socket.on("bug", function (msg) {
            $scope.general = msg;
        });

        $scope.$watch('general', function() {
            if ($scope.general) {
                socket.emit("bug", $scope.general);
            } else {
                getBugData();
            }
        }, true);

        function getBugData() {
            socket.emit("bug:get");
        }
    }
]);

app.controller('lowerThirdsCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){

        var stored = localStorageService.get('lower_thirds');

        if(stored === null) {
            $scope.queuedThirds = [];
        } else {
            $scope.queuedThirds = stored;
        }

        $scope.add = function(item) {
            $scope.queuedThirds.push(item);

            $scope.lowerThirdsForm.$setPristine();
            $scope.lowerThird = {};
        };

        $scope.remove = function(index){
            $scope.queuedThirds.splice(index, 1);
        };

        $scope.show = function(side, item) {
            socket.emit("lowerthird:" + side, item);
        };

        $scope.hide = function() {
            socket.emit("lowerthird:hide");
        };

        $scope.$on("$destroy", function() {
            localStorageService.set('lower_thirds', $scope.queuedThirds);
        });
    }
]);

app.controller('gridCGController', ['$scope', '$log', 'localStorageService', 'socket',
    function($scope, $log, localStorageService, socket){

        var stored = localStorageService.get('grid');

        if(stored === null) {
            $scope.grid = {};
            $scope.grid.rows = [];
        } else {
            $scope.grid = stored;
        }

        $scope.add = function() {
            $scope.grid.rows.push({left:'', right:''});
        };

        $scope.remove = function(index){
            $scope.grid.rows.splice(index, 1);
        };

        $scope.show = function() {
            socket.emit('grid', $scope.grid);
            $log.info("grid.show()");
            $log.info($scope.grid);
        };

        $scope.hide = function() {
            socket.emit('grid', 'hide');
            $log.info("grid.hide()");
        };

        $scope.$on("$destroy", function() {
            localStorageService.set('grid', $scope.grid);
        });
}]);

app.controller('boxingCGController', ['$scope', 'socket',
    function($scope, socket){
        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.updateScore = function() {
            console.log("Score");
        };

        $scope.roundChanged = function() {
            console.log("Round");
        };

        socket.on("boxing", function (msg) {
            $scope.boxing = msg;
        });

        $scope.$watch('boxing', function() {
            if ($scope.boxing) {
                socket.emit("boxing", $scope.boxing);
            } else {
                getBoxingData();
            }
        }, true);

        function getBoxingData() {
            socket.emit("boxing:get");
            socket.emit("clock:get");
        }
    }
]);


app.controller('rosesCGController', ['$scope', 'socket',
    function($scope, socket){
        socket.on("score", function (msg) {
            $scope.roses = msg;
        });

        $scope.$watch('roses', function() {
            if ($scope.roses) {
                socket.emit("score", $scope.roses);
            } else {
                getScoreData();
            }
        }, true);

        function getScoreData() {
            socket.emit("score:get");
        }
    }
]);


app.controller('footballCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){
        var storedLancs = localStorageService.get('lancs_football');
        var storedYork = localStorageService.get('york_football');

        if(storedLancs === null) {
            $scope.lancsPlayers = [];
        } else {
            $scope.lancsPlayers = storedLancs;
        }

        if(storedYork === null) {
            $scope.yorksPlayers = [];
        } else {
            $scope.yorksPlayers = storedYork;
        }

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.addLancsPlayer = function() {
            $scope.lancsPlayers.push($scope.lancs);
            $scope.lancs = {};
        };

        $scope.addYorksPlayer = function() {
            $scope.yorksPlayers.push($scope.york);
            $scope.york = {};
        };

        $scope.delete = function(team, index) {
            console.log('delete');
            if(team === 'york') {
                $scope.yorksPlayers.splice(index, 1);
            } else if (team === 'lancs') {
                $scope.lancsPlayers.splice(index, 1);
            }
        };

        socket.on("football", function (msg) {
            $scope.football = msg;
        });

        $scope.$watch('football', function() {
            if ($scope.football) {
                socket.emit("football", $scope.football);
            } else {
                getFootballData();
            }
        }, true);

        $scope.$on("$destroy", function() {
            localStorageService.set('york_football', $scope.yorksPlayers);
            localStorageService.set('lancs_football', $scope.lancsPlayers);
        });

        function getFootballData() {
            socket.emit("football:get");
            socket.emit("clock:get");
        }
    }
]);


app.controller('dartsCGController', ['$scope', 'socket',
    function($scope, socket) {
        socket.on("dart", function (msg) {
            $scope.dart = msg;
        });

        $scope.$watch('dart', function() {
            if ($scope.dart) {
                socket.emit("dart", $scope.dart);
            } else {
                getDartData();
            }
        }, true);

        function getDartData() {
            socket.emit("dart:get");
        }

        $scope.reset1 = function() {
            $scope.dart.score1 = 501;
        };

        $scope.reset2 = function() {
            $scope.dart.score2 = 501;
        };

        $scope.take1 = function(val) {
            if( val > 180) {
                $scope.last1 = "";
                return;
            }

            var tmp = $scope.dart.score1;
            var newScore = (tmp - val);

            if(newScore >= 0) {
                $scope.dart.score1 = newScore;
                $scope.last1 = "";
            }
        };

        $scope.take2 = function(val) {
            if( val > 180) {
                $scope.last2 = "";
                return;
            }

            var tmp = $scope.dart.score2;
            var newScore = (tmp - val);

            if(newScore >= 0) {
                $scope.dart.score2 = newScore;
                $scope.last2 = "";
            }
        };
    }
]);

app.controller('swimmingCGController', ['$scope', 'socket',
    function($scope, socket) {
        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.replace(/^0/, '');
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.resetOrder = function(val) {
                $scope.swimming.showsplits = false;
                setTimeout(function() {
                    $scope.swimming.order = '';
                    $scope.swimming.showsplits = true;
                    socket.emit("swimming", $scope.swimming);
                }, 600);
        };

        $scope.resetLanes = function() {
            $scope.swimming.order = '';

            for(i = 1; i <= 8; i++){
                $scope.swimming['lane' + i + 'name'] = '';
                $scope.swimming['lane' + i + 'team'] = '';
            }
        };

        socket.on("swimming", function (msg) {
            $scope.swimming = msg;
        });

        $scope.$watch('swimming', function() {
            if ($scope.swimming) {
                socket.emit("swimming", $scope.swimming);
            } else {
                getSwimmingData();
            }
        }, true);

        function getSwimmingData() {
            socket.emit("swimming:get");
            socket.emit("clock:get");
        }

        $(function () {
          $('.ui.dropdown').dropdown();
        });
    }
]);

app.controller('basketballCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){
        var storedLancs = localStorageService.get('lancs_basketball');
        var storedYork = localStorageService.get('york_basketball');

        if(storedLancs === null) {
            $scope.lancsPlayers = [];
        } else {
            $scope.lancsPlayers = storedLancs;
        }

        if(storedYork === null) {
            $scope.yorksPlayers = [];
        } else {
            $scope.yorksPlayers = storedYork;
        }

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.pauseClock = function() {
            socket.emit("clock:pause");
        };

        $scope.resetClock = function() {
            socket.emit("clock:reset");
        };

        $scope.setClock = function(val) {
            socket.emit("clock:set", val);
        };

        $scope.downClock = function() {
            socket.emit("clock:down");
        };

        $scope.upClock = function() {
            socket.emit("clock:up");
        };

        $scope.addLancsPlayer = function() {
            $scope.lancsPlayers.push($scope.lancs);
            $scope.lancs = {};
        };

        $scope.addYorksPlayer = function() {
            $scope.yorksPlayers.push($scope.york);
            $scope.york = {};
        };

        $scope.delete = function(team, index) {
            console.log('delete');
            if(team === 'york') {
                $scope.yorksPlayers.splice(index, 1);
            } else if (team === 'lancs') {
                $scope.lancsPlayers.splice(index, 1);
            }
        };

        socket.on("basketball", function (msg) {
            $scope.basketball = msg;
        });

        $scope.$watch('basketball', function() {
            if ($scope.basketball) {
                socket.emit("basketball", $scope.basketball);
            } else {
                getBasketballData();
            }
        }, true);

        $scope.$on("$destroy", function() {
            localStorageService.set('york_basketball', $scope.yorksPlayers);
            localStorageService.set('lancs_basketball', $scope.lancsPlayers);
        });

        function getBasketballData() {
            socket.emit("football:get");
            socket.emit("clock:get");
        }
    }
]);
