const navMain=document.querySelector(".main-nav"),navToggle=document.querySelector(".page-header__toggle");navToggle.addEventListener("click",(function(e){e.preventDefault(),navMain.classList.contains("main-nav--close")?(navMain.classList.remove("main-nav--close"),navToggle.classList.remove("page-header__toggle--open"),navToggle.classList.add("page-header__toggle--close")):(navMain.classList.add("main-nav--close"),navToggle.classList.add("page-header__toggle--open"),navToggle.classList.remove("page-header__toggle--close"))}));for(var maskedInputs=document.querySelectorAll("[data-mask]"),index=0;index<maskedInputs.length;index++)maskedInputs[index].addEventListener("input",maskInput);function maskInput(){var e=this,t=e.dataset.mask;console.log(t);var a=e.value,n=/[0\*]/,l=/[0-9]/,s="";try{for(var i=t.length,o=0,r=0;r<i&&!(r>=a.length)&&("0"!==t[r]||null!==a[o].match(l));){for(;null===t[r].match(n)&&a[o]!==t[r];)s+=t[r++];s+=a[o++],r++}e.value=s}catch(e){console.log(e)}}ymaps.ready((function(){var e=new ymaps.Map("yaMap",{center:[59.93863506417266,30.323117499999945],zoom:19,controls:[]});myPlacemark=new ymaps.Placemark([59.93863506417266,30.323117499999945],{},{iconLayout:"default#image",iconImageHref:"img/map/mapPin.png",iconImageSize:[113,106],iconImageOffset:[-60,-105]}),e.geoObjects.add(myPlacemark)}));let sliderButtonLeft=document.querySelector(".slider__button--left"),sliderButtonRight=document.querySelector(".slider__button--right"),slideLeft=document.querySelector(".slider__indication-bar--left"),slideRight=document.querySelector(".slider__indication-bar--right"),fatCat=document.querySelector(".slider-slide--one"),skinnyCat=document.querySelector(".slider-silde--two"),centerBar=document.querySelector(".slider__indication-bar--center"),slideOne=document.querySelector(".slider-slide--one"),slideTwo=document.querySelector(".slider-silde--two");sliderButtonRight.addEventListener("click",(function(e){e.preventDefault(),skinnyCat.classList.remove("slider__off"),fatCat.classList.add("slider__off"),slideRight.style="background-color: #68b738;",slideLeft.style="background-color: white",centerBar.style="left: 402px",slideTwo.style="width: 659px"})),sliderButtonLeft.addEventListener("click",(function(e){e.preventDefault(),skinnyCat.classList.add("slider__off"),fatCat.classList.remove("slider__off"),slideRight.style="background-color: white;",slideLeft.style="background-color :#68b738",centerBar.style="left: 0px",slideTwo.style="width: 0px"})),function(e){let t=e(".slider__indication-bar--center"),a=(e(".slider--wrap"),e(".slider-silde--two"));t.draggable({containment:"parent",axis:"x",drag:function(){a.css({width:1.64*parseFloat(e(this).css("left")+145)})}})}(jQuery);