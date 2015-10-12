statsBaseTable = "<table class='statsTable' id='matchHistoryStats' style='width:100%;table-layout:auto;empty-cells:show;'> \
  <tr> \
  <th>Last X Games</th> \
  <th>Wins</th> \
  <th>Losses</th> \
  <th>Win %</th> \
  <th>Net MMR</th> \
  </tr> \
  <tbody id='statsTableBody'>
  </tbody>
  </table> \
  ";

gameBreakout = [10, 20, 50, 100];
historyTable = null


init = ->
  this.historyTable = $('#ctl00_MainContent_ctl00_MainContent_RadGridMatchHistoryPanel')

lastXSummary = (rows) ->
  wins = 0
  losses = 0
  netMMR = 0
  for row in rows
    if $(row).css('background-color') == 'rgb(144, 238, 144)'
      wins += 1
    else
      losses += 1

    mmrChange = parseInt($(row).find("td").eq(8).html(), 10)
    netMMR += mmrChange unless isNaN(mmrChange)

  winrate = (wins / rows.length) * 100
  {
    games: rows.length,
    wins: wins,
    losses: losses,
    winrate: winrate,
    netMMR: netMMR
  }


createStatsTable = ->
  this.historyTable.before statsBaseTable
  rows = this.historyTable.find("tr.rgRow")
  statsTable = $('#matchHistoryStats')
  for x in gameBreakout
    xrows = rows[0..x-1]
    summary = lastXSummary(xrows)
    addSummaryToStatsTable(summary)
  return

addSummaryToStatsTable = (summary) ->
  statRow = "<tr> \
    <td>#{summary.games}</td> \
    <td>#{summary.wins}</td> \
    <td>#{summary.losses}</td> \
    <td>#{summary.winrate}</td> \
    <td>#{summary.netMMR}</td> \
    </tr> \
    "
  $("#statsTableBody").append statRow

init()
createStatsTable()