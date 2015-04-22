var TOP = 0;
var BOTTOM = 1;
function fadeToggleNametags(half) {
	//if(half) for(var x = 1; x < 12; x++) $("#nametag_" + x).fadeToggle();
	//else for(var x = 1; x < 12; x++) $("#2_nametag_" + x).fadeToggle();
	if(half) {
		$(".nametags .lanc").fadeToggle();
	} else {
		$(".nametags .york").fadeToggle();
	}
}

/* Wobble field for static cameras */
var wobbleTimer;	
var Zrotation = 0;
function wobbleField(startZ) {
$("#field").css("transition", '0s ease').css("-webkit-transition", '0s ease');
	wobbleStateNew = 0;
	Zrotation = 0;
	wobbleTimer = setInterval(function() {
		setMatrix3D(60, 0, Zrotation/100 + startZ, 1, 0, 0, 0);
		if(Zrotation < 70 && wobbleStateNew == 0) Zrotation++;
		else {
			wobbleStateNew = 1;
			Zrotation--;
		}
		if(Zrotation <= -70) wobbleStateNew = 0;
		
		
	}, 30);
}

/* Stop wobble. Clears interval and resets nametag rotations */
function stopWobble() {
	clearInterval(wobbleTimer);
	//for(var x = 1; x < 12; x++) $("#nametag_" + x).css('-webkit-transform', 'rotateZ(0deg)');
	$("#field").css("transition", '2s ease').css("-webkit-transition", '2s ease');
}

/* Return a 3D matrix (matrix3d) for CSS transformation */
function returnMatrix3D(rX, rY, rZ, scale, tX, tY, tZ) {
	var deg2rad, scale;
	deg2rad = Math.PI / 180; // Degrees to radians constant
	
	var rotationXMatrix, rotationYMatrix, rotationZMatrix, s, scaleMatrix, transformationMatrix, translationMatrix;
	rotationXMatrix = $M([
		[1, 0, 0, 0],
		[0, Math.cos(rX * deg2rad), Math.sin(-rX * deg2rad), 0],
		[0, Math.sin(rX * deg2rad), Math.cos(rX * deg2rad), 0],
		[0, 0, 0, 1]]);
	
	rotationYMatrix = $M([
		[Math.cos(rY * deg2rad), 0, Math.sin(rY * deg2rad), 0],
		[0, 1, 0, 0],
		[Math.sin(-rY * deg2rad), 0, Math.cos(rY * deg2rad), 0],
		[0, 0, 0, 1]]);
	
	rotationZMatrix = $M([
		[Math.cos(rZ * deg2rad), Math.sin(-rZ * deg2rad), 0, 0],
		[Math.sin(rZ * deg2rad), Math.cos(rZ * deg2rad), 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]]);
	
	
	s = scale;
	scaleMatrix = $M([[s, 0, 0, 0], [0, s, 0, 0], [0, 0, s, 0], [0, 0, 0, 1]]);
	
	transformationMatrix = rotationXMatrix.x(rotationYMatrix).x(rotationZMatrix).x(scaleMatrix);
	transformationMatrix = transformationMatrix.transpose();
	translationMatrix = $M([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [tX, tY, tZ, 1]]);
	transformationMatrix = transformationMatrix.x(translationMatrix); // Apply transformation matrix AFTER transposing rotation and scale
	
	s = "matrix3d(";
	s += transformationMatrix.e(1, 1).toFixed(5) + "," + transformationMatrix.e(1, 2).toFixed(5) + "," + transformationMatrix.e(1, 3).toFixed(5) + "," + transformationMatrix.e(1, 4).toFixed(5) + ",";
	s += transformationMatrix.e(2, 1).toFixed(5) + "," + transformationMatrix.e(2, 2).toFixed(5) + "," + transformationMatrix.e(2, 3).toFixed(5) + "," + transformationMatrix.e(2, 4).toFixed(5) + ",";
	s += transformationMatrix.e(3, 1).toFixed(5) + "," + transformationMatrix.e(3, 2).toFixed(5) + "," + transformationMatrix.e(3, 3).toFixed(5) + "," + transformationMatrix.e(3, 4).toFixed(5) + ",";
	s += transformationMatrix.e(4, 1).toFixed(5) + "," + transformationMatrix.e(4, 2).toFixed(5) + "," + transformationMatrix.e(4, 3).toFixed(5) + "," + transformationMatrix.e(4, 4).toFixed(5);
	s += ")";
	
	return s;
}

/* Apply a matrix3D transformation to the field */
function setMatrix3D(rX, rY, rZ, scl, tX, tY, tZ) {
	$("#field").css('-webkit-transform', returnMatrix3D(rX, rY, rZ, scl, tX, tY, tZ));
}


function rotate360() {
	$('#field').css('transition', '0s').css('-webkit-transition', '0s');
	rotationTimer = setInterval(function() {
		setMatrix3D(60, 0, Zrotation/100, 1, 0, 0, 0);
		if(Zrotation < 36000) Zrotation+=35;
		else {
			clearInterval(rotationTimer);
			Zrotation = 0;
			$('#field').css('transition', '2s').css('-webkit-transition', '2s');
		}
	}, 1);
}

function rotate360From180() {
	$('#field').css('transition', '0s').css('-webkit-transition', '0s');
	Zrotation = 18000;
	past_halfway = 0;
	rotationTimer = setInterval(function() {
		setMatrix3D(60, 0, Zrotation/100, 1, 0, 0, 0);
		Zrotation += 35;
		if(Zrotation >= 36000) {
			Zrotation = 0;
			past_halfway = 1; // crossed halfway flag
		}
		
		if(past_halfway == 1 && Zrotation >= 18000) {
			clearInterval(rotationTimer);
			Zrotation = 18000;
			$('#field').css('transition', '2s').css('-webkit-transition', '2s');
		}
	}, 1);
}

function unrevealField() {
	$("#field").css('-webkit-transform', 'rotateX(0deg) rotateY(0deg) rotateZ(180deg) scale(0.6)');
	setTimeout(function() {
		$("#field").css('-webkit-transform', 'rotateX(0deg) rotateY(0deg) rotateZ(180deg) scale(0)');
		setTimeout(function() {
			$('#field').hide();
		}, 3500);
	}, 3500);
}

function revealField() {
	$('#field').fadeIn("slow");
	$('#field').css('transition', '2s ease');
	$('#field').css('-webkit-transition', '2s ease');
}


function beginAnimation() {
	var waypoints = [
		["revealField()", 1000],
		["setMatrix3D(0, 0, 0, 1.5, 0, -200, 0)", 1110],
		["setMatrix3D(0, 0, 180, 1.5, 0, -200, 0)", 4110],
		["setMatrix3D(60, 0, 0, 1, 0, 0, 0)", 7110],

		["$('#top_logo').fadeToggle()", 7800],
		["fadeToggleNametags(BOTTOM)", 8500],					
		["wobbleField(0)", 9000],
		["stopWobble()", 20000],

		["fadeToggleNametags(BOTTOM)", 20000],
		["setMatrix3D(60, 0, 179.99, 1, 0, 0, 0)", 20800],
		["$('#bottom_logo').fadeToggle()", 21000],
		["$('#top_logo').fadeToggle()", 22000],
		["fadeToggleNametags(TOP)", 23000],
		["wobbleField(180)", 23500],
		["stopWobble()", 32000],

		["fadeToggleNametags(TOP)", 32000],
		["$('#bottom_logo').fadeToggle()", 34000],
		["unrevealField()", 33000]
	];
	setWaypoints(waypoints);

}

sum = 0;
var globalWaypointArray;
function setWaypoints(waypointArray) {
	execute = 0;
	globalWaypointArray = waypointArray;
	for(var x = 0; x < waypointArray.length; x++) {
		sum = waypointArray[x][1];		
		execute = waypointArray[x][0];
		setTimeout(execute, sum);
		
		(function(i, string) {
			setTimeout(function() {
				console.log(string);
			}, sum);
		})(x, waypointArray[x][0]);
	}
	
	console.log("Total Execution Time: " + sum);
}


/* Returns current rotateZ() angle of the field 
	rotateY() != +-90 */
function getZRotationFromMatrix() {

	var matrix = new WebKitCSSMatrix($('#field').css('-webkit-transform'));
	
	if(matrix.m31 != -1 && matrix.m31 != 1) {
		X1 = -Math.asin(matrix.m31);
		Y1 = Math.atan2( (matrix.m32/Math.cos(X1)) , (matrix.m33/Math.cos(X1)) );
		Z1 = Math.atan2( (matrix.m21/Math.cos(X1)) , (matrix.m11/Math.cos(X1)) );
	} else {
		console.log("FUCK ALL");
	}
	return -Z1 * (180/Math.PI);

}