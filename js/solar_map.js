$( document ).ready(function() {
    drawToggle = $('#id_draw-toggle');    
    // When draw mode is enabled, disable dragging on map.
    drawToggle.click(function(){
        // alert('drawToggle clicked.')
        if (drawToggle.is(":checked")){
            window.map.setOptions({gestureHandling: 'none'});
        }
        else {
            window.map.setOptions({gestureHandling: 'auto'});
        }
    })

});