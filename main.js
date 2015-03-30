$(function() {

  var rows = 9;
  var cols = 8;
  var $hexRow = '';

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
    $('.highlight').removeClass('highlight');
    $('.leftTriHighlight').removeClass('leftTriHighlight');
    $('.rightTriHighlight').removeClass('rightTriHighlight');
    $('.centerRectHighlight').removeClass('centerRectHighlight');
    highlightSurrounding(id, 3);
    // $(this).addClass('picked');
  });

});

function highlightSurrounding(id, moves) {
  if (moves > 0) {
    if (id.slice(-1) % 2 === 1)
      highlightForOddId(id, moves);
    else
      highlightForEvenId(id, moves);
  }
}

function highlightForOddId(id, moves) {
  var row = id.split('')[0];
  var col = id.split('')[1];

  console.log((parseInt(row)-1) + col);
  console.log((parseInt(row)+1) + col);
  console.log(row + (parseInt(col)-1));
  console.log(row + (parseInt(col)+1));
  console.log((parseInt(row)+1) + '' + (parseInt(col)-1));
  console.log((parseInt(row)+1) + '' + (parseInt(col)+1));

  highlightSurrounding((parseInt(row)-1) + col, moves-1);
  highlightSurrounding((parseInt(row)+1) + col, moves-1);
  highlightSurrounding(row + (parseInt(col)-1), moves-1);
  highlightSurrounding(row + (parseInt(col)+1), moves-1);
  highlightSurrounding((parseInt(row)+1) + '' + (parseInt(col)-1), moves-1);
  highlightSurrounding((parseInt(row)+1) + '' + (parseInt(col)+1), moves-1);

  colorHex((parseInt(row)-1) + col, 'blue');    // up
  colorHex((parseInt(row)+1) + col, 'blue');    // down
  colorHex(row + (parseInt(col)-1), 'blue');    // left-up
  colorHex(row + (parseInt(col)+1), 'blue');    // right-up
  colorHex((parseInt(row)+1) + '' + (parseInt(col)-1), 'blue');     // left-down
  colorHex((parseInt(row)+1) + '' + (parseInt(col)+1), 'blue');     // right-down
}

function highlightForEvenId(id, moves) {
  var row = id.split('')[0];
  var col = id.split('')[1];
  highlightSurrounding((parseInt(row)-1) + col, moves-1);
  highlightSurrounding((parseInt(row)+1) + col, moves-1);
  highlightSurrounding((parseInt(row)-1) + '' + (parseInt(col)-1), moves-1);
  highlightSurrounding((parseInt(row)-1) + '' + (parseInt(col)+1), moves-1);
  highlightSurrounding(row + (parseInt(col)-1), moves-1);
  highlightSurrounding(row + (parseInt(col)+1), moves-1);

  colorHex((parseInt(row)-1) + col, 'blue');    // up
  colorHex((parseInt(row)+1) + col, 'blue');    // down
  colorHex((parseInt(row)-1) + '' + (parseInt(col)-1), 'blue');     // left-down
  colorHex((parseInt(row)-1) + '' + (parseInt(col)+1), 'blue');     // right-down
  colorHex(row + (parseInt(col)-1), 'blue');     // left-down
  colorHex(row + (parseInt(col)+1), 'blue');     // right-down
}

function colorHex(id, color) {
  $('#' + id).addClass('highlight');
  $('#' + id + ' .hexLeft').addClass('leftTriHighlight');
  $('#' + id + ' .hexRight').addClass('rightTriHighlight');
  $('#' + id + ' .hexCenter').addClass('centerRectHighlight');
  // $('#' + id + ' .hexLeft').css('border-right-color', color);
  // $('#' + id + ' .hexCenter').css('background-color', color);
  // $('#' + id + ' .hexRight').css('border-left-color', color);
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

