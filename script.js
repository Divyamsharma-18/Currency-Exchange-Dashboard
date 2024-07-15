const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultText = document.getElementById('result-text');

let exchangeRates = {};
let lastFetched = 0;

function showLoading() {
    resultText.textContent = 'Loading...';
}

async function fetchExchangeRates() {
    showLoading(); 
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    exchangeRates = data.rates;
    populateCurrencyOptions(Object.keys(exchangeRates));
}

function populateCurrencyOptions(currencies) {
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });
}


convertBtn.addEventListener('click', () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;

    if (from && to && amountValue) {
        const rate = exchangeRates[to];
        const result = amountValue * rate;
        resultText.textContent = `${amountValue} ${from} = ${result.toFixed(2)} ${to}`;
    } else {
        resultText.textContent = 'Please fill in all fields';
    }
});

fetchExchangeRates();