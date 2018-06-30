
const currencies =
    ["AED",
        "AFN",
        "ALL",
        "AMD",
        "AOA",
        "ARS",
        "AUD",
        "AWG",
        "AZN",
        "BAM",
        "BBD",
        "BDT",
        "BGN",
        "BHD",
        "BIF",
        "BND",
        "BOB",
        "BRL",
        "BSD",
        "BTN",
        "BWP",
        "BYN",
        "BZD",
        "CAD",
        "CDF",
        "CHF",
        "CLP",
        "CNY",
        "COP",
        "CRC",
        "CUP",
        "CZK",
        "DJF",
        "DKK",
        "DOP",
        "DZD",
        "EGP",
        "ERN",
        "ETB",
        "EUR",
        "FJD",
        "GBP",
        "GEL",
        "GHS",
        "GIP",
        "GMD",
        "GNF",
        "GTQ",
        "GYD",
        "HKD",
        "HNL",
        "HRK",
        "HTG",
        "HUF",
        "IDR",
        "ILS",
        "INR",
        "IQD",
        "IRR",
        "ISK",
        "JMD",
        "JOD",
        "JPY",
        "KES",
        "KGS",
        "KHR",
        "KMF",
        "KPW",
        "KRW",
        "KWD",
        "KYD",
        "KZT",
        "LAK",
        "LBP",
        "LKR",
        "LRD",
        "LSL",
        "LVL",
        "LYD",
        "MAD",
        "MDL",
        "MGA",
        "MKD",
        "MMK",
        "MNT",
        "MOP",
        "MRO",
        "MUR",
        "MVR",
        "MWK",
        "MXN",
        "MYR",
        "MZN",
        "NAD",
        "NGN",
        "NIO",
        "NOK",
        "NPR",
        "NZD",
        "OMR",
        "PAB",
        "PEN",
        "PGK",
        "PHP",
        "PKR",
        "PLN",
        "PYG",
        "QAR",
        "RON",
        "RSD",
        "RUB",
        "RWF",
        "SAR",
        "SBD",
        "SCR",
        "SDG",
        "SEK",
        "SGD",
        "SHP",
        "SLL",
        "SOS",
        "SRD",
        "STD",
        "SYP",
        "SZL",
        "THB",
        "TJS",
        "TMT",
        "TND",
        "TOP",
        "TRY",
        "TTD",
        "TWD",
        "TZS",
        "UAH",
        "UGX",
        "USD",
        "UYU",
        "UZS",
        "VEF",
        "VND",
        "VUV",
        "WST",
        "XAF",
        "XCD",
        "XOF",
        "XPF",
        "YER",
        "ZAR",
        "ZMW"];

function fillOptions (currencies) {
    let currs = document.getElementById("currs");
    let currsTo = document.getElementById("currsTo");
    currencies.forEach(curr => {
        let option = document.createElement("option");
        option.innerText = curr;
        option.setAttribute("value", curr);
        let optionClone = option.cloneNode(true);
        currs.appendChild(option);
        currsTo.appendChild(optionClone);
    } )
}


function makeRequest () {
    let from = document.getElementById("currs").value;
    let to = document.getElementById("currsTo").value;
    let value = document.getElementById("myinput").value;
    let result = document.getElementById("result");
    let query = `${from}_${to}`
    fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`)
        .then(res => res.json())
        .then(data => {
            let cRate = data[query];
            result.innerText = parseInt(value) * parseFloat(cRate) + " " + to
            idbKeyval.set(query,data[query])
        })
        .catch(err => {
            return idbKeyval.get(query).then(cRate => {
                if (cRate) return result.innerText = parseInt(value) * parseFloat(cRate) + " " + to;
                return result.innerText = "Currency wasn't saved before!"
            })

        })
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {

        if(reg.installing) {
            console.log('Service worker installing');
        } else if(reg.waiting) {
            console.log('Service worker installed');
        } else if(reg.active) {
            console.log('Service worker active');
        }

    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}


fillOptions(currencies);