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
            icon: 'list layout'
        });

        $scope.menu.push({
            name: 'Grid',
            url: '/grid',
            type: 'link',
            icon: 'grid layout',
        });

        $scope.menu.push({
            name: 'Roses',
            url: '/roses',
            type: 'link',
            icon: 'trophy',
        });

        $scope.menu.push({
            name: 'Boxing',
            url: '/boxing',
            type: 'link',
            icon: 'users',
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
            icon: 'bullseye',
        });

        $scope.menu.push({
            name: 'Swimming',
            url: '/swimming',
            type: 'link',
            icon: 'life ring',
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
                templateUrl: '/partials/general.tmpl.html',
                controller: 'generalCGController'
            })
            .when("/lowerThirds", {
                templateUrl: '/partials/lowerThirds.tmpl.html',
                controller: 'lowerThirdsCGController'
            })
            .when("/boxing", {
                templateUrl: '/partials/boxing.tmpl.html',
                controller: 'boxingCGController'
            })
            .when("/roses", {
                templateUrl: '/partials/roses.tmpl.html',
                controller: 'rosesCGController'
            })
            .when("/football", {
                templateUrl: '/partials/football.tmpl.html',
                controller: 'footballCGController'
            })
            .when("/darts", {
                templateUrl: '/partials/darts.tmpl.html',
                controller: 'dartsCGController'
            })
            .when("/swimming", {
                templateUrl: '/partials/swimming.tmpl.html',
                controller: 'swimmingCGController'
            })
            .when("/grid", {
                templateUrl: '/partials/grid.tmpl.html',
                controller: 'gridCGController'
            })
            .otherwise({redirectTo: '/general'});
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

app.controller('gridCGController', ['$scope', 'socket',
function($scope, socket){
  $scope.grid = {};
  $scope.grid.rows = [];
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


}])

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


app.controller('footballCGController', ['$scope', 'socket',
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

            if(newScore > 0) {
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

            if(newScore > 0) {
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
        }

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
