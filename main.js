requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '.',
    paths: {
        grid: 'grid',
        jquery: 'components/jquery/jquery',
        chords: 'jquery.chords',
        diagram: 'jquery.diagram'
    }
});


requirejs(["chords","diagram"],function() {
	 $(document).ready(function() {
     	$(".chords").chords();
     	$(".diagram").diagram();
     });    
});