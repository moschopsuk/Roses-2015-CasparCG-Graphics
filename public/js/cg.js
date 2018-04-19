var app = angular.module('cgApp', ['ngAnimate', 'socket-io']);

app.controller('lowerThirdsCtrl', ['$scope', 'socket',
    function($scope, socket){
        $scope.showLeft = false;

        socket.on("lowerthird:hideall", function (msg) {
            $scope.showLeft = false;
            $scope.showRight = false;
            $scope.showFull = false;
        });

        socket.on("lowerthird:hidefull", function (msg) {
            $scope.showFull = false;
        });

        socket.on("lowerthird:hideleft", function (msg) {
            $scope.showLeft = false;
        });

        socket.on("lowerthird:hideright", function (msg) {
            $scope.showRight = false;
        });

        socket.on("lowerthird:left", function (msg) {
            if($scope.showLeft) {
                $scope.showLeft = false;
            }
            $scope.left = msg;
            $scope.showLeft = true;
        });

        socket.on("lowerthird:right", function (msg) {
            if($scope.showRight) {
                $scope.showRight = false;
            }
            $scope.right = msg;
            $scope.showRight = true;
        });

        socket.on("lowerthird:full", function (msg) {
            if($scope.showFull) {
                $scope.showFull = false;
            }
            $scope.full = msg;
            $scope.showFull = true;
        });
    }
]);

app.controller('archeryCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("archery", function (msg) {
            $scope.archery = msg;
        });
    }
]);

app.controller('boxingCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("boxing", function (msg) {
            $scope.boxing = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('boxing', function() {
            if (!$scope.boxing) {
                getBoxingData();
            }
        }, true);

        function getBoxingData() {
            socket.emit("boxing:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('bugCtrl', ['$scope', '$timeout', 'socket',
    function($scope, $timeout, socket){
        $scope.tickInterval = 1000; //ms

        socket.on("bug", function (state) {
            $scope.state = state;
        });

        $scope.$watch('bug', function() {
            if (!$scope.bug) {
                getBugData();
            }
        }, true);

		socket.on("bug", function (msg) {
            $scope.bug = msg;
        });

        function getBugData() {
            socket.emit("bug:get");
        };

        var tick = function () {
            $scope.clock = Date.now(); // get the current time
            $timeout(tick, $scope.tickInterval); // reset the timer
        };

        // Start the timer
        $timeout(tick, $scope.tickInterval);
    }
]);

app.controller('scoringCtrl', ['$scope', '$interval', '$http', 'socket',
    function($scope, $interval, $http, socket){
        $scope.tickInterval = 5000;
        $scope.yorkScore = "";
        $scope.lancScore = "";

        var fetchScore = function () {
          var config = {headers:  {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          };

          $http.get('https://roseslive.co.uk/score.json', config)
            .success(function(data) {
              if(isNaN(data.york) || isNaN(data.lancs)){
                console.log("Roses live is giving us nonsense");
                return;
              };
              if(!$scope.manualScore){
                $scope.yorkScore = data.york;
                $scope.lancScore = data.lancs;
              };
                socket.emit('lancScore', data.lancs);
                socket.emit('yorkScore', data.york);
            }
          );
        };

        socket.on("score", function (state) {
            $scope.showScore = state.showScore;
            $scope.manualScore = state.manualScore;
            $scope.showProgress = state.showProgress;
            if(state.manualScore){
              $scope.yorkScore = state.yorkScore;
              $scope.lancScore = state.lancScore;
            };
			if(state.totalPoints){
                $scope.pointsToWin = ((state.totalPoints / 2 ) + 0.5)
            } else {
                $scope.pointsToWin = 177.5;
            }
			$scope.yorkProgress = (($scope.yorkScore / $scope.pointsToWin)*100).toFixed(2);
			$scope.lancProgress = (($scope.lancScore / $scope.pointsToWin)*100).toFixed(2);
            $scope.pointsToWin = $scope.pointsToWin.toFixed(1);
        });

        $scope.$watch('score', function() {
            if (!$scope.score) {
                getScoreData();
            }
        }, true);

        function getScoreData() {
            socket.emit("score:get");
        }

        //Intial fetch
        fetchScore();
        // Start the timer
        $interval(fetchScore, $scope.tickInterval);
    }
]);

app.controller('footballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("football", function (msg) {
            $scope.football = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('football', function() {
            if (!$scope.football) {
                getFootballData();
            }
        }, true);

        function getFootballData() {
            socket.emit("football:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('rugbyCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("rugby", function (msg) {
            $scope.rugby = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('rugby', function() {
            if (!$scope.rugby) {
                getRugbyData();
            }
        }, true);

        function getRugbyData() {
            socket.emit("rugby:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('dartsCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("dart", function (msg) {
            $scope.darts = msg;
        });

        $scope.$watch('dart', function() {
            if (!$scope.dart) {
                getDartData();
            }
        }, true);

        function getDartData() {
            socket.emit("dart:get");
        }
    }
]);

app.controller('gridCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("grid", function (payload) {
            if (payload === "hide") {
                $scope.show = false;
            } else {
                $scope.show = true;
                $scope.grid = payload;
            }
        });
    }
]);

app.controller('swimmingCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("swimming", function (msg) {
            $scope.swimming = msg;
        });

        $scope.clockMin = "0";
        $scope.clockSec = "00";
        $scope.clockDec = "0";

        socket.on("clock:tick", function (msg) {
            $scope.clockMin = msg.slice(0,msg.indexOf(":")).replace(/^0/, '');
            $scope.clockSec = msg.slice(msg.indexOf(":")+1,msg.indexOf("."));
            $scope.clockDec = msg.slice(msg.indexOf(".")+1);
        });

        $scope.$watch('swimming', function() {
            if (!$scope.swimming) {
                getSwimmingData();
            }
        }, true);

        function getSwimmingData() {
            socket.emit("swimming:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('basketballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("basketball", function (msg) {
            $scope.basketball = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('basketball', function() {
            if (!$scope.basketball) {
                getBasketballData();
            }
        }, true);

        function getBasketballData() {
            socket.emit("basketball:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('badmintonCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("badminton", function (msg) {
            $scope.badminton = msg;
        });

        $scope.$watch('badminton', function() {
            if (!$scope.badminton) {
                getBadmintonData();
            }
        }, true);

        function getBadmintonData() {
            socket.emit("badminton:get");
        }
    }
]);

app.controller('tennisCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("tennisOptions", function (msg) {
            $scope.tennisOptions = msg;
        });

        socket.on("tennisScore", function (msg) {
            $scope.tennisScore = msg;
        });

        $scope.$watch('tennisOptions', function() {
            if (!$scope.tennisScore) {
                getTennisData();
            }
        }, true);

        $scope.$watch('tennisScore', function() {
            if (!$scope.tennisScore) {
                getTennisData();
            }
        }, true);

        function getTennisData() {
            socket.emit("tennis:get");
        }
    }
]);

app.controller('netballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("netball", function (msg) {
            $scope.netball = msg;

            if ($scope.netball.firstpasslanc == true) {
            	$scope.netball.lancoffset = 1;
            }

            if ($scope.netball.firstpasslanc == true & $scope.netball.firstpassyork == true) {
            	$scope.netball.lancoffset = 0;
            }

            $scope.TotalScore = $scope.netball.yorkScore + $scope.netball.lancScore + $scope.netball.lancoffset;
			if (($scope.TotalScore % 2) == 1) {
						$scope.showcurrentlancs = true;
						$scope.showcurrentyork = false;
				} else {
						$scope.showcurrentlancs = false;
						$scope.showcurrentyork = true;
					}
			});

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('netball', function() {
            if (!$scope.netball) {
                getNetballData();
            }
        }, true);

        function getNetballData() {
            socket.emit("netball:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('waterpoloCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("waterpolo", function (msg) {
            $scope.waterpolo = msg;
			});

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('waterpolo', function() {
            if (!$scope.waterpolo) {
                getWaterpoloData();
            }
        }, true);

        function getWaterpoloData() {
            socket.emit("waterpolo:get");
            socket.emit("clock:get");
        }
    }
]);
