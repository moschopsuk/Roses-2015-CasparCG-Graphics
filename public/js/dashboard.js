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
            live: false,
        });

        $scope.menu.push({
            name: 'Lower Thirds',
            url: '/lowerThirds',
            type: 'link',
            icon: 'violet list layout',
            live: false,
        });

        $scope.menu.push({
            name: 'Grid',
            url: '/grid',
            type: 'link',
            icon: 'teal grid layout',
            live: false,
        });

        $scope.menu.push({
            name: 'Roses',
            url: '/roses',
            type: 'link',
            icon: 'yellow trophy',
            live: false,
        });

        $scope.menu.push({
            name: 'Boxing',
            url: '/boxing',
            type: 'link',
            icon: 'olive users',
            live: false,
        });

        $scope.menu.push({
            name: 'Football',
            url: '/football',
            type: 'link',
            icon: 'soccer',
            live: false,
        });

        $scope.menu.push({
            name: 'Rugby',
            url: '/rugby',
            type: 'link',
            icon: 'orange soccer',
        });

        $scope.menu.push({
            name: 'Darts',
            url: '/darts',
            type: 'link',
            icon: 'red bullseye',
            live: false,
        });

        $scope.menu.push({
            name: 'Swimming',
            url: '/swimming',
            type: 'link',
            icon: 'blue life ring',
            live: false,
        });

        $scope.menu.push({
            name: 'Basketball',
            url: '/basketball',
            type: 'link',
            icon: 'orange clockwise rotated loading life ring',
            live: false,
        });

        $scope.menu.push({
            name: 'Archery',
            url: '/archery',
            type: 'link',
            icon: 'bullseye',
            live: false,
        });

        $scope.menu.push({
            name: 'Badminton',
            url: '/badminton',
            type: 'link',
            icon: 'green neuter',
            live: false,
        });

        $scope.menu.push({
            name: 'Tennis',
            url: '/tennis',
            type: 'link',
            icon: 'olive circle',
            live: false,
        });

        $scope.menu.push({
            name: 'Netball',
            url: '/netball',
            type: 'link',
            icon: 'soccer',
            live: false,
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
            .when("/rugby", {
                templateUrl: '/admin/templates/rugby.tmpl.html',
                controller: 'rugbyCGController'
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
                templateUrl: '/admin/templates/archery.tmpl.html',
                controller: 'archeryCGController'
            })
            .when("/badminton", {
              templateUrl: '/admin/templates/badminton.tmpl.html',
              controller: 'badmintonCGController'
            })
            .when("/tennis", {
              templateUrl: '/admin/templates/tennis.tmpl.html',
              controller: 'tennisCGController'
            })
            .when("/netball", {
              templateUrl: '/admin/templates/netball.tmpl.html',
              controller: 'netballCGController'
            })
            .otherwise({redirectTo: '/general'});
    }
]);

app.controller('archeryCGController', ['$scope', 'socket',
  function($scope, socket) {
      socket.on("archery", function (msg) {
          $scope.archery = msg;
          $scope.menu.forEach(item => {
              if (item.name === 'Archery') {
                  item.live = $scope.archery.show
              }
          })
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

        socket.on("bug", function (msg) {
            $scope.bug = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'General') {
                    if ($scope.bug.showLive === true || $scope.bug.showLocation === true || $scope.general.showClock === true || $scope.general.showLogo === true) {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
        });

        function getBugData() {
            socket.emit("bug:get");
        }
    }
]);

app.controller('lowerThirdsCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){

        var stored = localStorageService.get('lower_thirds');

        const showLiveLowerThird = $scope => {
            $scope.menu.forEach(item => {
                if (item.name === 'Lower Thirds') {
                    item.live = true
                }
            })
        }

        const hideLiveLowerThird = $scope => {
            $scope.menu.forEach(item => {
                if (item.name === 'Lower Thirds') {
                    item.live = false
                }
            })
        }

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
            showLiveLowerThird($scope)
        };

        $scope.hideall = function() {
            socket.emit("lowerthird:hideall");
            hideLiveLowerThird($scope)
        };

        $scope.hidefull = function() {
            socket.emit("lowerthird:hidefull");
        };

		$scope.hideleft = function() {
            socket.emit("lowerthird:hideleft");
        };

		$scope.hideright = function() {
            socket.emit("lowerthird:hideright");
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
            $scope.menu.forEach(item => {
                if (item.name === 'Grid') {
                    item.live = true
                }
            })
        };

        $scope.hide = function() {
            socket.emit('grid', 'hide');
            $log.info("grid.hide()");
            $scope.menu.forEach(item => {
                if (item.name === 'Grid') {
                    item.live = false
                }
            })
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
            $scope.menu.forEach(item => {
                if (item.name === 'Boxing') {
                    item.live = $scope.boxing.showScore
                }
            })
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
            $scope.menu.forEach(item => {
                if (item.name === 'Roses') {
                    item.live = $scope.roses.showScore
                }
            })
        });

        socket.on('lancScore', function(msg){
          $scope.rosesLancScore = msg
        });

        socket.on('yorkScore', function(msg){
          $scope.rosesYorkScore = msg
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
            $scope.menu.forEach(item => {
                if (item.name === 'Football') {
                    if ($scope.football.show === true || $scope.football.showpre === true || $scope.football.showpost === true ) {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
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

app.controller('rugbyCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){
        var storedLancs = localStorageService.get('lancs_rugby');
        var storedYork = localStorageService.get('york_rugby');

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
            if(team === 'york') {
                $scope.yorksPlayers.splice(index, 1);
            } else if (team === 'lancs') {
                $scope.lancsPlayers.splice(index, 1);
            }
        };

        socket.on("rugby", function (msg) {
            $scope.rugby = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Rugby') {
                    item.live = $scope.rugby.show
                }
            })
        });

        $scope.$watch('rugby', function() {
            if ($scope.rugby) {
                socket.emit("rugby", $scope.rugby);
            } else {
                getRugbyData();
            }
        }, true);

        $scope.$on("$destroy", function() {
            localStorageService.set('york_Rugby', $scope.yorksPlayers);
            localStorageService.set('lancs_Rugby', $scope.lancsPlayers);
        });

        function getRugbyData() {
            socket.emit("Rugby:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('dartsCGController', ['$scope', 'socket',
    function($scope, socket) {
        socket.on("dart", function (msg) {
            $scope.dart = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Darts') {
                    item.live = $scope.dart.show
                }
            })
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
                var splits = $scope.swimming.showsplits;
                $scope.swimming.showsplits = false;
                setTimeout(function() {
                    $scope.swimming.order = '';
                    $scope.swimming.showsplits = splits;
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
            $scope.menu.forEach(item => {
                if (item.name === 'Swimming') {
                    if ($scope.swimming.showlist === true || $scope.swimming.showclock === true) {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
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
            $scope.menu.forEach(item => {
                if (item.name === 'Basketball') {
                    item.live = $scope.basketball.show
                }
            })
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

app.controller('badmintonCGController', ['$scope', 'socket',
    function($scope, socket) {
        socket.on("badminton", function (msg) {
            $scope.badminton = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Badminton') {
                    item.live = $scope.badminton.show
                }
            })
        });

        $scope.resetGame1 = function() {
          $scope.badminton.game1 = 0;
        };

        $scope.resetGame2 = function() {
          $scope.badminton.game2 = 0;
        };

        $scope.resetPoint1 = function() {
          $scope.badminton.point1 = 0;
        };

        $scope.resetPoint2 = function() {
          $scope.badminton.point2 = 0;
        };

        $scope.$watch('badminton', function() {
            if ($scope.badminton) {
                socket.emit("badminton", $scope.badminton);
            } else {
                getBadmintonData();
            }
        }, true);

        function getBadmintonData() {
            socket.emit("badminton:get");
        }
    }
]);

app.controller('tennisCGController', ['$scope', 'socket',
    function($scope, socket) {
        // to make maths easier, we'll calculate points linearly and then map them to this array of tennis scores. Arrays start at 0!
        var pointNames = ['0', '15', '30', '40', 'AD']

        // usual functions to recieve/send data to the server
        socket.on("tennisOptions", function (msg) {
            $scope.tennisOptions = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Tennis') {
                    item.live = $scope.tennisOptions.showScore
                }
            })
        });

        socket.on("tennisScore", function (msg) {
            $scope.tennisScore = msg;
        });

        $scope.$watch('tennisOptions', function() {
            if ($scope.tennisOptions) {
				if (($scope.tennisOptions.matchName).includes("Mixed")) {
					$scope.tennisOptions.player1 = "Lancaster";
					$scope.tennisOptions.player2 = "York";
				}
				
                socket.emit("tennisOptions", $scope.tennisOptions);
            } else {
                getTennisData();
            }
        }, true);

        $scope.$watch('tennisScore', function() {
            if ($scope.tennisScore) {
                socket.emit("tennisScore", $scope.tennisScore);
            } else {
                getTennisData();
            }
        }, true);

        // point scoring function - does all the complicated math for the user
        $scope.scorePoint = function(player) {
            // given the scoring player, get their opponent
            var opponent = (player == 1 ? 2 : 1);

            // increment number of serves for server by 1
            $scope.tennisScore['pointsServed' + $scope.tennisScore.server] ++;

            // if player was server, update serves won
            if (player == $scope.tennisScore.server) {
                if ($scope.tennisScore.firstFault) {
                    $scope.tennisScore['secondServeWon' + player] ++;
                } else {
                    $scope.tennisScore['firstServeWon' + player] ++;
                }
            }

            // clear any faults
            $scope.tennisScore.firstFault = false;

            if ($scope.tennisScore.tiebreak == true) {
                // tiebreak
                if ($scope.tennisScore['point' + player] >= 6 && ($scope.tennisScore['point' + player] - $scope.tennisScore['point' + opponent]) >= 1) {
                    // player already won at least 6 points, and now has 2 point advantage, so wins game
                    winGame(player);
                } else {
                    $scope.tennisScore['point' + player] ++;
                    $scope.tennisScore.pointName1 = $scope.tennisScore.point1;
                    $scope.tennisScore.pointName2 = $scope.tennisScore.point2;

                    // change server after every odd-numbered point played
                    if ((($scope.tennisScore['point' + player] + $scope.tennisScore['point' + opponent]) % 2) == 1) {
                        $scope.toggleServer();
                    }
                }
            } else {
                // normal game
                if ($scope.tennisScore['point' + player] >= 3 && $scope.tennisScore['point' + opponent] >= 3) {
                    // duece or advantage
                    if ($scope.tennisScore['point' + opponent] == 4) {
                        // opponent had advantage, so score now duece
                        $scope.tennisScore['point' + opponent] = 3;
                    } else if ($scope.tennisScore['point' + player] == 4) {
                        // player had advantage, so wins game
                        winGame(player);
                    } else {
                        // was duece, so player now has advantage
                        $scope.tennisScore['point' + player] = 4;
                    }
                } else if ($scope.tennisScore['point' + player] == 3) {
                    // player had 40, opponent 30 or less, so player wins game
                    winGame(player);
                } else {
                    // player had 30 or less, so add a point
                    $scope.tennisScore['point' + player] ++;
                }
                $scope.tennisScore.pointName1 = pointNames[$scope.tennisScore.point1];
                $scope.tennisScore.pointName2 = pointNames[$scope.tennisScore.point2];
            }

            $scope.tennisScore.pointsPlayed ++;
            $scope.tennisScore['pointsWon' + player] ++;

            checkTiebreak();
            checkGamePoint(player);
        };

        // ace point
        $scope.acePoint = function() {
            $scope.tennisScore['ace' + $scope.tennisScore.server] ++;
            $scope.scorePoint($scope.tennisScore.server);
        };

        // fault
        $scope.faultPoint = function() {
            if ($scope.tennisScore.firstFault) {
                // double fault
                $scope.tennisScore['singleFault' + $scope.tennisScore.server] --;
                $scope.tennisScore['doubleFault' + $scope.tennisScore.server] ++;

                // opponent scores a point
                var opponent = ($scope.tennisScore.server == 1 ? 2 : 1);
                $scope.scorePoint(opponent);
            } else {
                // first fault - set it to true
                $scope.tennisScore.firstFault = true;
                $scope.tennisScore['singleFault' + $scope.tennisScore.server] ++;
            }
        };

        function winGame(player) {
            // given the scoring player, get their opponent
            var opponent = (player == 1 ? 2 : 1);
			
            if ($scope.tennisScore.tiebreak == false) {
                if (player == $scope.tennisScore.server) {
					          // player was serving, and not in a tiebreak, count this as service game win
					          $scope.tennisScore['servicesWon' + player] ++;
				        } else {
					          // opponent was serving, and not in a tiebreak, count this as break point win
					          $scope.tennisScore['breaksWon' + player] ++;
                }

                // increment service games for server
                $scope.tennisScore['serviceGame' + $scope.tennisScore.server] ++;
            }
            
            // update the sets array
            $scope.tennisScore['sets' + player].splice(-1,1,($scope.tennisScore['game' + player] + 1));

            if ($scope.tennisScore.tiebreak == true) {
                // player won tiebreak game, so wins set
                winSet(player);
            } else if ($scope.tennisScore['game' + player] >= 5 && ($scope.tennisScore['game' + player] - $scope.tennisScore['game' + opponent]) >= 1) {
                // player already won at least 5 games, and now has 2 game advantage, so wins set
                winSet(player);
            } else {
                // player can't win set yet, so add a game and reset points
                $scope.tennisScore['game' + player] ++;
                resetPoints();
                $scope.toggleServer();
            }
        }

        function winSet(player) {
            // given the scoring player, get their opponent
            var opponent = (player == 1 ? 2 : 1);

            $scope.tennisScore['set' + player] ++;
            resetGames();
            
            if ($scope.tennisScore['set' + player] > ($scope.tennisOptions.maxSets - 1)/2) {
                // player already won (max - 1) sets, so wins match
                $scope.tennisOptions.disableInput = true;
            } else {
                // player can't win match yet, so add a set and reset games
                $scope.tennisScore['sets' + player].push(0);
                $scope.tennisScore['sets' + opponent].push(0);

                $scope.toggleServer();
            }
        }

        function resetPoints() {
            $scope.tennisScore.point1 = $scope.tennisScore.point2 = $scope.tennisScore.pointName1 = $scope.tennisScore.pointName2 = 0;
        }

        function resetGames() {
            $scope.tennisScore.game1 = $scope.tennisScore.game2 = 0;
            resetPoints();
        }

        $scope.toggleServer = function toggleServer() {
            $scope.tennisScore.server = ($scope.tennisScore.server == 1 ? 2 : 1);
        };

        function checkTiebreak() {
            if (($scope.tennisScore.set1 + $scope.tennisScore.set2) == ($scope.tennisOptions.maxSets - 1)) {
                // this is the last set, so tiebreak is not possible
                $scope.tennisScore.tiebreak = false;
            } else if ($scope.tennisScore.game1 == 6 && $scope.tennisScore.game2 == 6 ) {
                // not the last set, players tied on 6 games each, so tiebreak
                $scope.tennisScore.tiebreak = true;
            } else {
                // not a tiebreak
                $scope.tennisScore.tiebreak = false;
            }
        }

        function checkGamePoint(player) {
            var opponent = (player == 1 ? 2 : 1);

            // horrific (but nessesary) if/else function
            if ($scope.tennisScore.tiebreak == true) {

                if ($scope.tennisScore['point' + player] >= 6 && ($scope.tennisScore['point' + player] - $scope.tennisScore['point' + opponent]) >= 1) {
                    // tiebreak, so scoring player needs to have at least 6 points, with a 1 point advantage

                    if ($scope.tennisScore['set' + player] == ($scope.tennisOptions.maxSets - 1)/2) {
                        $scope.tennisScore.gamePoint = "Match Point";
                    } else {
                        $scope.tennisScore.gamePoint = "Set Point";
                    }

                } else if ($scope.tennisScore['point' + opponent] >= 6 && ($scope.tennisScore['point' + opponent] - $scope.tennisScore['point' + player]) >= 1) {
                    // tiebreak, not scoring player set/match point, so opponent needs to have at least 6 points, with a 1 point advantage

                    if ($scope.tennisScore['set' + opponent] == ($scope.tennisOptions.maxSets - 1)/2) {
                        $scope.tennisScore.gamePoint = "Match Point";
                    } else {
                        $scope.tennisScore.gamePoint = "Set Point";
                    }

                } else {
                    // tiebreak, point isn't special, so no message needed

                    $scope.tennisScore.gamePoint = "";

                }

            } else if ($scope.tennisScore['game' + player] >= 5 && ($scope.tennisScore['game' + player] - $scope.tennisScore['game' + opponent]) >= 1 && $scope.tennisScore['point' + player] >= 3 && ($scope.tennisScore['point' + player] - $scope.tennisScore['point' + opponent]) >= 1) {
                // normal game, so scoring player needs to have at least 5 games, with a 1 game advantage; and at least 40, with a 1 point advantage

                if ($scope.tennisScore['set' + player] == ($scope.tennisOptions.maxSets - 1)/2) {
                    $scope.tennisScore.gamePoint = "Match Point";
                } else {
                    $scope.tennisScore.gamePoint = "Set Point";
                }

                // check if this is also break point and increment
                if ($scope.tennisScore.server != player) {
                    $scope.tennisScore['breakPoint' + player] ++;
                }

            } else if ($scope.tennisScore['game' + opponent] >= 5 && ($scope.tennisScore['game' + opponent] - $scope.tennisScore['game' + player]) >= 1 && $scope.tennisScore['point' + opponent] >= 3 && ($scope.tennisScore['point' + opponent] - $scope.tennisScore['point' + player]) >= 1) {
                // normal game, not scoring player set/match point, so opponent needs to have at least 5 games, with a 1 game advantage; and at least 40, with a 1 point advantage

                if ($scope.tennisScore['set' + opponent] == ($scope.tennisOptions.maxSets - 1)/2) {
                    $scope.tennisScore.gamePoint = "Match Point";
                } else {
                    $scope.tennisScore.gamePoint = "Set Point";
                }
				
                // check if this is also break point and increment
                if ($scope.tennisScore.server != opponent) {
                    $scope.tennisScore['breakPoint' + opponent] ++;
                }
              
            } else if ($scope.tennisScore.server != player && $scope.tennisScore['point' + player] >= 3 && ($scope.tennisScore['point' + player] - $scope.tennisScore['point' + opponent]) >= 1) {
                // normal game, not a set/match point, so player needs be against the serve, have at least 40, with a 1 point advantage

                $scope.tennisScore.gamePoint = "Break Point";
                $scope.tennisScore['breakPoint' + player] ++;

            } else if ($scope.tennisScore.server != opponent && $scope.tennisScore['point' + opponent] >= 3 && ($scope.tennisScore['point' + opponent] - $scope.tennisScore['point' + player]) >= 1) {
                // normal game, not scoring player set/match point, so opponent needs be against the serve, have at least 40, with a 1 point advantage

                $scope.tennisScore.gamePoint = "Break Point";
                $scope.tennisScore['breakPoint' + opponent] ++;

            } else {
                // normal game, point isn't special, so no message needed

                $scope.tennisScore.gamePoint = "";

            }
        }

        $scope.undoPoint = function() {
            socket.emit("tennis:undo");
            $scope.tennisOptions.disableInput = false;
        }

        function getTennisData() {
            socket.emit("tennis:get");
        }

        $scope.resetAll = function() {
            socket.emit("tennis:reset");
            $("input[type='checkbox']").attr("checked", false);
        }
		
    }
]);

app.controller('netballCGController', ['$scope', 'localStorageService', 'socket',
    function($scope, localStorageService, socket){
        var storedLancs = localStorageService.get('lancs_netball');
        var storedYork = localStorageService.get('york_nettball');

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

        socket.on("netball", function (msg) {
            $scope.netball = msg;
            $scope.menu.forEach(item => {
                if (item.name === 'Netball') {
                    item.live = $scope.netball.show
                }
            })
        });

        $scope.quarterChanged = function() {
            console.log("Quarter");
        };

        $scope.$watch('netball', function() {
            if ($scope.netball) {
                socket.emit("netball", $scope.netball);
            } else {
                getNetballData();
            }
        }, true);

        $scope.$on("$destroy", function() {
            localStorageService.set('york_netball', $scope.yorksPlayers);
            localStorageService.set('lancs_netball', $scope.lancsPlayers);
        });

        function getNetballData() {
            socket.emit("netball:get");
            socket.emit("clock:get");
        }
    }
]);
