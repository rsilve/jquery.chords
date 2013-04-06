/* description: Parses end executes mathematical expressions. */


/* lexical grammar */
%lex

%%
[ \t]+                   /* skip whitespace */
\n+						return 'NEWLINE';
":"						return 'REPEAT'
"_"						return 'PLACEHOLDER'
"|"{1,2}				return 'BAR'
[ABCDEFG]				return 'NOTE';
[\dmMajdisuab\d\+\-\#°ø]+			return 'MODIFIER';
"/"						return 'BASE';
"X"						return 'EMPTY';
"%"						return 'SAME';
"@"						return 'PART';
"("						return 'LEFT_PARAN';
")"						return 'RIGHT_PARAN';
[\w]+					return 'TEXT';
[\#b]                   return 'ALITERATION'
<<EOF>>               	return 'EOF';

/lex

%start main 

%% /* language grammar */

main
	: /* empty */
	| NEWLINE main
	| lines 						{ return $1 }
	;

lines
	: line NEWLINE lines 			{ $3.unshift($1); $$ = $3 } 
	| line NEWLINE EOF   		    { $$ = [$1] }
	| line EOF   					{ $$ = [$1] }
	;

line
	: measures  		
	;

measures	
	: BAR measures					{ $$ = $2 }
	| measure_repeat BAR measures 	{ $3.unshift($1); $$ = $3 }
	| measure_repeat BAR       		{ $$ = [$1] } 
	| measure_repeat        		{ $$ = [$1] } 
	;

measure_repeat
	: REPEAT measure_repeat	{ $2.repeatLeft = true; $$ = $2 }
	| measure_part REPEAT	{ $1.repeatRight = true; $$ = $1 }
	| measure_part
	;

measure_part
	: PART LEFT_PARAN NOTE RIGHT_PARAN measure { $5.part = $3; $$ = $5 }
	| measure
	;
	
measure
	: EMPTY					{ $$ = { empty: true } }
	| SAME					{ $$ = { same: true } }
	| chords				
		%{
			
			var total = 0;
			$1.chords.forEach(function(c) {
				total += c.duration
			});	
			$1.chords.forEach(function(c) {
				c.duration = c.duration * 4 / total;
			});	
			
			var count = $1.chords.length;
			var duration  = $1.chords[0].duration;
			if (count == 1) {
            	$1.type = 1;
        	}
        	if (count == 2 && duration == 1) {
            	$1.type = 2;
        	}
        	if (count == 2 && duration == 2) {
            	$1.type = 3;
        	}
        	if (count == 2 && duration == 3) {
            	$1.type = 4;
        	}
        	if (count == 3 && duration == 1) {
            	$1.type = 5;
        	}
        	if (count == 3 && duration == 2) {
            	$1.type = 6;
        	}
        	if (count == 4) {
            	$1.type = 7;
        	}
		%}
	;
	
chords
	: chord chords			{ $2.chords.unshift( $1 ); $$ = $2 }
	| chord					{ $$ = { chords : [$1] } }
	;

chord
	: chord PLACEHOLDER		{ $1.duration ++; $$ = $1 }
	| chordname				{ $$ = { chord : $1, duration: 1} }
	;
	
chordname
	: NOTE MODIFIER BASE NOTE MODIFIER	{ $$ = $1 + $2 + $3 + $4 + $5 }
	| NOTE MODIFIER BASE NOTE 	{ $$ = $1 + $2 + $3 + $4 }
	| NOTE MODIFIER				{ $$ = $1 + $2 }
	| NOTE BASE NOTE MODIFIER   { $$ = $1 + $2 + $3 + $4 }
	| NOTE BASE NOTE		    { $$ = $1 + $2 + $3 }
	| NOTE 						{ $$ = $1 }
	;


