'use strict';

var transpose = require('../transpose.js');



exports.t = {
	setUp: function(done) {
    	// setup here if necessary
    	done();
  	},
  	transpose_chord : function (test) {
  		test.expect(34);
  		var index = { 
    		"A" : "Bb", "A#" : "B", "Bb" : "B", "B" : "C", "C" : "C#", "C#"	: "D", "Db" : "D",
    		"D"	: "Eb", "D#" : "E", "Eb" : "E", "E" : "F", "F" : "F#", "F#"	: "G", "Gb": "G",
    		"G"	: "G#", "G#" : "A", "Ab" : "A"}
  		for (var p in index) { 			
        	var n = transpose.transpose(p, 1);
			test.ok(n);
			test.equal(n, index[p]);     // 1 ligne
        }
        test.done();
  	},
  	transpose_chord_reverse : function (test) {
  		test.expect(34);
  		var index = { 
    		"A" : "G#", "A#" : "A", "Bb" : "A", "B" : "Bb", "C" : "B", "C#"	: "C", "Db" : "C",
    		"D"	: "C#", "D#" : "D", "Eb" : "D", "E" : "Eb", "F" : "E", "F#"	: "F", "Gb": "F",
    		"G"	: "F#", "G#" : "G", "Ab" : "G"}
  		for (var p in index) { 			
        	var n = transpose.transpose(p, -1);
			test.ok(n);
			test.equal(n, index[p]);     // 1 ligne
        }
        test.done();
  	}
}
