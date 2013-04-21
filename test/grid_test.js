'use strict';

var grid = require('../grid.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.jison = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  oneMeasureOneChord : function (test) {
        test.expect(6);
        var rows = grid.parse("A");
        
		test.ok(rows);
		test.equal(rows.length, 1);     // 1 ligne
		test.equal(rows[0].length, 1);  // 1 mesure
		test.equal(rows[0][0].chords.length, 1);  // 1 Accord
		test.equal(rows[0][0].chords[0].chord, "A"); 
		test.equal(rows[0][0].chords[0].duration, 4); 
		test.done();
  },
  oneMeasureSeveralChord : function (test) {
        test.expect(8);
        var rows = grid.parse("A B");
        
		test.ok(rows);
		test.equal(rows.length, 1);     // 1 ligne
		test.equal(rows[0].length, 1);  // 1 mesure
		test.equal(rows[0][0].chords.length, 2);  // 2 Accords
		test.equal(rows[0][0].chords[0].chord, "A"); 
		test.equal(rows[0][0].chords[0].duration, 2); 
		test.equal(rows[0][0].chords[1].chord, "B"); 
		test.equal(rows[0][0].chords[1].duration, 2); 
		test.done();
  },
  placeHolder : function (test) {
        test.expect(6);
        var rows = grid.parse("A _");
        
		test.ok(rows);
		test.equal(rows.length, 1);     // 1 ligne
		test.equal(rows[0].length, 1);  // 1 mesure
		test.equal(rows[0][0].chords.length, 1);  // 1 Accord
		test.equal(rows[0][0].chords[0].chord, "A"); 
		test.equal(rows[0][0].chords[0].duration, 4); 
		test.done();
  },
  bar : function (test) {
        test.expect(15);
        ["A", "|A", "A|", "|A|", "||A |"].forEach(function(g) {
        	var rows = grid.parse(g);
			test.ok(rows);
			test.equal(rows.length, 1);     // 1 ligne
			test.equal(rows[0].length, 1);  // 1 mesure
		});
		test.done();
  },
  barSeveralMesure : function (test) {
        test.expect(12);
        ["A | B", "|A | B", "A| B ", "|A|B|"].forEach(function(g) {
        	var rows = grid.parse(g);
			test.ok(rows);
			test.equal(rows.length, 1);     // 1 ligne
			test.equal(rows[0].length, 2);  // 2 mesure
		});
		test.done();
  },
  repeatLeft : function (test) {
        test.expect(6);
        var rows = grid.parse("|: A ");
        
		test.ok(rows);
		test.equal(rows.length, 1);     // 1 ligne
		test.equal(rows[0].length, 1);  // 1 mesure
		test.equal(rows[0][0].chords.length, 1);  // 1 Accord
		test.equal(rows[0][0].chords[0].chord, "A"); 
		test.ok(rows[0][0].repeatLeft); 
		test.done();
  },
  repeatRight : function (test) {
        test.expect(6);
        var rows = grid.parse("A :|");
        
		test.ok(rows);
		test.equal(rows.length, 1);     // 1 ligne
		test.equal(rows[0].length, 1);  // 1 mesure
		test.equal(rows[0][0].chords.length, 1);  // 1 Accord
		test.equal(rows[0][0].chords[0].chord, "A"); 
		test.ok(rows[0][0].repeatRight); 
		test.done();
  },
  part : function (test) {
        test.expect(8);
        var rows = grid.parse("@(C) A");
        
		test.ok(rows);
		test.equal(rows.length, 1);     // 1 ligne
		test.equal(rows[0].length, 1);  // 1 mesure
		test.equal(rows[0][0].chords.length, 1);  // 1 Accord
		test.equal(rows[0][0].chords[0].chord, "A");
		test.equal(rows[0][0].chords[0].duration, 4);  
		test.ok(rows[0][0].part); 
		test.equal(rows[0][0].part, "C"); 
		test.done();
  },
  allChordNames : function (test) {
        test.expect(14);
        ["A", "B", "C", "D", "E", "F", "G"].forEach ( function(c) {
        	var rows = grid.parse(c);
			test.ok(rows);
			test.equal(rows[0][0].chords[0].chord, c);
		}); 
		test.done();
  },
  allChordForm : function (test) {
        test.expect(42);
        ["A", "A#", "Ab", "Am", "A-sus2", "A-sus4", "Aadd9", "Am6",  
        "Am75b", "A-", "A+", "A75+", "Aø", "A°", 
        "FmMaj7",
        "A/G","A/G#","A/Gb", "Am/G", "Am/G#", "Am/Gb"].forEach ( function(c) {
        	var rows = grid.parse(c);
			test.ok(rows);
			test.equal(rows[0][0].chords[0].chord, c);
		}); 
		test.done();
  },
  measureType : function (test) {
        test.expect(14);
        [
        	{grid : "A", type : 1},
        	{grid : "A B _ _", type : 2},
        	{grid : "A B", type : 3},
        	{grid : "A _ _ B", type : 4},
        	{grid : "A B C _", type : 5},
        	{grid : "A _ B C ", type : 6},
        	{grid : "A B C D", type : 7},
        
        ].forEach ( function(c) {
        	var rows = grid.parse(c.grid);
			test.ok(rows);
			test.equal(rows[0][0].type, c.type);
		}); 
		test.done();
  },
  severalLine : function (test) {
        test.expect(10);
        var rows = grid.parse("A\nB");
        test.ok(rows);
		test.equal(rows.length, 2);     // 2 ligne
		test.equal(rows[0].length, 1);  // 1 mesure
		test.equal(rows[0][0].chords.length, 1);  // 1 Accord
		test.equal(rows[0][0].chords[0].chord, "A"); 
		test.equal(rows[0][0].chords[0].duration, 4); 
		
		test.equal(rows[1].length, 1);  // 1 mesure
		test.equal(rows[1][0].chords.length, 1);  // 1 Accord
		test.equal(rows[1][0].chords[0].chord, "B"); 
		test.equal(rows[1][0].chords[0].duration, 4); 
		test.done();
  },
   severalNewLine : function (test) {
        test.expect(2);
        var rows = grid.parse("A\n\nB\nB");
        test.ok(rows);
		test.equal(rows.length, 3);     // 3 ligne
		test.done();
  },
  
   beginWithNewLine : function (test) {
        test.expect(2);
        var rows = grid.parse("\nA\n\nB\nB");
        test.ok(rows);
		test.equal(rows.length, 3);     // 3 ligne
		test.done();
  },
  
  endWithNewLine : function (test) {
        test.expect(2);
        var rows = grid.parse("A\n\nB\nB\n");
        test.ok(rows);
		test.equal(rows.length, 3);     // 3 ligne
		test.done();
  },
  errorMessage : function (test) {
        test.expect(1);
        try {
        	var rows = grid.parse("A B A R");
		} catch(e) {
        	//console.log(e.message.split("\n").slice(0,3).join("\n"));
        	test.equal(1,1)
        }
        test.done();
  },

};
