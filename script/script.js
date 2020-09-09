window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  //Timer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector("#timer-hours");
    const timerMinutes = document.querySelector("#timer-minutes");
    const timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime();
      const dateNow = new Date().getTime();
      const timeRemaining = (dateStop - dateNow) / 1000;
      const seconds = Math.floor(timeRemaining % 60);
      const minutes = Math.floor((timeRemaining / 60) % 60);
      const hours = Math.floor(timeRemaining / 60 / 60); //% 24
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }

    function updateClock() {
      const timer = getTimeRemaining();
      if (timer.hours < 10) {
        timerHours.textContent = "0" + timer.hours;
      } else {
        timerHours.textContent = timer.hours;
      }
      if (timer.minutes < 10) {
        timerMinutes.textContent = "0" + timer.minutes;
      } else {
        timerMinutes.textContent = timer.minutes;
      }
      if (timer.seconds < 10) {
        timerSeconds.textContent = "0" + timer.seconds;
      } else {
        timerSeconds.textContent = timer.seconds;
      }
      if (timer.timeRemaining > 0) {
        // eslint-disable-next-line no-use-before-define
        clearInterval(idTimeout);
      } else if (timer.timeRemaining <= 0) {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }
    }

    const idTimeout = setInterval(updateClock, 1000);
  };

  setInterval(countTimer, 1000, "01 october 2020");

  //меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu");
    const menu = document.querySelector("menu");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);

    menu.addEventListener("click", (event) => {
      const target = event.target;
      if (target.matches(".close-btn") || target.closest("ul>li")) {
        handlerMenu();
      }
    });
  };

  toggleMenu();

  //popup
  const togglePopup = () => {
    const popup = document.querySelector(".popup");
    const popupBtn = document.querySelectorAll(".popup-btn");
    const popupContent = document.querySelector(".popup-content");
    let count = 0;
    let butInteval;

    const popUpMove = function () {
      butInteval = requestAnimationFrame(popUpMove);
      count++;

      if (count < 100) {
        popupContent.style.top = count + "px";
      } else {
        cancelAnimationFrame(butInteval);
      }
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.display = "block";
        if (window.innerWidth > 768) {
          popupContent.style.top = 0 + "px";
          butInteval = requestAnimationFrame(popUpMove);
        }
      });
    });

    popup.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
        count = 0;
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          popup.style.display = "none";
          count = 0;
        }
      }
    });
  };

  togglePopup();

  //табы

  const tabs = () => {
    const tabHeader = document.querySelector(".service-header");
    const tab = tabHeader.querySelectorAll(".service-header-tab");
    const tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  //Слайдер портфолио
  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item");
    const slider = document.querySelector(".portfolio-content");
    const portfoliDots = document.querySelector(".portfolio-dots");
    const dot = [];
    for (let i = 0; i < slide.length; i++) {
      const newDot = document.createElement("li");
      newDot.className = "dot";
      dot[i] = newDot;
      portfoliDots.append(dot[i]);
    }
    dot[0].classList.add("dot-active");
    let currentSlide = 0;
    let interval;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;
      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });
    startSlide(1500);
  };

  slider();

  //Изменение фото при наведении мышки в блоке Наша команда
  const command = document.querySelector(".command");
  const colPhotoChange = command.querySelectorAll(".command__photo");
  const togglePhoto = (target) => {
    const newsrc = target.src;
    target.src = target.dataset.img;
    target.dataset.img = newsrc;
  };
  colPhotoChange.forEach((item) => {
    item.addEventListener("mouseenter", (event) => {
      togglePhoto(event.target);
    });
    item.addEventListener("mouseleave", (event) => {
      togglePhoto(event.target);
    });
  });

  //Ввод только цифр в блоке калькулятор
  const calcBlock = document.querySelector(".calc-block");
  const calcItemInput = calcBlock.querySelectorAll("input");
  calcItemInput.forEach((item) => {
    item.addEventListener("keyup", () => {
      item.value = item.value.replace(/[^\d]/g, "");
    });
  });

  //калькулятор
  const calc = (price = 100) => {
    const calcType = document.querySelector(".calc-type");
    const calcSquare = document.querySelector(".calc-square");
    const calcCount = document.querySelector(".calc-count");
    const calcDay = document.querySelector(".calc-day");
    const totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      let start = 0;
      const timer = setInterval(() => {
        totalValue.textContent = start++;
        if (start > total) {
          clearInterval(timer);
        }
      });

      //totalValue.textContent = total;
    };

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;
      if (
        target === calcType ||
        target === calcSquare ||
        target === calcCount ||
        target === calcDay
      ) {
        countSum();
      }
    });
  };
  calc(100);
});
