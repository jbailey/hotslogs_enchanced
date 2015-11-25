statsBaseTable = "
  <a class='btn' href='javascript:void(0);' id='refreshStats'>Refresh Stats</a>
  <table class='statsTable' id='matchHistoryStats' style='width:100%;table-layout:auto;empty-cells:show;'> \
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
  "

gameBreakout = [10, 20, 50, 100];
historyTable = null
statsTable = null


init = ->
  console.info "Initializing...."
  findHistoryTable()
  createStatsTable()
  $("#refreshStats").click ->
    refreshStatsTable()

refreshStatsTable = ->
  clearTable()
  rows = getRows()
  fillTable rows

findHistoryTable = ->
  this.historyTable = $('#ctl00_MainContent_ctl00_MainContent_RadGridMatchHistoryPanel')
  if this.historyTable == undefined
    this.historyTable = $('ctl00_MainContent_RadGridMatchHistory_ctl00')
  if this.historyTable == undefined
    console.info "Could not find history table"

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

  winrate = Math.round((wins / rows.length) * 100)
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
  this.statsTable = $('#matchHistoryStats')
  fillTable(rows)

getRows = ->
  rows = this.historyTable.find("tr.rgRow")
  return rows

fillTable = (rows) ->
  for x in gameBreakout
    xrows = rows[0..x-1]
    summary = lastXSummary(xrows)
    addSummaryToStatsTable(summary)
  return

clearTable = ->
  $(this.statsTable).find("tr:gt(0)").remove()

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