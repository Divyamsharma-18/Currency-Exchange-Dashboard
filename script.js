const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultText = document.getElementById('result-text');

let exchangeRates = {};
let lastFetched = 0;

function showLoading() {
    resultText.textContent = 'Money talks!';
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

function convertLive() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;

    if (from && to && amountValue) {
        const fromRate = exchangeRates[from];
        const toRate = exchangeRates[to];
        const result = (amountValue / fromRate) * toRate;
        const fromFlag = getFlagSvg(from);
        const toFlag = getFlagSvg(to);

        resultText.innerHTML = `
    <img src="${fromFlag}" width="24" style="vertical-align:middle; margin-right:6px; margin-bottom:4px;">
    ${amountValue} ${from} = ${+result.toFixed(5)} ${to}
    <img src="${toFlag}" width="24" style="vertical-align:middle; margin-left:6px; margin-bottom:4px;">`;
        resultText.classList.remove("placeholder");}
}

amount.addEventListener("input", convertLive);
fromCurrency.addEventListener("change", convertLive);
toCurrency.addEventListener("change", convertLive);

document.getElementById("swap-btn").addEventListener("click", () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    const swapIcon = document.getElementById("swap-icon");
    swapIcon.classList.add("flipping");
    setTimeout(() => {
        swapIcon.classList.remove("flipping");
    }, 400);
    convertLive();
});

const currencyToCountry = {
    USD: "us", EUR: "eu", GBP: "gb", INR: "in", PKR: "pk", AUD: "au", CAD: "ca", SGD: "sg", CHF: "ch", JPY: "jp", CNY: "cn", AED: "ae", SAR: "sa", QAR: "qa", KWD: "kw", BHD: "bh", OMR: "om", LKR: "lk", BDT: "bd", NPR: "np", AFN: "af", ALL: "al", DZD: "dz", AOA: "ao", ARS: "ar", AMD: "am", AWG: "aw", AZN: "az", BSD: "bs", BBD: "bb", BYN: "by", BZD: "bz", BTN: "bt", BOB: "bo", BAM: "ba", BWP: "bw", BRL: "br", BND: "bn", BGN: "bg", BIF: "bi", KHR: "kh", XAF: "cm", CVE: "cv", CLP: "cl", COP: "co", CDF: "cd", CRC: "cr", HRK: "hr", CUP: "cu", CZK: "cz", DKK: "dk", DJF: "dj", DOP: "do", EGP: "eg", ERN: "er", SZL: "sz", ETB: "et", FJD: "fj", GMD: "gm", GEL: "ge", GHS: "gh", GTQ: "gt", GNF: "gn", GYD: "gy", HTG: "ht", HNL: "hn", HKD: "hk", HUF: "hu", ISK: "is", IDR: "id", IRR: "ir", IQD: "iq", ILS: "il", JMD: "jm", JOD: "jo", KZT: "kz", KES: "ke", KPW: "kp", KRW: "kr", KGS: "kg", LAK: "la", LVL: "lv", LBP: "lb", LYD: "ly", MOP: "mo", MKD: "mk", MGA: "mg", MWK: "mw", MYR: "my", MVR: "mv", MUR: "mu", MXN: "mx", MDL: "md", MNT: "mn", MAD: "ma", MZN: "mz", MMK: "mm", NAD: "na", NPR: "np", ANG: "nl", TWD: "tw", NZD: "nz", NIO: "ni", NGN: "ng", NOK: "no", PAB: "pa", PGK: "pg", PYG: "py", PEN: "pe", PHP: "ph", PLN: "pl", RON: "ro", RUB: "ru", RWF: "rw", WST: "ws", STD: "st", SAR: "sa", RSD: "rs", SCR: "sc", SLL: "sl", SGD: "sg", SBD: "sb", SOS: "so", ZAR: "za", LKR: "lk", SDG: "sd", SRD: "sr", SEK: "se", SYP: "sy", TJS: "tj", TZS: "tz", THB: "th", TOP: "to", TTD: "tt", TND: "tn", TRY: "tr", TMT: "tm", UGX: "ug", UAH: "ua", AED: "ae", UYU: "uy", UZS: "uz", VUV: "vu", VEF: "ve", VND: "vn", YER: "ye", ZMW: "zm",
};

function getFlagSvg(currency) {
    const code = currencyToCountry[currency];
    return code ? `https://flagcdn.com/24x18/${code}.png` : "";
}

fetchExchangeRates();