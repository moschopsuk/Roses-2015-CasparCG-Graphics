var util    = require('util'),
    events  = require('events')
    _       = require('underscore');

// ---------------------------------------------
// Constructor
// ---------------------------------------------
function Stopwatch() {
    if(false === (this instanceof Stopwatch)) {
        return new Stopwatch();
    }

    this.hour = 3600000;
    this.minute = 60000;
    this.second = 1000;
    this.decisecond = 100;
    this.time = 0;
    this.interval = undefined;
    this.setCountMode = "up";

    events.EventEmitter.call(this);

    // Use Underscore to bind all of our methods
    // to the proper context
    _.bindAll.apply(_, [this].concat(_.functions(this)));
};

// ---------------------------------------------
// Inherit from EventEmitter
// ---------------------------------------------
util.inherits(Stopwatch, events.EventEmitter);

// ---------------------------------------------
// Methods
// ---------------------------------------------
Stopwatch.prototype.start = function() {
    if (this.interval) {
        return;
    }

    console.log('Starting Stopwatch!');
    // note the use of _.bindAll in the constructor
    // with bindAll we can pass one of our methods to
    // setInterval and have it called with the proper 'this' value
    this.interval = setInterval(this.onTick, this.decisecond);
    this.emit('start:stopwatch');
};

Stopwatch.prototype.stop = function() {
    console.log('Stopping Stopwatch!');
    if (this.interval) {
        clearInterval(this.interval);
        this.interval = undefined;
        this.emit('stop:stopwatch');
    }
};

Stopwatch.prototype.pause = function() {
    console.log('Pause Stopwatch!');
    if (this.interval) {
        this.stop();
    } else {
        this.start();
    }
};

Stopwatch.prototype.countUp = function() {
    this.setCountMode = "up";
}

Stopwatch.prototype.countDown = function() {
    this.setCountMode = "down";
}

Stopwatch.prototype.setValue = function(val) {
    var pattern = /^(?:(?:(?:(\d+):)?(\d+):)?(\d+)(?:\.(\d))?)$/;
    var match = pattern.exec(val);
    if (!match) {
        // ignore invalid value
        return;
    }

    this.time = (this.hour * parseInt(match[1])||0) + (this.minute * parseInt(match[2])||0) + (this.second * parseInt(match[3])||0) + (this.decisecond * parseInt(match[4])||0);
    this.emit('tick:stopwatch', this.formatTime(this.time));
}

Stopwatch.prototype.reset = function() {
    console.log('Resetting Stopwatch!');
    this.time = 0;
    this.emit('tick:stopwatch', this.formatTime(this.time));
};

Stopwatch.prototype.onTick = function() {
    if (this.setCountMode === "down") {
        this.time = this.time - this.decisecond;
    } else {
        this.time += this.decisecond;
    }
    
    var formattedTime = this.formatTime(this.time);
    this.emit('tick:stopwatch', formattedTime);
    
    if (this.time <= 0) {
        this.stop();
    }
};

Stopwatch.prototype.formatTime = function(time) {
    var remainder = time,
        numHours,
        numMinutes,
        numSeconds,
        numDeciseconds,
        output = "";

    //numHours = String(parseInt(remainder / this.hour, 10));
    //remainder -= this.hour * numHours;
    
    numMinutes = String(parseInt(remainder / this.minute, 10));
    remainder -= this.minute * numMinutes;
    
    numSeconds = String(parseInt(remainder / this.second, 10));
    remainder -= this.second * numSeconds;
    
    numDeciseconds = String(parseInt(remainder / this.decisecond, 10));
    
    output = _.map([numMinutes, numSeconds], function(str) {
        if (str.length === 1) {
            str = "0" + str;
        }
        return str;
    }).join(":");
    
    output = [output, numDeciseconds].join(".");

    return output;
};

Stopwatch.prototype.getTime = function() {
    return this.formatTime(this.time);
};

Stopwatch.prototype.isRunning = function() {
    return this.isTicking;
}

// ---------------------------------------------
// Export
// ---------------------------------------------
module.exports = Stopwatch;
