$(function() {

  var rows = 9;
  var cols = 8;
  var $hexRow = '';

// create board
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

// set pieces for testing
  $('#42').addClass('gamePiece');
  $('#32').addClass('gamePiece');
  $('#33').addClass('gamePiece');
  $('#43').addClass('gamePiece');
  $('#23').addClass('gamePiece');
  $('#24').addClass('gamePiece');
  $('#25').addClass('gamePiece');
  $('#35').addClass('gamePiece');

// if user clicks on an open board space, highlighting possible moves (testing 3 slides)
  $('.hex').on('click', function() {
    if (!$(this).hasClass('gamePiece')) {
      var id = $(this).attr('id');
      $('#'+id).toggleClass('selected');
      $('.selected:not(#'+id+')').removeClass('selected');
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
  // if there are still moves left and piece attempting to highlight is not a gamepiece
  if (moves > 0 && !$('#'+id).hasClass('gamePiece')) {
    var isOdd = id.split('')[1] % 2 === 1;
    if (isAdjacentToHive(id, isOdd))
      highlighting(id, moves, isOdd);
  }
}


// attempts to highlight tile with given id, and call function to highlight surrounding tiles
function highlighting(id, moves, isOdd) {
  var canHighlight = adjacentTilesSlidable(id, isOdd);
  var row = id.split('')[0];
  var col = id.split('')[1];

  if (canHighlight[0]) { // up
    highlightSurrounding((parseInt(row)-1) + col, moves-1);
    colorHex((parseInt(row)-1) + col, 'blue');
  }
  if (canHighlight[3]) { // down
    highlightSurrounding((parseInt(row)+1) + col, moves-1);
    colorHex((parseInt(row)+1) + col, 'blue');
  }

  isOdd ? highlightForOddId(id, moves, canHighlight) : highlightForEvenId(id, moves, canHighlight);
}


function highlightForOddId(id, moves, canHighlight) {
  if ($('#'+id).hasClass('gamePiece')) return;
  var row = id.split('')[0];
  var col = id.split('')[1];

  if (canHighlight[1]) { // top-right
    highlightSurrounding(row + (parseInt(col)+1), moves-1);
    colorHex(row + (parseInt(col)+1), 'blue');
  }
  if (canHighlight[2]) { // bottom-right
    highlightSurrounding((parseInt(row)+1) + '' + (parseInt(col)+1), moves-1);
    colorHex((parseInt(row)+1) + '' + (parseInt(col)+1), 'blue');
  }
  if (canHighlight[4]) { // bottom-left
    highlightSurrounding((parseInt(row)+1) + '' + (parseInt(col)-1), moves-1);
    colorHex((parseInt(row)+1) + '' + (parseInt(col)-1), 'blue');
  }
  if (canHighlight[5]) { // top-left
    highlightSurrounding(row + (parseInt(col)-1), moves-1);
    colorHex(row + (parseInt(col)-1), 'blue');
  }
}


function highlightForEvenId(id, moves, canHighlight) {
  if ($('#'+id).hasClass('gamePiece')) return;
  var row = id.split('')[0];
  var col = id.split('')[1];

  if (canHighlight[1]) { // top-right
    highlightSurrounding((parseInt(row)-1) + '' + (parseInt(col)+1), moves-1);
    colorHex((parseInt(row)-1) + '' + (parseInt(col)+1), 'blue');
  }
  if (canHighlight[2]) { // bottom-right
    highlightSurrounding(row + (parseInt(col)+1), moves-1);
    colorHex(row + (parseInt(col)+1), 'blue');
  }
  if (canHighlight[4]) { // bottom-left
    highlightSurrounding(row + (parseInt(col)-1), moves-1);
    colorHex(row + (parseInt(col)-1), 'blue');
  }
  if (canHighlight[5]) { // top-left
    highlightSurrounding((parseInt(row)-1) + '' + (parseInt(col)-1), moves-1);
    colorHex((parseInt(row)-1) + '' + (parseInt(col)-1), 'blue');
  }
}


function colorHex(id) {//, color) {
  if ($('#'+id).hasClass('gamePiece') || $('#'+id).hasClass('selected')) return;
  var isOdd = id.split('')[1] % 2 === 1;

  // doesn't allow highlighting of tile if it isn't adjacent to hive
  if (isAdjacentToHive(id, isOdd)) {
    $('#' + id).addClass('highlight');
    $('#' + id + ' .hexLeft').addClass('leftTriHighlight');
    $('#' + id + ' .hexRight').addClass('rightTriHighlight');
    $('#' + id + ' .hexCenter').addClass('centerRectHighlight');
  }
}


function isAdjacentToHive(id, isOdd) {
  return isOdd ? oddIdIsAdjacentToHive(id) : evenIdIsAdjacentToHive(id);
}


// internal - only called from isAdjacentTohive()
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


// internal - only called from isAdjacentTohive()
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


// returns an array of the booleans representing if the immediate
// surrounding tiles' of the given tile id are unable to be slid to
// or not, starting from above current tile and proceding clockwise.
function adjacentTilesSlidable(id, isOdd) {
  var row = id.split('')[0];
  var col = id.split('')[1];
  var adjacentTiles;
  if (isOdd) {
    adjacentTiles = [
      $('#'+(row - 1 + col)).hasClass('gamePiece'),
      $('#'+(row + (+col + 1))).hasClass('gamePiece'),
      $('#'+((+row + 1) + '' + (+col + 1))).hasClass('gamePiece'),
      $('#'+((parseInt(row)+1) + col)).hasClass('gamePiece'),
      $('#'+((+row + 1) + '' + (col - 1))).hasClass('gamePiece'),
      $('#'+(row + (col - 1))).hasClass('gamePiece')
    ];
  } else {
    adjacentTiles = [
      $('#'+(row - 1 + col)).hasClass('gamePiece'),
      $('#'+((row - 1) + '' + (+col + 1))).hasClass('gamePiece'),
      $('#'+(row + (+col + 1))).hasClass('gamePiece'),
      $('#'+((parseInt(row)+1) + col)).hasClass('gamePiece'),
      $('#'+(row + '' + (col - 1))).hasClass('gamePiece'),
      $('#'+((row - 1) + '' + (col - 1))).hasClass('gamePiece')
    ];
  }
  return adjacentTilesSlidableInternal(adjacentTiles);
}


// takes array of booleans representing if adjacent tiles are gamepieces.
// returns an array representing if that adjacent tile can be slid to.
function adjacentTilesSlidableInternal(adjTiles) {
  return adjTiles.map(function(openTile, index, array) {
    var prev, next;
    if (index === 0) { prev = 5; next = index+1; }
    else if (index === 5) { prev = index-1; next = 0; }
    else { prev = index-1; next = index+1; }
    return (array[prev] && array[next]) ? false : true;
  });
}
