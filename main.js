$(function() {

  let rows = 9;
  let cols = 8;
  let $hexRow = '';

// create board
  for (let row=0; row<rows; row++) {
    $hexRow = $('<div class="hex-row row' + row + '"></div>');
    for (let col=0; col<cols; col++) {
      let evenClass = '';
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
      let id = $(this).attr('id');
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
    let isOdd = id.split('')[1] % 2 === 1;
    if (isAdjacentToHive(id, isOdd))
      highlighting(id, moves, isOdd);
  }
}


// attempts to highlight tile with given id, and call function to highlight surrounding tiles
function highlighting(id, moves, isOdd) {
  let canHighlight = adjacentTilesSlidable(id, isOdd);
  let thisTileAdjPieces = findAdjacentPieceIds(id, isOdd);
  let row = id.split('')[0];
  let col = id.split('')[1];

  // check the tile directly above the chosen tile cuz for this doesn't matter if chosen tile is even or odd
  if (canHighlight[0] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds((row-1) + col, isOdd))) { // up
    highlightSurrounding((parseInt(row)-1) + col, moves-1);
    colorHex((parseInt(row)-1) + col, 'blue');
  }
  // check the tile directly below the chosen tile cuz for this doesn't matter if chosen tile is even or odd
  if (canHighlight[3] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds((+row + 1) + col, isOdd))) { // down
    highlightSurrounding((parseInt(row)+1) + col, moves-1);
    colorHex((parseInt(row)+1) + col, 'blue');
  }

  isOdd ? highlightForOddId(id, moves, canHighlight, thisTileAdjPieces) : highlightForEvenId(id, moves, canHighlight, thisTileAdjPieces);
}


function highlightForOddId(id, moves, canHighlight, thisTileAdjPieces) {
  if ($('#'+id).hasClass('gamePiece')) return;
  let row = id.split('')[0];
  let col = id.split('')[1];

  if (canHighlight[1] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds(row + (parseInt(col)+1), false))) { // top-right
    highlightSurrounding(row + (parseInt(col)+1), moves-1);
    colorHex(row + (parseInt(col)+1), 'blue');
  }
  if (canHighlight[2] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds((parseInt(row)+1) + '' + (parseInt(col)+1), false))) { // bottom-right
    highlightSurrounding((parseInt(row)+1) + '' + (parseInt(col)+1), moves-1);
    colorHex((parseInt(row)+1) + '' + (parseInt(col)+1), 'blue');
  }
  if (canHighlight[4] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds((parseInt(row)+1) + '' + (parseInt(col)-1), false))) { // bottom-left
    highlightSurrounding((parseInt(row)+1) + '' + (parseInt(col)-1), moves-1);
    colorHex((parseInt(row)+1) + '' + (parseInt(col)-1), 'blue');
  }
  if (canHighlight[5] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds(row + (parseInt(col)-1), false))) { // top-left
    highlightSurrounding(row + (parseInt(col)-1), moves-1);
    colorHex(row + (parseInt(col)-1), 'blue');
  }
}


function highlightForEvenId(id, moves, canHighlight, thisTileAdjPieces) {
  if ($('#'+id).hasClass('gamePiece')) return;
  let row = id.split('')[0];
  let col = id.split('')[1];

  if (canHighlight[1] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds((parseInt(row)-1) + '' + (parseInt(col)+1), true))) { // top-right
    highlightSurrounding((parseInt(row)-1) + '' + (parseInt(col)+1), moves-1);
    colorHex((parseInt(row)-1) + '' + (parseInt(col)+1), 'blue');
  }
  if (canHighlight[2] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds(row + (parseInt(col)+1), true))) { // bottom-right
    highlightSurrounding(row + (parseInt(col)+1), moves-1);
    colorHex(row + (parseInt(col)+1), 'blue');
  }
  if (canHighlight[4] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds(row + (parseInt(col)-1), true))) { // bottom-left
    highlightSurrounding(row + (parseInt(col)-1), moves-1);
    colorHex(row + (parseInt(col)-1), 'blue');
  }
  if (canHighlight[5] && hasMatchingAdjacentPieces(thisTileAdjPieces, findAdjacentPieceIds((parseInt(row)-1) + '' + (parseInt(col)-1), true))) { // top-left
    highlightSurrounding((parseInt(row)-1) + '' + (parseInt(col)-1), moves-1);
    colorHex((parseInt(row)-1) + '' + (parseInt(col)-1), 'blue');
  }
}


function colorHex(id) {//, color) {
  if ($('#'+id).hasClass('gamePiece') || $('#'+id).hasClass('selected')) return;
  let isOdd = id.split('')[1] % 2 === 1;

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
  let row = id.split('')[0];
  let col = id.split('')[1];

  let prevRowSameCol = $('#'+(parseInt(row)-1) + col);
  let nextRowSameCol = $('#'+(parseInt(row)+1) + col);
  let sameRowPrevCol = $('#'+row + (parseInt(col)-1));
  let sameRowNextCol = $('#'+row + (parseInt(col)+1));
  let nextRowPrevCol = $('#'+(parseInt(row)+1) + '' + (parseInt(col)-1));
  let nextRowNextCol = $('#'+(parseInt(row)+1) + '' + (parseInt(col)+1));

  return prevRowSameCol.hasClass('gamePiece') ||
    nextRowSameCol.hasClass('gamePiece') ||
    sameRowPrevCol.hasClass('gamePiece') ||
    sameRowNextCol.hasClass('gamePiece') ||
    nextRowPrevCol.hasClass('gamePiece') ||
    nextRowNextCol.hasClass('gamePiece');
}


// internal - only called from isAdjacentTohive()
function evenIdIsAdjacentToHive(id) {
  let row = id.split('')[0];
  let col = id.split('')[1];

  let prevRowSameCol = $('#'+(parseInt(row)-1) + col).hasClass('gamePiece');
  let nextRowSameCol = $('#'+(parseInt(row)+1) + col).hasClass('gamePiece');
  let prevRowPrevCol = $('#'+(parseInt(row)-1) + '' + (parseInt(col)-1)).hasClass('gamePiece');
  let prevRowNextCol = $('#'+(parseInt(row)-1) + '' + (parseInt(col)+1)).hasClass('gamePiece');
  let sameRowPrevCol = $('#'+row + (parseInt(col)-1)).hasClass('gamePiece');
  let sameRowNextCol = $('#'+row + (parseInt(col)+1)).hasClass('gamePiece');

  return prevRowSameCol ||
    nextRowSameCol ||
    prevRowPrevCol ||
    prevRowNextCol ||
    sameRowPrevCol ||
    sameRowNextCol;
}


// returns an array of the booleans representing if the immediate
// surrounding tiles' of the given tile id are able to be slid to (true)
// or not (false), starting from above current tile and proceding clockwise.
// Doesn't care if the tile being examined is in fact a gamepiece itself.
function adjacentTilesSlidable(id, isOdd) {
  let adjacentTiles = getAdjacentTileIds(id, isOdd);
  let adjacentTilesAreGamepiece = adjacentTiles.map(id =>
    $('#'+id).hasClass('gamePiece')
  );
  return adjacentTilesSlidableInternal(adjacentTilesAreGamepiece);
}


// returns array of id's of tiles that are adjacent to the given tile id
function getAdjacentTileIds(id, isOdd) {
  let row = id.split('')[0];
  let col = id.split('')[1];
  if (isOdd) {
    return [
      row - 1 + col,
      row + (+col + 1),
      (+row + 1) + '' + (+col + 1),
      (parseInt(row)+1) + col,
      (+row + 1) + '' + (col - 1),
      row + (col - 1)
    ];
  } else {
    return [
      row - 1 + col,
      (row - 1) + '' + (+col + 1),
      row + (+col + 1),
      (parseInt(row)+1) + col,
      row + '' + (col - 1),
      (row - 1) + '' + (col - 1)
    ];
  }
}


// takes array of booleans representing if adjacent tiles are gamepieces.
// returns a boolean array representing if that adjacent tile can be slid to.
// Doesn't care if the tile being examined is in fact a gamepiece itself.
function adjacentTilesSlidableInternal(adjTiles) {
  return adjTiles.map(function(openTile, index, array) {
    let prev, next;
    if (index === 0) { prev = 5; next = index+1; }
    else if (index === 5) { prev = index-1; next = 0; }
    else { prev = index-1; next = index+1; }
    return (array[prev] && array[next]) ? false : true;
  });
}


// returns array of id's of gamepieces that are adjacent to the given tile id
// the length of the returned array for the bee piece is what decides when the
// game is over (length of 6 means game is over).
function findAdjacentPieceIds(id, isOdd) {
  let adjacentTiles = getAdjacentTileIds(id, isOdd);
  return adjacentTiles.filter(function(tileId) {
    return $('#'+tileId).hasClass('gamePiece');
  });
}

// checks if the two sets of game pieces (an array of numbers in string format)
// have any shared id's, meaning the two tiles represented by these adjacent
// game pieces are adjacent to the same gampiece(s).
function hasMatchingAdjacentPieces(adjSet1, adjSet2) {
  return !!adjSet1.filter(function(id) {
    return adjSet2.indexOf(id) !== -1;
  }).length;
}

