(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
	
	function drawCallback(canvas, diagram, landscape) {
    	//console.log(c);
    	var ctx;
    	
    	if (!canvas.getContext) {
        	canvas = G_vmlCanvasManager.initElement(canvas);
        }
        ctx = canvas.getContext('2d');
        	settingBounds(canvas,landscape);
        	if (landscape) {
        		ctx.translate(bounds.height+2,0);
        		ctx.rotate(Math.PI/2);
        	} 
        	ctx.translate(1,1);
        	//console.log(chords);
        	ctx.strokeStyle = "#aaaaaa"
        	
        	drawChord(ctx, diagram[0]);
        	drawOrigin(ctx, diagram[1]);
      		drawGrid(ctx);
      		for (i = 2; i < 8; i++) {
      			drawPoint(ctx, i-2, diagram[1], diagram[i]);
      		}
      		
    }
    
    var unit = 15;    	
   	var offsetX = 12;    	
   	var offsetY = 22;    	
   
    function settingBounds(canvas, landscape) {
    	var w=6*unit;
    	canvas.setAttribute("width", w+offsetX);
        canvas.setAttribute("height", w+offsetY);
    }
    
    function drawChord(ctx, chord) {
    	ctx.save();
    	
    	ctx.textBaseline = "top";
    	ctx.textAlign = "center";
    	ctx.font = "10pt Arial";
        ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 2;
  		ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
  		ctx.fillStyle = "black"
      	
    	ctx.fillText(chord, offsetX+5*unit/2, 0);
    	ctx.restore();
    }
       
	function drawOrigin(ctx, origin) {
    	ctx.save();
    	ctx.translate(0,offsetY);
    	ctx.textBaseline = "top";
    	ctx.textAlign = "left";
    	ctx.font = "10pt Arial";
        ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 2;
  		ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
  		ctx.fillStyle = "black"
      	
    	ctx.fillText(origin, 0, 0);
    	ctx.restore();
    }
       
    function drawGrid(ctx) {
		ctx.save();
		ctx.translate(offsetX,offsetY);
    	var x = 0;
      	var y = 0;
      	ctx.beginPath();
      	for (i = 0;i < 6; i++)  {
        	ctx.moveTo(x,y+i*unit);
        	ctx.lineTo(x+5*unit, y+i*unit);
        	ctx.moveTo(x+i*unit,y);
        	ctx.lineTo(x+i*unit,y+5*unit);
        	
        }
        ctx.stroke();
        ctx.restore();
    }
    
   function drawPoint(ctx, chord, origin, fret) {
 		ctx.save();
		ctx.translate(offsetX,offsetY);
    	var x = chord*unit;
   		if (fret == "x") {
   			var y = -6;
   			ctx.beginPath();
   			ctx.moveTo(x-4, -10);
   			ctx.lineTo(x+4, -2);
   			ctx.moveTo(x-4, -2);
   			ctx.lineTo(x+4, -10);
   			
   			ctx.stroke();
   		} else if (fret == "o") {
   			var y = -6;
   			ctx.beginPath();
    		ctx.arc(x,y, 4, 0, Math.PI*2,true);
        	ctx.stroke();
   		} else {
	    	var y = (fret-origin)*unit + unit/2;
      		ctx.beginPath();
    		ctx.arc(x,y, 4, 0, Math.PI*2,true);
        	ctx.fill();
        }
        ctx.restore();
    }
	
	var parse = function(text){
      	var d = text.split(":");
	var diag = [];
	diag[0] = d[0];
	diag[1] = d[1];
	d[2] = d[2].replace(/\|+/, "|");
	var pos = 2;
	while (d[2].length > 0) {
		d[2] = d[2].replace(/^\|/, "");
		var sep = d[2].indexOf("|")
		var extract_size = sep < 3 && sep > 0 ? sep : 1;
		if (pos === 7) {
			extract_size = d[2].length;
		}
		diag[pos] = d[2].substring(0, extract_size)
		d[2] = d[2].slice(extract_size);
		console.log(pos, sep, diag[pos], d[2])
		pos ++;
        }
      	
	return diag;
      }
      
	 $.fn.diagram = function() {
	 	
	 	return this.each(function(param) {
		  var $this = $(this);
		  
		  var settings = $.extend({
  			landscape : false,
      		json : parse($(this).text())
  		  }, param);	
		  drawCallback(this, settings.json, settings.landscape);
	      return $(this);
		});
  	 };


}))
