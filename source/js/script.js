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

  myPlacemark = new ymaps.Placemark(
    [59.93863506417266, 30.323117499999945],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/map/mapPin.png",
      iconImageSize: [113, 106],
      iconImageOffset: [-60, -105],
    }
  );

  myMap.geoObjects.add(myPlacemark);
});

//Slider

let sliderButtonLeft = document.querySelector(".slider__button--left");
let sliderButtonRight = document.querySelector(".slider__button--right");
let slideLeft = document.querySelector(".slider__indication-bar--left");
let slideRight = document.querySelector(".slider__indication-bar--right");
let fatCat = document.querySelector(".slider-slide--one");
let skinnyCat = document.querySelector(".slider-silde--two");
let centerBar = document.querySelector(".slider__indication-bar--center");
let slideOne = document.querySelector(".slider-slide--one");
let slideTwo = document.querySelector(".slider-silde--two");

sliderButtonRight.addEventListener("click", function (evt) {
  evt.preventDefault();
  skinnyCat.classList.remove("slider__off");
  fatCat.classList.add("slider__off");
  slideRight.style = "background-color: #68b738;";
  slideLeft.style = "background-color: white";
  centerBar.style = "left: 402px";
  slideTwo.style = "width: 659px";
});

sliderButtonLeft.addEventListener("click", function (evt) {
  evt.preventDefault();
  skinnyCat.classList.add("slider__off");
  fatCat.classList.remove("slider__off");
  slideRight.style = "background-color: white;";
  slideLeft.style = "background-color :#68b738";
  centerBar.style = "left: 0px";
  slideTwo.style = "width: 0px";
});

//Slider desctop

(function ($) {
  let $dragMe = $(".slider__indication-bar--center"),
    $container = $(".slider--wrap"),
    $viewAfter = $(".slider-silde--two");

  $dragMe.draggable({
    containment: "parent",
    axis: "x",
    drag: function () {
      $viewAfter.css({
        width: parseFloat($(this).css("left") + 145) * 1.64,
      });
    },
  });

  function animateTo(_left) {
    $dragMe.animate(
      {
        left: _left,
      },
      "slow",
      "linear"
    );

    $viewAfter.animate(
      {
        width: _left,
      },
      "slow",
      "linear"
    );
  }
})(jQuery);
