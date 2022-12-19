'use strict';
$.support.cors = true;
$.ajax({
  url: 'https://raw.githubusercontent.com/TheEconomist/covid-19-the-economist-global-excess-deaths-model/main/output-data/export_country_per_100k.csv',
  dataType: 'text',
  success: function(csv) {
    var rates = { CHN: null, HKG: null, MAC: null, TWN: null };
    for (var lns = csv.split('\n'), i = 1; i < lns.length - 1; i++) {
      var ln = lns[i].split(',');
      if (rates.hasOwnProperty(ln[0])) {
        rates[ln[0]] = +ln[3];
      }
    }
    var arr = [];
    for (var key in rates) {
      if (rates.hasOwnProperty(key)) {
        arr.push([key, rates[key]]);
      }
    }
    arr.sort(function(a, b) {
      return b[1] - a[1];
    });
    for (i = 0; i < arr.length; i++) {
      var tr = document.createElement('tr');

      var th = document.createElement('th');
      th.className = 'categ';
      th.innerHTML = arr[i][0];
      tr.appendChild(th);

      var td1 = document.createElement('td');
      tr.appendChild(td1);

      var table = document.createElement('table');
      td1.appendChild(table);

      var tbody = document.createElement('tbody');
      table.appendChild(tbody);

      var tr1 = document.createElement('tr');
      tbody.appendChild(tr1);

      var td2 = document.createElement('td');
      tr1.appendChild(td2);

      var div = document.createElement('div');
      div.className = 'bar';
      div.style.width = Math.max(0, (arr[i][1] / arr[0][1]) * 12.5) + 'em';
      td2.appendChild(div);

      var td3 = document.createElement('td');
      td3.innerHTML = arr[i][1].toFixed(2);
      tr1.appendChild(td3);

      document.getElementsByTagName('tbody')[0].appendChild(tr);
    }
  },
  error: function() {
    alert('Failed to get data!');
  }
});
