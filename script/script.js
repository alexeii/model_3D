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
});
