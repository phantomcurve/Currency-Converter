import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './currency';

function getElements(response, inputtedAmount, oldCurrency, newCurrency) {
  if(response.conversion_rates){
    let oldRate = response.conversion_rates[oldCurrency];
    let newRate = response.conversion_rates[newCurrency];
      $(".showResult").html(`${inputtedAmount} ${oldCurrency} = ${inputtedAmount * (newRate/oldRate)} ${newCurrency}`);
  } else {
    $(".showError").text(`Ooops, there's been an error: ${response.message}`);
  }
}

$(document).ready(function(){
  Currency.getConvertedAmount()
    .then(function(data){
      let stringifiedResponse = JSON.stringify(data);
      sessionStorage.setItem("response", stringifiedResponse);
      let response = JSON.parse(sessionStorage.getItem("response"));

      $("form#currency-converter").submit(function(event){
        event.preventDefault();
        const inputtedAmount = $("#amount").val();
        const oldCurrency = $("#oldCurrency").val();
        const newCurrency = $("#newCurrency").val();
        getElements(response, inputtedAmount, oldCurrency, newCurrency);
      });
    });
});

