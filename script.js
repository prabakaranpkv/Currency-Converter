const headDiv = document.createElement("div");
headDiv.className = "container-fluid";
headDiv.id = "headDiv";
document.body.append(headDiv);

const header = document.createElement("h1");
header.className = "header";
header.id = "header";
header.innerHTML = "Currency Exchange Rates";
headDiv.appendChild(header);

const subDiv = document.createElement("div");
subDiv.className = "subDiv";
subDiv.id = "subDiv";
headDiv.appendChild(subDiv);

const input1 = document.createElement("input");
input1.className = "input1";
input1.id = "input1";
input1.setAttribute("type", "number");
input1.setAttribute("onchange", "matchList()");
input1.setAttribute("value", "1");
input1.setAttribute("min", "0");
subDiv.appendChild(input1);

const input2 = document.createElement("select");
input2.className = "input2";
input2.id = "input2";
input2.setAttribute("onchange", "matchList()");
subDiv.appendChild(input2);

const subDiv2 = document.createElement("div");
subDiv2.className = "subDiv2";
subDiv2.id = "subDiv2";
headDiv.appendChild(subDiv2);

const input3 = document.createElement("input");
input3.className = "input3";
input3.id = "input3";
input3.setAttribute("type", "text");
input3.setAttribute("onchange", "matchList()");
input3.setAttribute("value", "1");
subDiv2.appendChild(input3);

const input4 = document.createElement("select");
input4.className = "input4";
input4.id = "input4";
input4.setAttribute("onchange", "matchList()");
subDiv2.appendChild(input4);

fetch(
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
)
  .then((ctn) => ctn.json())
  .then((ctn) => {
    country(ctn);
  })
  .catch((err) => console.log(err));

const country = (ctn) => {
  console.log(ctn);
  let countryList = Object.values(ctn);
  let countryKeys = Object.keys(ctn);
  for (let i in countryList) {
    var optionList1 = document.createElement("option");
    optionList1.setAttribute("value", countryKeys[i]);
    optionList1.innerHTML = countryList[i] + " (" + countryKeys[i] + ")";
    input2.append(optionList1);
  }
  for (let i in countryList) {
    var optionList2 = document.createElement("option");
    optionList2.setAttribute("value", countryKeys[i]);
    optionList2.innerHTML = countryList[i] + " (" + countryKeys[i] + ")";
    input4.append(optionList2);
  }
};

function countryList() {
  let country_1 = document.getElementById("input2").selectedIndex;
  let countryValue1 = document.getElementsByTagName("option")[country_1].value;
  let country_2 = document.getElementById("input4").selectedIndex;
  let countryValue2 = document.getElementsByTagName("option")[country_2].value;
  let value_1 = document.getElementById("input1").value;
  let value_2 = document.getElementById("input3").value;

  return {
    countryValue1,
    countryValue2,
    value_1,
    value_2,
  };
}

function matchList() {
  let countryValue = countryList();
  let ctryValue1 = countryValue.countryValue1;
  let ctryValue2 = countryValue.countryValue2;
  let numValue1 = countryValue.value_1;
  let numValue2 = countryValue.value_2;
  console.log(ctryValue1);
  console.log(ctryValue2);
  console.log(numValue1);
  console.log(numValue2);

  fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${ctryValue1}/${ctryValue2}.json`
  )
    .then((cncr) => cncr.json())
    .then((cncr) => convert(cncr));
}

function convert(cncr) {
  let inputVal = countryList();
  let inputValue1 = inputVal.value_1;
  let result1 = Object.values(cncr);
  let multiResult1 = inputValue1 * result1[1];
  document.getElementById("input3").value = multiResult1.toFixed(3);
}
