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
                     '<div class="hexCenter">' + row + col + '</div>' +
                     '<div class="hexRight"></div>' +
                     '</div>');
    }
    $('#gameBoard').append($hexRow);
  }

  // colorHex('11', 'orange');

  $('.hex').on('click', function() {
    var id = $(this).attr('id');
    highlightSurrounding(id);
  });

});

function highlightSurrounding(id) {
  if (id % 2 === 1)
    highlightForOddId(id);
  else
    highlightForEvenId(id);
}

function highlightForOddId(id) {
  var row = id.split('')[0];
  var col = id.split('')[1];
  colorHex((parseInt(row)-1) + col, 'blue');    // up
  colorHex((parseInt(row)+1) + col, 'blue');    // down
  colorHex(row + (parseInt(col)-1), 'blue');    // left-up
  colorHex(row + (parseInt(col)+1), 'blue');    // right-up
  colorHex((parseInt(row)+1) + '' + (parseInt(col)-1), 'blue');     // left-down
  colorHex((parseInt(row)+1) + '' + (parseInt(col)+1), 'blue');     // right-down
}

function highlightForEvenId(id) {
  var row = id.split('')[0];
  var col = id.split('')[1];
  colorHex((parseInt(row)-1) + col, 'blue');    // up
  colorHex((parseInt(row)+1) + col, 'blue');    // down
  colorHex((parseInt(row)-1) + '' + (parseInt(col)-1), 'blue');     // left-down
  colorHex((parseInt(row)-1) + '' + (parseInt(col)+1), 'blue');     // right-down
  colorHex(row + (parseInt(col)-1), 'blue');     // left-down
  colorHex(row + (parseInt(col)+1), 'blue');     // right-down
}

function colorHex(id, color) {
  // $('.highlight').removeClass('highlight');
  // $('#' + id).addClass('highlight');
  $('#' + id + ' .hexLeft').css('border-right-color', color);
  $('#' + id + ' .hexCenter').css('background-color', color);
  $('#' + id + ' .hexRight').css('border-left-color', color);
}

// .hexLeft:hover {
//   /* height: 100px; */
//   float: left;
//   border-top: 52px solid transparent;
//   border-bottom: 52px solid transparent;
//   border-right: 30px solid yellow;
// }

// .hexCenter:hover {
//   float: left;
//   width: 60px;
//   height: 104px;
//   background-color: yellow;
// }

// .hexRight:hover {
//   float: left;
//   border-top: 52px solid transparent;
//   border-bottom: 52px solid transparent;
//   border-left: 30px solid yellow;
// }


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

