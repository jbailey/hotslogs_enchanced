controls = '
<form id="searchFilterForm">
Region: 
<select class="searchFilter" name="region">
<option value="ALL">ALL</option>
<option value="US">US</option>
<option value="EU">EU</option>
<option value="KR">KR</option>
<option value="CN">CN</option>
</select>

Min MMR:
<select class="searchFilter" name="min_mmr">
<option value="-1000">-1000</option>
<option value="0" selected>0</option>
<option value="1000">1000</option>
<option value="2000">2000</option>
<option value="2000">2000</option>
<option value="3000">3000</option>
<option value="4000">4000</option>
<option value="10000">5000+</option>
</select>

Max MMR:
<select class="searchFilter" name="max_mmr">
<option value="-1000">-1000</option>
<option value="0">0</option>
<option value="1000">1000</option>
<option value="2000">2000</option>
<option value="2000">2000</option>
<option value="3000">3000</option>
<option value="4000">4000</option>
<option value="10000" selected>5000+</option>
</select>

Exact Name: <input type="checkbox" name="exact_name" class="searchFilter">
</form>
'

filter = 
  region: 'ALL'
  min_mmr: -1000
  max_mmr: 10000
  name: $(location).attr("search").split("=")[1]

resultTable = null

init = ->
  this.resultTable = $("#ctl00_MainContent_RadGridPlayerSearch")
  this.resultTable.before controls
  $(".searchFilter").on 'change', ->
    filterResults()

filterResults = ->
  showAllResults()
  setFilter()
  rows = this.resultTable.find("tbody tr")
  for row in rows
    region = $(row).find("td").eq(1).html()
    name = $(row).find("td").eq(2).text()
    mmr = parseInt($(row).find("td").eq(3).html())
    if filter.exact_name == "on" && filter.name != name
      $(row).hide() 
    else if (filter.region != 'ALL') && (region != filter.region)
      $(row).hide()
    else if isNaN(mmr) || (mmr < filter.min_mmr) || (mmr > filter.max_mmr)
      $(row).hide()

showAllResults = ->
  this.resultTable.find("tbody tr").each (idx) ->
    $(this).show()
    return

setFilter = ->
  for obj in $("#searchFilterForm").serializeArray()
    value = parseInt(obj.value)
    filter[obj.name] = (if isNaN(value) then obj.value else value)
  return  

# GO
init()
