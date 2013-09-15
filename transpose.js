var transpose = {
	transpose : function (chord, pos) {
    	if (chord === "%")
    		return chord;
    	if (! pos) 
    		return chord;
    	var index = { 
    		"A" : 0, "A#" : 1,  "B" : 2, "Bb" : 1,"C" : 3, "C#"	: 4, 
    		"D"	: 5, "Db" : 4, "D#" : 6,  "E" : 7, "Eb" : 6,"F" : 8, "F#": 9, 
    		"G"	: 10, "Gb": 9,"G#" : 11, "Ab" : 11}
    	var reverse = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#'];	
    	var c = chord;
    	for (var p in index) {
    		if (chord.indexOf(p) === 0) {
    			//console.log("Found "+p+" for "+ chord);
				var i = (index[p] + Number(pos)) % 12;
				if (i < 0) i += 12
				c =  chord.replace(p, reverse[i]);
    		} 
    	}	
    	return c;
 }   	
}

if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
	exports.transpose = transpose.transpose;
}