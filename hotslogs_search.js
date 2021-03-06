// Generated by CoffeeScript 1.10.0
(function() {
  var controls, filter, filterResults, init, resultTable, setFilter, showAllResults;

  controls = '<form id="searchFilterForm"> Region: <select class="searchFilter" name="region"> <option value="ALL">ALL</option> <option value="US">US</option> <option value="EU">EU</option> <option value="KR">KR</option> <option value="CN">CN</option> </select> Min MMR: <select class="searchFilter" name="min_mmr"> <option value="-1000">-1000</option> <option value="0" selected>0</option> <option value="1000">1000</option> <option value="2000">2000</option> <option value="2000">2000</option> <option value="3000">3000</option> <option value="4000">4000</option> <option value="10000">5000+</option> </select> Max MMR: <select class="searchFilter" name="max_mmr"> <option value="-1000">-1000</option> <option value="0">0</option> <option value="1000">1000</option> <option value="2000">2000</option> <option value="2000">2000</option> <option value="3000">3000</option> <option value="4000">4000</option> <option value="10000" selected>5000+</option> </select> Exact Name: <input type="checkbox" name="exact_name" class="searchFilter"> </form>';

  filter = {
    region: 'ALL',
    min_mmr: -1000,
    max_mmr: 10000,
    name: $(location).attr("search").split("=")[1]
  };

  resultTable = null;

  init = function() {
    this.resultTable = $("#ctl00_MainContent_RadGridPlayerSearch");
    this.resultTable.before(controls);
    return $(".searchFilter").on('change', function() {
      return filterResults();
    });
  };

  filterResults = function() {
    var i, len, mmr, name, region, results, row, rows;
    showAllResults();
    setFilter();
    rows = this.resultTable.find("tbody tr");
    results = [];
    for (i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      region = $(row).find("td").eq(1).html();
      name = $(row).find("td").eq(2).text();
      mmr = parseInt($(row).find("td").eq(3).html());
      if (filter.exact_name === "on" && filter.name !== name) {
        results.push($(row).hide());
      } else if ((filter.region !== 'ALL') && (region !== filter.region)) {
        results.push($(row).hide());
      } else if (isNaN(mmr) || (mmr < filter.min_mmr) || (mmr > filter.max_mmr)) {
        results.push($(row).hide());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  showAllResults = function() {
    return this.resultTable.find("tbody tr").each(function(idx) {
      $(this).show();
    });
  };

  setFilter = function() {
    var i, len, obj, ref, value;
    ref = $("#searchFilterForm").serializeArray();
    for (i = 0, len = ref.length; i < len; i++) {
      obj = ref[i];
      value = parseInt(obj.value);
      filter[obj.name] = (isNaN(value) ? obj.value : value);
    }
  };

  init();

}).call(this);
