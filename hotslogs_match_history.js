// Generated by CoffeeScript 1.10.0
(function() {
  var addSummaryToStatsTable, clearTable, createStatsTable, fillTable, findHistoryTable, gameBreakout, getRows, historyTable, init, lastXSummary, refreshStatsTable, statsBaseTable, statsTable;

  statsBaseTable = "<a class='btn' href='javascript:void(0);' id='refreshStats'>Refresh Stats</a> <table class='statsTable' id='matchHistoryStats' style='width:100%;table-layout:auto;empty-cells:show;'> <tr> <th>Last X Games</th> <th>Wins</th> <th>Losses</th> <th>Win %</th> <th>Net MMR</th> </tr> <tbody id='statsTableBody'> </tbody> </table> ";

  gameBreakout = [10, 20, 50, 100];

  historyTable = null;

  statsTable = null;

  init = function() {
    console.info("Initializing....");
    findHistoryTable();
    createStatsTable();
    return $("#refreshStats").click(function() {
      return refreshStatsTable();
    });
  };

  refreshStatsTable = function() {
    var rows;
    clearTable();
    rows = getRows();
    return fillTable(rows);
  };

  findHistoryTable = function() {
    this.historyTable = $('#ctl00_MainContent_ctl00_MainContent_RadGridMatchHistoryPanel');
    if (this.historyTable === void 0) {
      this.historyTable = $('ctl00_MainContent_RadGridMatchHistory_ctl00');
    }
    if (this.historyTable === void 0) {
      return console.info("Could not find history table");
    }
  };

  lastXSummary = function(rows) {
    var i, len, losses, map, mmrChange, netMMR, row, winrate, wins;
    wins = 0;
    losses = 0;
    netMMR = 0;
    for (i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      console.log(row);
      map = $(row).find("td").eq(2).html();
      console.log($(row).css("background-color"));
      if ($(row).css('background-color') === 'rgb(144, 238, 144)') {
        wins += 1;
        console.log("win on " + map);
      } else {
        losses += 1;
        console.log("loss on " + map);
      }
      mmrChange = parseInt($(row).find("td").eq(9).html(), 10);
      if (!isNaN(mmrChange)) {
        netMMR += mmrChange;
      }
    }
    winrate = Math.round((wins / rows.length) * 100);
    return {
      games: rows.length,
      wins: wins,
      losses: losses,
      winrate: winrate,
      netMMR: netMMR
    };
  };

  createStatsTable = function() {
    var rows;
    this.historyTable.before(statsBaseTable);
    rows = getRows();
    this.statsTable = $('#matchHistoryStats');
    return fillTable(rows);
  };

  getRows = function() {
    var rows;
    rows = this.historyTable.find("tr.rgRow, tr.rgAltRow");
    return rows;
  };

  fillTable = function(rows) {
    var i, len, summary, x, xrows;
    for (i = 0, len = gameBreakout.length; i < len; i++) {
      x = gameBreakout[i];
      xrows = rows.slice(0, +(x - 1) + 1 || 9e9);
      summary = lastXSummary(xrows);
      addSummaryToStatsTable(summary);
    }
  };

  clearTable = function() {
    return $(this.statsTable).find("tr:gt(0)").remove();
  };

  addSummaryToStatsTable = function(summary) {
    var statRow;
    statRow = "<tr> <td>" + summary.games + "</td> <td>" + summary.wins + "</td> <td>" + summary.losses + "</td> <td>" + summary.winrate + "</td> <td>" + summary.netMMR + "</td> </tr> ";
    return $("#statsTableBody").append(statRow);
  };

  init();

}).call(this);
