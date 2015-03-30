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

  $('#32').addClass('gamePiece');
  $('#22').addClass('gamePiece');
  $('#23').addClass('gamePiece');
  $('#33').addClass('gamePiece');
  $('#13').addClass('gamePiece');
  $('#14').addClass('gamePiece');
  $('#15').addClass('gamePiece');
  $('#25').addClass('gamePiece');

  $('.hex').on('click', function() {
    if (!$(this).hasClass('gamePiece')) {
      var id = $(this).attr('id');
      $('.highlight').removeClass('highlight');
      $('.leftTriHighlight').removeClass('leftTriHighlight');
      $('.rightTriHighlight').removeClass('rightTriHighlight');
      $('.centerRectHighlight').removeClass('centerRectHighlight');
      highlightSurrounding(id, 3);
      // $(this).addClass('picked');
    }
  });
});


function highlightSurrounding(id, moves) {
  if (moves > 0 && !$('#'+id).hasClass('gamePiece')) {
    if (id.slice(-1) % 2 === 1) {
    // doesn't allow pieces not next to the hive to be clicked
      if (oddIdIsAdjacentToHive(id)) {
        highlighting(id, moves, 'odd');
      }
    } else {
    // doesn't allow pieces not next to the hive to be clicked
      if (evenIdIsAdjacentToHive(id)) {
        highlighting(id, moves, 'even');
      }
    }
  }
}

function highlighting(id, moves, idEvenOdd) {
  var row = id.split('')[0];
  var col = id.split('')[1];

  highlightSurrounding((parseInt(row)-1) + col, moves-1);
  highlightSurrounding((parseInt(row)+1) + col, moves-1);
  highlightSurrounding(row + (parseInt(col)-1), moves-1);
  highlightSurrounding(row + (parseInt(col)+1), moves-1);

  colorHex((parseInt(row)-1) + col, 'blue');    // up
  colorHex((parseInt(row)+1) + col, 'blue');    // down
  colorHex(row + (parseInt(col)-1), 'blue');    // left-up
  colorHex(row + (parseInt(col)+1), 'blue');    // right-up

  (idEvenOdd === 'odd') ? highlightForOddId(id, moves) : highlightForEvenId(id, moves);
}

function highlightForOddId(id, moves) {
  var row = id.split('')[0];
  var col = id.split('')[1];

  highlightSurrounding((parseInt(row)+1) + '' + (parseInt(col)-1), moves-1);
  highlightSurrounding((parseInt(row)+1) + '' + (parseInt(col)+1), moves-1);
  colorHex((parseInt(row)+1) + '' + (parseInt(col)-1), 'blue');     // left-down
  colorHex((parseInt(row)+1) + '' + (parseInt(col)+1), 'blue');     // right-down
}

function highlightForEvenId(id, moves) {
  var row = id.split('')[0];
  var col = id.split('')[1];

  highlightSurrounding((parseInt(row)-1) + '' + (parseInt(col)-1), moves-1);
  highlightSurrounding((parseInt(row)-1) + '' + (parseInt(col)+1), moves-1);
  colorHex((parseInt(row)-1) + '' + (parseInt(col)-1), 'blue');     // left-down
  colorHex((parseInt(row)-1) + '' + (parseInt(col)+1), 'blue');     // right-down
}

function colorHex(id, color) {
  var row = id.split('')[0];
  var col = id.split('')[1];

  if ( ((col % 2 === 1) && oddIdIsAdjacentToHive(id)) || ((col % 2 ===0) && evenIdIsAdjacentToHive(id)) ) {
    $('#' + id).addClass('highlight');
    $('#' + id + ' .hexLeft').addClass('leftTriHighlight');
    $('#' + id + ' .hexRight').addClass('rightTriHighlight');
    $('#' + id + ' .hexCenter').addClass('centerRectHighlight');
  }
}

function oddIdIsAdjacentToHive(id) {
  var row = id.split('')[0];
  var col = id.split('')[1];

  return $('#'+(parseInt(row)-1) + col).hasClass('gamePiece') ||
  $('#'+(parseInt(row)+1) + col).hasClass('gamePiece') ||
  $('#'+row + (parseInt(col)-1)).hasClass('gamePiece') ||
  $('#'+row + (parseInt(col)+1)).hasClass('gamePiece') ||
  $('#'+(parseInt(row)+1) + '' + (parseInt(col)-1)).hasClass('gamePiece') ||
  $('#'+(parseInt(row)+1) + '' + (parseInt(col)+1)).hasClass('gamePiece');
}

function evenIdIsAdjacentToHive(id) {
  var row = id.split('')[0];
  var col = id.split('')[1];

  return $('#'+(parseInt(row)-1) + col).hasClass('gamePiece') ||
  $('#'+(parseInt(row)+1) + col).hasClass('gamePiece') ||
  $('#'+(parseInt(row)-1) + '' + (parseInt(col)-1)).hasClass('gamePiece') ||
  $('#'+(parseInt(row)-1) + '' + (parseInt(col)+1)).hasClass('gamePiece') ||
  $('#'+row + (parseInt(col)-1)).hasClass('gamePiece') ||
  $('#'+row + (parseInt(col)+1)).hasClass('gamePiece');
}
