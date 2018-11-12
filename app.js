'use-script';

var category = ['carbs', 'prot', 'fats'];

var userInput0 = [];
var userInput1 = [];
var userInput2 = [];
var ctx = document.getElementById('myChart').getContext('2d'); //hook for chart

function Macros(newCarbs, newProt, newFats) {
  
  this.newCarbs = newCarbs;
  this.newProt = newProt;
  this.newFats = newFats;
  console.log('newCarb', newCarbs);
  console.log('newProt', newProt);
  console.log('newFats', newFats);
  userInput0.push(this.newCarbs);
  userInput1.push(this.newProt);
  userInput2.push(this.newFats);
  console.log('user input 0', userInput0);
  console.log('user input 1', userInput1);
  console.log('user input 2', userInput2);
  renderChart();
}

Macros.prototype.storeMacros = function () {
  for (var i = 0; i < category.length; i++) {
    var singleInput = this.newCarbs + this.newProt + this.newFats;
    this.userInput.push(singleInput);
  }
}
function renderChart() {
  // var votedArray = []; //defined array to tallys votes before refresh
  // var votesArray = []; //defined array for votes each render results
  // if (localStorage.getItem('votes')) {
  //   var votesData = localStorage.getItem('votes');
  //   votedArray = JSON.parse(votesData); //pulls from local storage and pushes into defined array
  //   for ( var h = 0; h < products.length; h++) {
  //     votedArray[h] = parseInt(votedArray[h]);
  //     votes[h] += votedArray[h];
  //   }
  // }
  var userInputResults = [userInput0[0], userInput1[0], userInput2[0]];
  // console.log(userInputResults);
  // for (var j = 0; j < userInput.length; j++) {
  //   userInputResults.push(userInput[j].userInputResults);
  // }
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
  return new Chart(ctx, chartConfig);
// var voteData = JSON.stringify(votes); //pushes data into local storage before refresh
// votesArray.push(voteData);
// localStorage.setItem('votes', votesArray);
}
renderChart();
var formReset = document.getElementById('form-data');
formReset.addEventListener('submit', function (event) {
  event.preventDefault();
  var newCarbs = event.target.newCarbs.value;
  var newProt = event.target.newProt.value;
  var newFats = event.target.newFats.value;
  event.target.store = new Macros(newCarbs, newProt, newFats);
  event.target.newCarbs.value = '';
  console.log(newCarbs);
  event.target.newProt.value = '';
  console.log(newProt);
  event.target.newFats.value = '';
  console.log(newFats);
});
