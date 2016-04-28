var app = angular.module('cgApp', ['ngAnimate', 'socket-io']);

app.controller('lowerThirdsCtrl', ['$scope', 'socket',
    function($scope, socket){
        $scope.showLeft = false;

        socket.on("lowerthird:hide", function (msg) {
            $scope.showLeft = false;
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
        };
    }
]);

app.controller('bugCtrl', ['$scope', '$timeout', 'socket',
    function($scope, $timeout, socket){
        $scope.tickInterval = 1000; //ms

        socket.on("bug", function (state) {
            $scope.state = state;
        });

        $scope.$watch('bug', function() {
            if (!$scope.state) {
                getBugData();
            }
        }, true);

        function getBugData() {
            socket.emit("bug:get");
        };

        var tick = function () {
            $scope.clock = Date.now() // get the current time
            $timeout(tick, $scope.tickInterval); // reset the timer
        }

        // Start the timer
        $timeout(tick, $scope.tickInterval);
    }
]);

app.controller('scoringCtrl', ['$scope', '$timeout', '$http', 'socket',
    function($scope, $timeout, $http, socket){
        $scope.tickInterval = 5000;
        $scope.yorkScore = "";
        $scope.lancScore = "";

        var fetchScore = function () {
            $http.get('http://roseslive.co.uk/score.json')
                .success(function(data) {
                    $scope.yorkScore = data.york;
                    $scope.lancScore = data.lancs;
                }
            );
        }

        socket.on("score", function (state) {
            console.log(state);
            $scope.showScore = state.showScore;
        });

        $scope.$watch('score', function() {
            if (!$scope.score) {
                getScoreData();
            }
        }, true);

        function getScoreData() {
            socket.emit("score:get");
        };

        //Intial fetch
        fetchScore();
        // Start the timer
        $timeout(fetchScore, $scope.tickInterval);
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
        };
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
        };
    }
]);

app.controller('gridCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("grid", function (payload) {
            if (payload === "hide") {
                //We first remove every element with a delay
                $scope.grid = {};
                $scope.show = false;
            } else {
                $scope.show = true;
                $scope.grid = payload;
            }
        });
    }
])

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
        };
    }
]);
