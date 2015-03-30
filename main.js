$(function() {

  var rows = 5;
  var cols = 8;
  var $hexRow = '';//$('<div class='></div>;

  for (var row=0; row<rows; row++) {
    $hexRow = $('<div class="hex-row row' + row + '"></div>');
    for (var col=0; col<cols; col++) {
      var evenClass = '';
      if (col % 2 === 1)
        evenClass = ' even'
      $hexRow.append('<div class="hex' + evenClass + '" id="' + row + col + '">' +
                     '<div class="hexLeft"></div>' +
                     '<div class="hexCenter"></div>' +
                     '<div class="hexRight"></div>' +
                     '</div>');
    }
    $('#gameBoard').append($hexRow);
  }

  colorHex('11', 'orange');
  for (var i=0; i<6; i++) {
    
  }

});


function colorHex(id, color) {
  $('#' + id + ' .hexLeft').css('border-right-color', color);
  $('#' + id + ' .hexCenter').css('background-color', color);
  $('#' + id + ' .hexRight').css('border-left-color', color);
}


// <div class='hex-row'>
//   <div class='hex'>
//     <div class='hexLeft'></div>
//     <div class='hexCenter'></div>
//     <div class='hexRight'></div>
//   </div>
//   <div class='hex even'>
//     <div class='hexLeft'></div>
//     <div class='hexCenter'></div>
//     <div class='hexRight'></div>
//   </div>
//   <div class='hex'>
//     <div class='hexLeft'></div>
//     <div class='hexCenter'></div>
//     <div class='hexRight'></div>
//   </div>
// </div>

