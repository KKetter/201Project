'use-script';

var category = ['carbs', 'prot', 'fats'];
var userInput = [];
console.log(userInput);

function Macros(newCarbs, newProt, newFats) {
  this. newCarbs = newCarbs;
  this.newProt = newProt;
  this.newFats = newFats;
  this.category = category;
  // this.quantity = quantity;
  userInput.push(this);
}

// Macros.prototype.storeMacros = function () {
//   var 
// }
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

