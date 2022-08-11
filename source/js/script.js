//menu

const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".page-header__toggle");

navToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (navMain.classList.contains("main-nav--close")) {
    navMain.classList.remove("main-nav--close");
    navToggle.classList.remove("page-header__toggle--open");
    navToggle.classList.add("page-header__toggle--close");
  } else {
    navMain.classList.add("main-nav--close");
    navToggle.classList.add("page-header__toggle--open");
    navToggle.classList.remove("page-header__toggle--close");
  }
});

//InputMask

var maskedInputs = document.querySelectorAll("[data-mask]");

for (var index = 0; index < maskedInputs.length; index++) {
  maskedInputs[index].addEventListener("input", maskInput);
}

function maskInput() {
  var input = this;
  var mask = input.dataset.mask;
  console.log(mask);
  var value = input.value;
  var literalPattern = /[0\*]/;
  var numberPattern = /[0-9]/;
  var newValue = "";
  try {
    var maskLength = mask.length;
    var valueIndex = 0;
    var maskIndex = 0;

    for (; maskIndex < maskLength; ) {
      if (maskIndex >= value.length) break;

      if (
        mask[maskIndex] === "0" &&
        value[valueIndex].match(numberPattern) === null
      )
        break;

      // Found a literal
      while (mask[maskIndex].match(literalPattern) === null) {
        if (value[valueIndex] === mask[maskIndex]) break;
        newValue += mask[maskIndex++];
      }
      newValue += value[valueIndex++];
      maskIndex++;
    }

    input.value = newValue;
  } catch (e) {
    console.log(e);
  }
}

///Map
ymaps.ready(function () {
  var myMap = new ymaps.Map("yaMap", {
    center: [59.93863506417266, 30.323117499999945],
    zoom: 19,
    controls: [],
  });
  map.controls.remove("geolocationControl"); 
  map.controls.remove("searchControl"); 
  map.controls.remove("trafficControl"); 
  map.controls.remove("typeSelector"); /
  map.controls.remove("fullscreenControl");
  map.controls.remove("zoomControl"); 
  map.controls.remove("rulerControl"); 
});
