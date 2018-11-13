'use strict';
var category = ['carbs', 'prot', 'fats'];
var userInput0 = [];
var userInput1 = [];
var userInput2 = [];
var currentInput = [];
var macrosArray = [];
var ctx = document.getElementById('myChart').getContext('2d'); //hook for chart
function Macros(newCarbs, newProt, newFats) {
  this.newCarbs = newCarbs;
  this.newProt = newProt;
  this.newFats = newFats;
  userInput0.push(parseInt(this.newCarbs));
  userInput1.push(parseInt(this.newProt));
  userInput2.push(parseInt(this.newFats));
  currentInput = [parseInt(newCarbs), parseInt(newProt), parseInt(newFats)];
  macrosArray.push(this);
}
function renderChart() {
  var userInputResults = [];
  for (var j = 0; j < category.length; j++) {
    userInputResults.push(currentInput[j]);
  }
  var resultsPrior = [];
  console.log('results Array', resultsPrior);
  var postResults = [];
  console.log('postResults', typeof postResults);
  console.log('stored results', postResults);
  console.log('userInputResults', userInputResults);
  console.log('userInput0', userInput0);
  console.log('userInput1', userInput1);
  console.log('userInput2', userInput2);
  if (localStorage.getItem('userInput')) {
    var storedData = localStorage.getItem('userInput');
    console.log('storedData', storedData);
    postResults = JSON.parse(storedData);
    console.log('postResults', postResults);
    var intPostResults = Array(3);
    for (var h = 0; h < category.length; h++) {
      intPostResults[h] = parseInt(postResults[h]);
      console.log('intpostresult', intPostResults);
      userInputResults[h] += parseInt(intPostResults[h]);
    }
    console.log('userInputResults', userInputResults);
  }
  var chartConfig = { //defined variable to hold chart properties
    type: 'horizontalBar',
    data: {
      labels: category,
      datasets: [{
        label: ' Total Macros',

        data: userInputResults,
        color: '#000000',
        backgroundColor: [
          'rgba(125,249,255)',
          'rgba(153,102,204)',
          'rgba(0,255,255)',
          'rgba(42,82,190)',
          'rgba(253,238,0)',
          'rgba(63,0,255)',
          'rgba(102,255,0)',
          'rgba(0,20,168)',
          'rgba(255,56,0)',
          'rgba(0,255,0)',
          'rgba(125,249,255)',
          'rgba(255,255,0)',
          'rgba(244,0,161)',
          'rgba(255,191,0)',
          'rgba(39,59,226)',
          'rgba(253,14,53)',
          'rgba(255,250,250)',
          'rgba(0,250,154)',
          'rgba(204,255,0)',],
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
  console.log('results data',typeof resultsData);
  console.log('results data',typeof resultsPrior);
  localStorage.setItem('userInput', resultsData);
  return new Chart(ctx, chartConfig);
}
// renderChart();
var formReset = document.getElementById('form-data');
formReset.addEventListener('submit', function (event) {
  event.preventDefault();
  var newCarbs = event.target.newCarbs.value;
  var newProt = event.target.newProt.value;
  var newFats = event.target.newFats.value;
  new Macros(newCarbs, newProt, newFats);
  renderChart();
  event.target.newCarbs.value = '';
  event.target.newProt.value = '';
  event.target.newFats.value = '';
});
