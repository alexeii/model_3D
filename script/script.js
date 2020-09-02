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
    const closeBtn = document.querySelector(".close-btn");
    const menuItem = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);
    closeBtn.addEventListener("click", handlerMenu);

    menuItem.forEach((item) => item.addEventListener("click", handlerMenu));
  };
  toggleMenu();

  //popup
  const togglePopup = () => {
    const popup = document.querySelector(".popup");
    const popupBtn = document.querySelectorAll(".popup-btn");
    const popUpClose = document.querySelector(".popup-close");
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

    popUpClose.addEventListener("click", () => {
      popup.style.display = "none";
      count = 0;
    });
  };

  togglePopup();
});
