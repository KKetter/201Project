'use strict';
var trackerData = localStorage.getItem('trackResults');
if (!trackerData) {
  localStorage.getItem('trackResults', 0);
}
var category1 = ['Carbs', 'Proteins', 'Fats'];//labels for macros charts
var category2 = ['Water']; //label for water chart
var currentWaterInput = []; //water varibale utlized to push data into chart
var currentInput = []; //holds current Macros values to push into chart
var totalInputs = 0; //counter for each submit
var ctx = document.getElementById('myChart').getContext('2d');//hooks for charts
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myPieChart').getContext('2d');
function Macros(newCarbs, newProt, newFats, newWater) {
  this.newCarbs = newCarbs;
  this.newProt = newProt;
  this.newFats = newFats;
  this.newWater = newWater;
  trackerData = totalInputs;
  currentWaterInput = [parseInt(newWater)];
  currentInput = [parseInt(newCarbs), parseInt(newProt), parseInt(newFats),];
  renderPieChart();
  renderChart();
  renderWaterChart();
  renderTracker();
}
function renderTracker () { //renders counter
  var trackerPostResults = 0;
  var pullStoredResults = localStorage.getItem('trackResults');
  trackerPostResults = JSON.parse(pullStoredResults);
  var divHook = document.getElementById('tracker');
  var spanEl = document.createElement('span');
  spanEl.textContent = 'Total Submissions: ' + trackerPostResults;
  divHook.appendChild(spanEl);
}
function storeTrackerData () { //stores counter in local storage
  var trackerPostResults = 0; //holds parsed data from local storage
  if (localStorage.getItem('trackResults')){ //checks to see if data exists in local storage and retreives if TRUE
    var pullStoredResults = localStorage.getItem('trackResults');
    trackerPostResults = JSON.parse(pullStoredResults);
    trackerData = trackerPostResults + 1;
    console.log('tracker data post', trackerData);
  } else{
    trackerData = totalInputs; //combines existing data with parsed data from local storage
  }
  console.log('tracker data prior', trackerData);
  var trackerResultsData = JSON.stringify(trackerData);
  localStorage.setItem('trackResults', trackerResultsData);
}
var imgSteak = new Image(); //following variables hold images to render in chart
imgSteak.src = 'img/steak1.jfif';
var imgDonut = new Image();
imgDonut.src = 'img/donut1.png';
var imgCheese = new Image();
imgCheese.src = 'img/macncheese.png';
function renderChart() { //renders first macro bar chart
  var userInputResults = []; //holds values to render current data on chart
  console.log('bar chart userinputresults', userInputResults);
  for (var j = 0; j < category1.length; j++) {
    userInputResults.push(currentInput[j]);
  }
  var postResults = []; //holds parsed data from local storage
  if (localStorage.getItem('userInput')) { //checks to see if data exists in local storage and retreives if TRUE
    var storedData = localStorage.getItem('userInput');
    postResults = JSON.parse(storedData);
    var intPostResults = Array(3);
    for (var h = 0; h < category1.length; h++) { //combines data from local storage array with current data
      intPostResults[h] = parseInt(postResults[h]);
      userInputResults[h] += parseInt(intPostResults[h]);
    }
  }
  imgSteak.onload = function () { //loads images on page load to rend for bar chart
    var fillPatternS = ctx2.createPattern(imgSteak, 'repeat');
    var fillPatternD = ctx2.createPattern(imgDonut, 'repeat');
    var fillPatternC = ctx2.createPattern(imgCheese, 'repeat');
    var chartConfig = { //defined variable to hold chart properties
      type: 'horizontalBar',
      data: {
        labels: category1,
        datasets: [{
          label: ' Total Macros',

          data: userInputResults,
          color: '#000000',
          backgroundColor: [fillPatternC, fillPatternS, fillPatternD,],
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
    return new Chart(ctx, chartConfig);
  };
  var resultsData = JSON.stringify(userInputResults); //pushes data into local storage
  localStorage.setItem('userInput', resultsData);
}
function renderPieChart() { //renders pie chart
  var userInputResults = []; //holds variable to render on chart
  console.log('pie chart userinputresults', userInputResults);
  for (var j = 0; j < category1.length; j++) { //combines current data with variable to hold chart data
    userInputResults.push(currentInput[j]);
  }
  var postResults = []; //holds parsed data from local storage
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
        backgroundColor: ['#ffb300', '#bf1093', '#009543',],
        borderColor: [],
        borderWidth: 2
      }]
    },
  };
  return new Chart(ctx3, myPieChart);
}

var imgWater = new Image(); //image utilized to render on water chart
imgWater.src = 'img/waterflow2.jpeg';
function renderWaterChart() { //renders water chart
  var waterResults = []; //data for water chart
  console.log('water results', waterResults);
  for (var j = 0; j < category2.length; j++) {
    waterResults.push(parseInt(currentWaterInput[j])); //adds current data with water chart data
  }
  if (waterResults > 127) {
    alert('Slow down! Maximum water recommended reached'); //alerts user if water exceeds 127 ounces
  }
  var waterPostResults = [];
  if (localStorage.getItem('waterResults')) { //parses data from local storage if TRUE
    var waterStoredData = localStorage.getItem('waterResults');
    waterPostResults = JSON.parse(waterStoredData);
    var intWaterPostResults = Array(1);
    for (var h = 0; h < category2.length; h++) { //combines current water data with existing data from local storage
      intWaterPostResults[h] = parseInt(waterPostResults[h]);
      waterResults[h] += parseInt(intWaterPostResults[h]);
    }
  }
  imgWater.onload = function () {
    var fillPattern = ctx2.createPattern(imgWater, 'repeat');
    var chartConfig = { //defined variable to hold chart properties
      type: 'bar',
      data: {
        labels: category2,
        datasets: [{
          label: ' Total Water',

          data: waterResults,
          color: '#000000',
          backgroundColor: fillPattern,
          borderColor: [],
          borderWidth: 2
        }]
      },
      options: {
        legend: {display: false},
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

    return new Chart(ctx2, chartConfig);
  };
  var waterResultsData = JSON.stringify(waterResults); //pushes data into local storage before refresh
  waterResults.push(waterResultsData);
  localStorage.setItem('waterResults', waterResultsData);
}
new Macros( 0, 0, 0, 0);
var formSubmit = document.getElementById('form-data');
formSubmit.addEventListener('submit', function (event) { //event listener
  var newCarbs = event.target.newCarbs.value;
  var newProt = event.target.newProt.value;
  var newFats = event.target.newFats.value;
  var newWater = event.target.newWater.value;
  new Macros(newCarbs, newProt, newFats, newWater);
  event.target.newCarbs.value = '';
  event.target.newProt.value = '';
  event.target.newFats.value = '';
  event.target.newWater.value = '';
  totalInputs += 1; //adds to counter after each submit
  storeTrackerData();
});
var clearOut = function() { //reset button for local storage
  var reset = document.getElementById('reset-data');
  reset.addEventListener ('click', function() {
    if (window.confirm('Do you really want to clear your macros?')) {
      localStorage.clear();
      location.reload();
    } else {
      return;
    }
  });
};
clearOut();
