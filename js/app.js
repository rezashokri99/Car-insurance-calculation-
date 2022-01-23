// variables //

// form
let form = document.querySelector("#request-quote");

// type car
let typeCarSelect = document.querySelector("#make");

// access to the year select
let yearSelect = document.querySelector("#year");

// access to Type of insurance
let typeInsurance = document.querySelector("input[name= 'level']:checked");

// classess //

// class Html Ui
class HtmlUi {
  constructor() {}

  // method show year for add options year to year select
  showYear() {
    // build child of ConvertDate
    let convertDate1 = new ConvertDate();
    // get persian year
    let year = convertDate1.getPersianDate();

    // max year of Year of construction
    let maxYear = year;
    // min year of Year of construction
    let minYear = year - 20;

    // loop on max year and min year for add to ui
    for (let i = maxYear; i >= minYear; i--) {
      let yearOption = document.createElement("option");
      yearOption.textContent = i;

      yearSelect.appendChild(yearOption);
    }
  }

  // method submit form when click on calculate price
  submitForm() {
    // if everyinput is null build error message
    if (
      typeCarSelect.value == "" ||
      yearSelect.value == "" ||
      typeInsurance.value == ""
    ) {
      this.showError("لطفا تمامی مقادیر را وارد کنید");

      // else everyinput isn't null proceed
    } else {
      // base price
      let base = 2000000;

      let price;

      // call typeCalculate method
      price = this.typeCalculate(base);

      // call yearCalculate method
      price = this.yearCalculate(price);

      // call typeInsuranceCalculate method
      price = this.typeInsuranceCalculate(price);

      // call showResult method
      htmlUi.showResult(price);
    }
  }

  // method show error
  showError(message) {
    // build div tag
    let div = document.createElement("div");

    // add message to textContent div
    div.textContent = message;

    // add class error to div
    div.classList = "error";

    // add div to ui , before first form group
    form.insertBefore(div, document.querySelector(".form-group"));

    // remove error after 2 seconds
    setTimeout(() => {
      div.remove();
    }, 2000);
  }

  // method calculate type car
  typeCalculate(base) {
    let price;
    // if typeCarSelect.value ...
    switch (typeCarSelect.value) {
      case "1":
        price = base * 1.3;
        break;

      case "2":
        price = base * 1.8;
        break;

      case "3":
        price = base * 2.8;
        break;
    }

    return price;
  }

  // method calculate build year
  yearCalculate(price) {
    // get this year
    let year = convertDate1.getPersianDate();

    // get difference this year and car build year
    let difference = year - yearSelect.value;

    // calculate price with build year
    price = price - ((difference * 3) / 100) * price;

    return price;
  }

  // method calculate type insurance
  typeInsuranceCalculate(price) {
    // access to Type of insurance
    let typeInsurance = document.querySelector("input[name= 'level']:checked");

    // if typeInsurance.value ...
    switch (typeInsurance.value) {
      case "basic":
        price = price * 1.3;
        break;

      case "complete":
        price = price * 1.6;
        break;

      case "3":
        price = base * 2.8;
        break;
    }

    return price;
  }

  // method showResult to ui
  showResult(price) {
    // access to the result tag in html
    let result = document.querySelector("#result");

    let div = document.createElement("div");

    // calculate type car
    let name;
    switch (typeCarSelect.value) {
      case "1":
        name = "پراید";
        break;

      case "2":
        name = "اپتیما";
        break;

      case "3":
        name = "پورشه";
        break;

      default:
        break;
    }

    // calculate type insurance
    let level;
    switch (typeInsurance.value) {
      case "basic":
        level = "ساده";
        break;
      case "complete":
        level = "کامل";
        break;

      default:
        break;
    }

    // build factor
    div.innerHTML = `
        <p class= "header">خلاصه فاکتور</p>
        <p>مدل ماشین: ${name}</p>
        <p>سال ساخت: ${yearSelect.value}</p>
        <p>نوع بیمه: ${level}</p>
        <p class="total">قیمت نهایی: ${price}</p>
    `;

    // enable loading before show factor
    let loading = document.querySelector("#loading img");
    loading.style.display = "block";

    setTimeout(() => {
      // disable loading
      loading.style.display = "none";

      // add factor to ui
      result.innerHTML = "";
      result.appendChild(div);
    }, 1000);
  }
}

// class convart date
class ConvertDate {
  constructor() {}

  // method get persian date
  getPersianDate() {
    let persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ],
      arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ],
      fixNumbers = function (str) {
        if (typeof str === "string") {
          for (var i = 0; i < 10; i++) {
            str = str
              .replace(persianNumbers[i], i)
              .replace(arabicNumbers[i], i);
          }
        }
        return str;
      };

    let year = new Date().toLocaleDateString("fa-IR");
    year = year.slice(0, 4);

    return fixNumbers(year);
  }
}

// childs classes //



// build child of HtmlUi
let htmlUi = new HtmlUi();
// call showYear method of HtmlUi
htmlUi.showYear();

// build child of ConvertDate
let convertDate1 = new ConvertDate();
// call getPersianDate method of ConvertDate
convertDate1.getPersianDate();




// listeners //


// listener when load page
document.addEventListener("DOMContentLoaded", () => {
  htmlUi.showYear();
});


// listener when submit form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  htmlUi.submitForm();
});
