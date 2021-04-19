const leftCurrency = document.querySelector("#left-currency");
leftCurrency.value = "USD";
const rightCurrency = document.querySelector("#right-currency");
rightCurrency.value = "ILS";

const dataListRight = document.querySelector("#from");
const dataListLeft = document.querySelector("#to");

const amount = document.querySelector("#amount");
amount.value = 1.0;

const flipBtn = document.querySelector(".flip-btn");
const convertBtn = document.querySelector(".convert-btn");

const exchangeOutput = document.querySelector("#exchange-output");
const resultDes = document.querySelector("#result-des");
const rateDes = document.querySelector("#rate-des");

const api = "01e89333e7d1583864b70ed7";

//creations of the right and left datalists from the exchangeRate API
function fetchCurrencies() {
  fetch(
    `https://v6.exchangerate-api.com/v6/${api}/latest/${leftCurrency.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      createDatalist(data["conversion_rates"]);
    });
}

function createDatalist(currencies) {
  const currenciesData = Object.keys(currencies);
  currenciesData.forEach(createDataListElement);
}

function createDataListElement(data) {
  let option = document.createElement("option");
  option.value = data;

  let option2 = option.cloneNode(true);
  dataListRight.append(option);
  dataListLeft.append(option2);
}

//conversion of pair currencies
function pairConversion(pairData) {
  let conversionRate = pairData["conversion_rate"];
  let conversionResult = pairData["conversion_result"];
  showOutput(conversionResult, conversionRate);
}

function performConversion() {
  if (amount.value && rightCurrency.value && leftCurrency.value) {
    fetch(
      `https://v6.exchangerate-api.com/v6/${api}/pair/${leftCurrency.value}/${rightCurrency.value}/${amount.value}`
    )
      .then((response) => response.json())
      .then((pairData) => pairConversion(pairData));
  }
}

function showOutput(conversionResult, conversionRate) {
  resultDes.innerText = `${amount.value} ${leftCurrency.value} is ${conversionResult} ${rightCurrency.value}`;
  rateDes.innerText = `conversion rate: 1 ${leftCurrency.value} = ${conversionRate} ${rightCurrency.value} `;
  exchangeOutput.classList.add("show");
  exchangeOutput.classList.remove("hidden");
}

function flipCurrencies() {
  let temp = leftCurrency.value;
  leftCurrency.value = rightCurrency.value;
  rightCurrency.value = temp;
  performConversion();
}

//events listeners

window.addEventListener("load", fetchCurrencies);
amount.addEventListener("input", performConversion);
rightCurrency.addEventListener("change", performConversion);
leftCurrency.addEventListener("change", performConversion);
convertBtn.addEventListener("click", performConversion);
flipBtn.addEventListener("click", flipCurrencies);

// todo :
// [] add tooltips to each input field
// [] style the entire color pallet
// [] add alert when no input is given
// [] maybe add the currencies native symbols
// [] datalist opens up problem
