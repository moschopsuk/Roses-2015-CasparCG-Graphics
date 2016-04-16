var express 	= require('express'), 
	http 		= require('http'),
	Stopwatch 	= require('./models/stopwatch');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var swimming = {order: ''};

//Clock Functions
var stopwatch = new Stopwatch();

stopwatch.on('tick:stopwatch', function(time) {
	io.sockets.emit("clock:tick", time);
});



io.on('connection', function(socket) {
	console.log("Client Socket Connected");

	/*
	 * 		Clock functions
	 */
	socket.on("clock:pause", function() {
		stopwatch.pause();
	});

	socket.on("clock:reset", function() {
		stopwatch.reset();
	});

	socket.on("clock:up", function() {
		stopwatch.countUp();
	});

	socket.on("clock:down", function() {
		stopwatch.countDown();
	});	

	socket.on("clock:set", function(msg) {
		stopwatch.setValue(msg);
	});
    
    socket.on("clock:get", function() {
        io.sockets.emit("clock:tick", stopwatch.getTime());
    });


	/*
	 * 		General Functions
	 */
	socket.on("bug", function(msg) {
		io.sockets.emit("bug", msg);
	});

	/*
	 * 		Lower Thirds
	 */ 
	socket.on("lowerthird:left", function(msg) {
		io.sockets.emit("lowerthird:left", msg);
	});

	socket.on("lowerthird:right", function(msg) {
		io.sockets.emit("lowerthird:right", msg);
	});

	socket.on("lowerthird:hide", function() {
		io.sockets.emit("lowerthird:hide");
	});

	/*
	 * 		Boxing
	 */
	socket.on("boxing", function(msg) {
		io.sockets.emit("boxing", msg);
	});

	/*
	 * 		Score
	 */
	 socket.on("score", function(msg) {
		io.sockets.emit("score", msg);
	});

	 /*
	 * 		Score
	 */
	 socket.on("football", function(msg) {
		io.sockets.emit("football", msg);
	});


	/*
	 * 		Darts
	 */
	 socket.on("dart", function(msg) {
		io.sockets.emit("dart", msg);
	});
    
    /*
	 * 		Swimming
	 */
	socket.on("swimming", function(msg) {
        swimming = msg;
        
        swimming.order = (swimming.order).replace(/[^1-8]+/, '');
        swimming.order = (swimming.order).replace(/(.).*\1/, function (x) {return x.substring(0, x.length - 1)})
        
        if(!('pos1name' in swimming) && swimming.order != '') {
            swimming.splittime = stopwatch.getTime().replace(/^0/, '');
        }
        
        for(i = 1; i <= 8; i++){
            swimming['pos' + i + 'name'] = eval('swimming.lane' + (swimming.order).charAt(i-1) + 'name');
            swimming['pos' + i + 'team'] = eval('swimming.lane' + (swimming.order).charAt(i-1) + 'team');
        }
        
		io.sockets.emit("swimming", msg);
	});
    
    socket.on("swimming:get", function(msg) {
        io.sockets.emit("swimming", swimming);
    });
});

//Serve the puplic dir
app.use(express.static(__dirname + "/public"));

server.listen(3000);
console.log("Now listening on port 300. Go to localhost:3000/admin to control")
console.log("run 'play 1-1 [html] http://127.0.0.1:3000' in CasparCG to start the graphics")
