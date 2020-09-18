"use strict";

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

//Timer
countTimer("01 october 2020");
setInterval(countTimer, 1000, "01 october 2020");

//меню

toggleMenu();

//popup

togglePopup();

//табы

tabs();

//Слайдер портфолио

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
calc(100);

//валидация данных

const userNameValid = document.querySelectorAll("input[name='user_name']");
const userPhoneValid = document.querySelectorAll("input[name='user_phone']");
const userMessageValid = document.querySelector("input[name='user_message']");

userNameValid.forEach((item) => {
    item.addEventListener("keyup", () => {
        item.value = item.value.replace(/[^а-я ]/gi, "");
    });
});
userMessageValid.addEventListener("keyup", () => {
    userMessageValid.value = userMessageValid.value.replace(/[^а-я \,\.\?\!]/gi, "");
});

userPhoneValid.forEach((item) => {
    item.maxLength = 12;
    item.addEventListener("keyup", () => {
        item.value = item.value.replace(/[^\d\+]/g, "");
    });
});



//send-ajax-form

sendForm();