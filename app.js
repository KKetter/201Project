'use strict';
var category1 = ['carbs', 'prot', 'fats'];
var category2 = ['water'];
var userInput0 = [];
var userInput1 = [];
var userInput2 = [];
var waterInput = [];
var currentWaterInput = [];
var currentInput = [];
var macrosArray = [];
var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d'); //hook for chart
function Macros(newCarbs, newProt, newFats, newWater) {
  this.newCarbs = newCarbs;
  this.newProt = newProt;
  this.newFats = newFats;
  this.newWater = newWater;
  userInput0.push(parseInt(this.newCarbs));
  userInput1.push(parseInt(this.newProt));
  userInput2.push(parseInt(this.newFats));
  waterInput.push(parseInt(this.newWater));
  currentWaterInput = [parseInt(newWater)];
  currentInput = [parseInt(newCarbs), parseInt(newProt), parseInt(newFats),];
  macrosArray.push(this);
  renderChart();
  renderWaterChart();
}
function renderChart() {
  var userInputResults = [];
  for (var j = 0; j < category1.length; j++) {
    userInputResults.push(currentInput[j]);
  }
  var resultsPrior = [];
  // console.log('results Array', resultsPrior);
  var postResults = [];
  // console.log('postResults', typeof postResults);
  // console.log('stored results', postResults);
  // console.log('userInputResults', userInputResults);
  // console.log('userInput0', userInput0);
  // console.log('userInput1', userInput1);
  // console.log('userInput2', userInput2);
  if (localStorage.getItem('userInput')) {
    var storedData = localStorage.getItem('userInput');
    // console.log('storedData', storedData);
    postResults = JSON.parse(storedData);
    // console.log('postResults', postResults);
    var intPostResults = Array(3);
    for (var h = 0; h < category1.length; h++) {
      intPostResults[h] = parseInt(postResults[h]);
      // console.log('intpostresult', intPostResults);
      userInputResults[h] += parseInt(intPostResults[h]);
    }
    // console.log('userInputResults', userInputResults);
  }
  var chartConfig = { //defined variable to hold chart properties
    type: 'horizontalBar',
    data: {
      labels: category1,
      datasets: [{
        label: ' Total Macros',

        data: userInputResults,
        color: '#000000',
        backgroundColor: [
          'rgba(125,249,255)',
          'rgba(153,102,204)',
          'rgba(0,255,255)',
          'rgba(42,82,190)',],
        borderColor: [],
        borderWidth: 2
      }]
    },
    options: {
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
  var resultsData = JSON.stringify(userInputResults); //pushes data into local storage before refresh
  resultsPrior.push(resultsData);
  // console.log('results data',typeof resultsData);
  // console.log('results data',typeof resultsPrior);
  localStorage.setItem('userInput', resultsData);
  return new Chart(ctx, chartConfig);
}
function renderWaterChart() {
  var waterResults = [];
  for (var j = 0; j < category2.length; j++) {
    waterResults.push(parseInt(currentWaterInput[j]));
    console.log('water for loop', waterResults);
  }
  if (waterResults >= 128) {
    alert('Slow down! Maximum water recommended reached');
  }
  console.log('water results Array', waterResults);
  var waterPostResults = [];
  console.log('waterPostResults', typeof waterPostResults);
  console.log('water stored results', waterPostResults);
  if (localStorage.getItem('waterResults')) {
    var waterStoredData = localStorage.getItem('waterResults');
    console.log('waterStoredData', waterStoredData);
    waterPostResults = JSON.parse(waterStoredData);
    console.log('waterPostResults', waterPostResults);
    var intWaterPostResults = Array(1);
    for (var h = 0; h < category2.length; h++) {
      intWaterPostResults[h] = parseInt(waterPostResults[h]);
      console.log('intWaterpostresult', intWaterPostResults);
      waterResults[h] += parseInt(intWaterPostResults[h]);
    }
    console.log('waterPostResults', waterPostResults);
  }
  var chartConfig = { //defined variable to hold chart properties
    type: 'bar',
    data: {
      labels: category2,
      datasets: [{
        label: ' Total Water',

        data: waterResults,
        color: '#000000',
        backgroundColor: ['rgba(42,82,190)',],
        borderColor: [],
        borderWidth: 2
      }]
    },
    options: {
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
  console.log('stringify', waterResultsData);
  waterResults.push(waterResultsData);
  localStorage.setItem('waterResults', waterResultsData);
  console.log('water results data', waterResultsData);
  console.log('water results data', waterResults);
  return new Chart(ctx2, chartConfig);
}
new Macros( 0, 0, 0, 0);
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
});
var clearOut = function() {
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
