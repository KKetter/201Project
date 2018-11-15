'use strict';
var trackerData = localStorage.getItem('trackResults');
if (!trackerData) {
  localStorage.getItem('trackResults', 0);
}
console.log('top tracker data', trackerData);
var category1 = ['carbs', 'prot', 'fats'];
var category2 = ['water'];
var userInput0 = [];
var userInput1 = [];
var userInput2 = [];
var waterInput = [];
var currentWaterInput = [];
var currentInput = [];
var macrosArray = [];
var totalInputs = 0;
console.log('total input macros', totalInputs);
console.log('macros Array', macrosArray);
var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d'); //hook for chart
var ctx3 = document.getElementById('myPieChart').getContext('2d');
function Macros(newCarbs, newProt, newFats, newWater) {
  this.newCarbs = newCarbs;
  this.newProt = newProt;
  this.newFats = newFats;
  this.newWater = newWater;
  trackerData = totalInputs;
  userInput0.push(parseInt(this.newCarbs));
  userInput1.push(parseInt(this.newProt));
  userInput2.push(parseInt(this.newFats));
  waterInput.push(parseInt(this.newWater));
  currentWaterInput = [parseInt(newWater)];
  currentInput = [parseInt(newCarbs), parseInt(newProt), parseInt(newFats),];
  macrosArray.push(this);
  renderPieChart();
  renderChart();
  renderWaterChart();
  storeTrackerData();
}
// function renderTracker () {
// }
function storeTrackerData() {
  console.log('tracker data prior', trackerData);
  if (localStorage.getItem('trackResults')) {
    var trackerPostResults = 0;
    var pullStoredResults = localStorage.getItem('trackResults');
    trackerPostResults = JSON.parse(pullStoredResults);
    trackerData += trackerPostResults;
    console.log('tracker data post', trackerData);

  } else {
    console.log('we in da else');
    trackerData = parseInt(totalInputs);
  }
  var trackerResultsData = JSON.stringify(trackerData);
  localStorage.setItem('trackResults', trackerResultsData);
  var divHook = document.getElementById('tracker');
  var spanEl = document.createElement('span');
  spanEl.textContent = trackerData;
  divHook.appendChild(spanEl);
}


function renderChart() {
  var userInputResults = [];
  console.log('bar chart userinputresults', userInputResults);
  for (var j = 0; j < category1.length; j++) {
    userInputResults.push(currentInput[j]);
  }
  var resultsPrior = [];
  var postResults = [];
  if (localStorage.getItem('userInput')) {
    var storedData = localStorage.getItem('userInput');
    postResults = JSON.parse(storedData);
    var intPostResults = Array(3);
    for (var h = 0; h < category1.length; h++) {
      intPostResults[h] = parseInt(postResults[h]);
      userInputResults[h] += parseInt(intPostResults[h]);
    }
  }
  var chartConfig = { //defined variable to hold chart properties
    type: 'horizontalBar',
    data: {
      labels: category1,
      datasets: [{
        label: ' Total Macros',

        data: userInputResults,
        color: '#000000',
        backgroundColor: ['#ffe680', '#ff80aa', '#bf80ff',],
        borderColor: [],
        borderWidth: 2
      }]
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [{
          plotOptions: {
            series: {
              groupPadding: 0
            }
          },
          barPercentage: 2.0,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  var resultsData = JSON.stringify(userInputResults); //pushes data into local storage prior to refresh
  resultsPrior.push(resultsData);
  localStorage.setItem('userInput', resultsData);
  return new Chart(ctx, chartConfig);
}
function renderPieChart() {
  var userInputResults = [];
  console.log('pie chart userinputresults', userInputResults);
  for (var j = 0; j < category1.length; j++) {
    userInputResults.push(currentInput[j]);
  }
  var postResults = [];
  if (localStorage.getItem('userInput')) {
    var storedData = localStorage.getItem('userInput');
    postResults = JSON.parse(storedData);
    var intPostResults = Array(3);
    for (var h = 0; h < category1.length; h++) {
      intPostResults[h] = parseInt(postResults[h]);
      userInputResults[h] += parseInt(intPostResults[h]);
    }
  }
  var myPieChart = {
    type: 'pie',
    data: {
      labels: category1,
      datasets: [{
        label: ' Total Macros',

        data: userInputResults,
        color: '#000000',
        backgroundColor: ['#ffe680', '#ff80aa', '#bf80ff',],
        borderColor: [],
        borderWidth: 2
      }]
    },
  };
  return new Chart(ctx3, myPieChart);
}
function renderWaterChart() {
  var waterResults = [];
  console.log('water results', waterResults);
  for (var j = 0; j < category2.length; j++) {
    waterResults.push(parseInt(currentWaterInput[j]));
  }
  if (waterResults > 127) {
    alert('Slow down! Maximum water recommended reached');
  }
  var waterPostResults = [];
  if (localStorage.getItem('waterResults')) {
    var waterStoredData = localStorage.getItem('waterResults');
    waterPostResults = JSON.parse(waterStoredData);
    var intWaterPostResults = Array(1);
    for (var h = 0; h < category2.length; h++) {
      intWaterPostResults[h] = parseInt(waterPostResults[h]);
      waterResults[h] += parseInt(intWaterPostResults[h]);
    }
  }
  var chartConfig = { //defined variable to hold chart properties
    type: 'bar',
    data: {
      labels: category2,
      datasets: [{
        label: ' Total Water',

        data: waterResults,
        color: '#000000',
        backgroundColor: ['#80ffff'],
        borderColor: [],
        borderWidth: 2
      }]
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{
          gridLines: {
            lineWidth: 0,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            beginAtZero: true,
            stepValue: 16,
            max: 128,
          }
        }],
        xAxes: [{
          gridLines: {
            lineWidth: 0,
            color: 'rgba(255,255,255,0)'
          }
        }]
      }
    }
  };
  var waterResultsData = JSON.stringify(waterResults); //pushes data into local storage before refresh
  waterResults.push(waterResultsData);
  localStorage.setItem('waterResults', waterResultsData);
  return new Chart(ctx2, chartConfig);
}
new Macros(0, 0, 0, 0);
var formSubmit = document.getElementById('form-data');
formSubmit.addEventListener('submit', function (event) {
  event.preventDefault();
  var newCarbs = event.target.newCarbs.value;
  var newProt = event.target.newProt.value;
  var newFats = event.target.newFats.value;
  var newWater = event.target.newWater.value;
  new Macros(newCarbs, newProt, newFats, newWater);
  event.target.newCarbs.value = '';
  event.target.newProt.value = '';
  event.target.newFats.value = '';
  event.target.newWater.value = '';
  totalInputs += 1;
  // storeTrackerData();
  console.log('totalinputs after listener', totalInputs);
});
var clearOut = function () {
  var reset = document.getElementById('reset-data');
  reset.addEventListener('click', function () {
    if (window.confirm('Do you really want to clear your macros?')) {
      localStorage.clear();
      location.reload();
    } else {
      return;
    }
  });
};
clearOut();
