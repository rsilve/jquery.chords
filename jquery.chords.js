(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'grid'], factory);
    } else {
        // Browser globals
        factory(jQuery, parser);
    }
}(function($){
	
	function clear(canvas, ctx) {
		ctx.save();

		// Use the identity matrix while clearing the canvas
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Restore the transform
		ctx.restore();
	}
	
	function drawCallback(canvas, chords, landscape, size) {
    	var ctx;
    	
    	if (!canvas.getContext) {
        	canvas = G_vmlCanvasManager.initElement(canvas);
        }
        ctx = canvas.getContext('2d');
        	clear(canvas, ctx);
        	var w = size == "normal" ? 92 : 46;
        	var bounds = settingBounds(canvas, chords, w, landscape);
        	if (landscape) {
        		ctx.translate(bounds.height+2,0);
        		ctx.rotate(Math.PI/2);
        	} 
        	ctx.translate(1,1);
        	//console.log(chords);
        	ctx.strokeStyle = "#aaaaaa"
      		ctx.textBaseline = "middle";
    		ctx.textAlign = "center";
    		ctx.font = size == "normal" ? "11pt Arial" : "5pt Arial";
        	ctx.shadowOffsetX = 0;
		  	ctx.shadowOffsetY = 0;
		  	ctx.shadowBlur = 0;
  			drawGrid(ctx, chords, w);
      		ctx.shadowOffsetX = 0;
		  	ctx.shadowOffsetY = 0;
		  	ctx.shadowBlur = 2;
  			ctx.shadowColor = "rgba(255, 255, 255,1)";
  			ctx.fillStyle = "black"
      		writeChords(ctx, chords, w);
        
        	    /*	*/
    }
    
    function writeChords(ctx, lines, size) {
    	
    	var x = 0;
      	var y = 0;
      	
      	$.each(lines, function(index, measures) {
      		$.each(measures, function(index, measure) {
      			if (measure.same) {
      				writeChord(ctx, 1, [{chord: "%"}], x, y, size)
      			} else if (measure.empty) {
      				// do nothing
      			} else {
      				writeChord(ctx, measure.type, measure.chords, x, y, size);
      			}
        	    x += size;
      		})
      		y += size;
        	x = 0;
      	})
      
    }
    
    function writeChord(ctx, type, chords, x, y, size) {
		switch(type) {
			case 1 : 
				ctx.fillText(chords[0].chord, x+size/2, y+size/2);
				break;
			case 2 : 
				ctx.fillText(chords[0].chord, x+size/4, y+size/4);
				ctx.fillText(chords[1].chord, x+2*size/3, y+3*size/4);
				break;
			case 3 :
				ctx.fillText(chords[0].chord, x+size/3, y+size/4);
				ctx.fillText(chords[1].chord, x+2*size/3, y+3*size/4);
				break;
			case 4 : 
				ctx.fillText(chords[0].chord, x+size/3, y+size/4);
				ctx.fillText(chords[1].chord, x+3*size/4, y+3*size/4);
				break;
			case 5:
				ctx.fillText(chords[0].chord, x+size/4, y+size/4);
				ctx.fillText(chords[1].chord, x+3*size/4, y+size/4);
				ctx.fillText(chords[2].chord, x+size/2, y+3*size/4);
				break;
			case 6:
				ctx.fillText(chords[0].chord, x+size/2, y+size/4);
				ctx.fillText(chords[1].chord, x+size/4, y+3*size/4);
				ctx.fillText(chords[2].chord, x+3*size/4, y+3*size/4);
				break;
			case 7:
				ctx.fillText(chords[0].chord, x+size/4, y+size/4);
				ctx.fillText(chords[1].chord, x+3*size/4, y+size/4);
				ctx.fillText(chords[2].chord, x+size/4, y+3*size/4);
				ctx.fillText(chords[3].chord, x+3*size/4, y+3*size/4);
				break;	
			
			default:
			break;
		
		}
    }
    
    function drawGrid(ctx, lines, size) {
    	var x = 0;
      	var y = 0;
      	$.each(lines, function(index, measures) {
      		$.each(measures, function(index, measure) {
      			ctx.strokeRect(x,y,size,size);
        	    drawPart(ctx, measure.part, x, y, size/5);
        	    drawStartRepeat(ctx, measure.repeatLeft, x, y, size);
        	    drawEndRepeat(ctx, measure.repeatRight, x, y, size);
        	    drawStruct(ctx, measure.type, 
        	    	measure.repeatLeft ? x+3 : x, 
        	    	measure.repeatRight ? y+3 : y,  
        	    	size - (measure.repeatLeft ? 3 : 0) - (measure.repeatRight ? 3 : 0), size );
        		x += size;
      		})
      		y += size;
        	x = 0;
      	})
    }
    function drawPart(ctx, part, x, y, w) {
    	if (part != null) {
    		ctx.fillStyle = "#aaaaaa";
    		ctx.fillRect(x,y, w,w);
    	    ctx.fillStyle = "white";
      		ctx.fillText(part, x + w/2, y + w/2);
    	    
		}
    }
    
    function drawStartRepeat(ctx, repeat, x, y, size) {
    	if (repeat) {
    		ctx.beginPath();
			ctx.moveTo(x + 3, y);
			ctx.lineTo(x + 3, y+size);
			ctx.stroke();
			
			ctx.fillStyle = "#aaaaaa";
			ctx.moveTo(x+7, y+size/3);
			ctx.arc(x+7, y+size/3,2,0,Math.PI*2,true);
			ctx.moveTo(x+7, y+2*size/5);
			ctx.arc(x+7, y+3*size/5,2,0,Math.PI*2,true);
			ctx.fill();
		}
    }
    
    function drawEndRepeat(ctx, repeat, x, y, size) {
    	if (repeat) {
    		ctx.beginPath();
			ctx.moveTo(x + size - 3, y);
			ctx.lineTo(x + size - 3, y + size);
			ctx.stroke();
			ctx.fillStyle = "#aaaaaa";
			ctx.moveTo(x+ size - 7, y+size/3);
			ctx.arc(x+ size - 7, y+size/3,2,0,Math.PI*2,true);
			ctx.moveTo(x+ size -7, y+2*size/5);
			ctx.arc(x+ size -7, y+3*size/5,2,0,Math.PI*2,true);
			ctx.fill();
		}
    }
    function drawStruct(ctx, type, x, y, w,h) {
		switch(type) {
			case 1 : break;
			case 2 : 
				ctx.strokeRect(x,y,w/2,h/2);break;
				
			case 3 :
				ctx.beginPath();
				ctx.moveTo(x,y+h);
				ctx.lineTo(x+w, y);
				ctx.stroke();
				break;
			case 4 : 
				ctx.strokeRect(x+w/2,y+h/2,w/2,h/2);break;
				
			case 5 : 
				ctx.strokeRect(x,y,w/2,h/2);
				ctx.strokeRect(x+w/2,y,w/2,h/2);
				break;
			case 6 : 
				ctx.strokeRect(x,y+h/2,w/2,h/2);
				ctx.strokeRect(x+w/2,y+h/2,w/2,h/2);
				break;
			case 7 : 
				ctx.beginPath();
				ctx.moveTo(x+w/2,y);
				ctx.lineTo(x+w/2, y+h);
				ctx.moveTo(x,y+h/2);
				ctx.lineTo(x+w, y+h/2);
				ctx.stroke();break;
			default:
			break;
		
		}
    }
    
    function settingBounds(canvas, lines, size, landscape) {
    	var wattr = 0;
        var hattr = 0;
    	var x = 0;
        
        $.each(lines, function(index, measures) {
        	//console.log(measures);
        	hattr += size;
        	x = 0;
        	$.each(measures, function() {
        		x += size;
        	    wattr = Math.max(x, wattr);
        	})
        	
        });	    		
        
        if (landscape) {
        	if (canvas.getAttribute("width") < hattr+2)
        		canvas.setAttribute("width", hattr+2);
        	if (canvas.getAttribute("height") < wattr+2)
      			canvas.setAttribute("height", wattr+2);        
        } else {
        	if (canvas.getAttribute("width") < wattr+2)
        	canvas.setAttribute("width", wattr+2);
      		if (canvas.getAttribute("height") < hattr+2)
        	canvas.setAttribute("height", hattr+2);
      	}
      	return {"width" : wattr, "height" : hattr};
    }
    
    function drawCanvas(res, ul, landscape, size) {
    	var li = $('<li></li>');
    	var canva = document.createElement('canvas');
	    $(canva).attr('width',"0").attr("height","0");
	    li.append($(canva))
	    ul.append(li);
		drawCallback(canva, res, landscape, size)
    }
     
    
	
	 $.fn.chords = function(param) {
	 	
	 	return this.each(function() {
		  var $this = $(this);
		  
		  var settings = $.extend({
  			landscape : false,
      		size : "normal", // "small"
  		  }, param);	
  		  if (settings.json === undefined) {
  		  	settings.json = parser.parse($(this).text());
  		  }
		  drawCallback(this, settings.json, settings.landscape, settings.size);
	      return $(this);
		});
  	 };


}))
