var baseTable = "<table class='rgMasterTable' id='matchHistoryStats' style='width:100%;table-layout:auto;empty-cells:show;'> \
  <tr> \
  <th>Last X Games</th> \
  <th>Wins</th> \
  <th>Losses</th> \
  <th>Win %</th> \
  <th>Net MMR</th> \
  </tr> \
  </table> \
  ";

var gameBreakout = [10, 20, 50, 100];

// Parse rows
parseGameRows();

// Create table
createStatsTable();

function createStatsTable() {
  $("#ctl00_MainContent_ctl00_MainContent_RadGridMatchHistoryPanel").before(baseTable);
  var statsTable = $("#matchHistoryStats");
  for(int i=0; i<)
  alert("done");
}

function parseGameRows() {

}