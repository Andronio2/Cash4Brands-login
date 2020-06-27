// ==UserScript==
// @name         Cash4Brands login
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Автоматический вход в кэшбэк Cash4Brands
// @author       Andronio
// @homepage     https://github.com/Andronio2/Cash4Brands-login
// @supportURL   https://github.com/Andronio2/Cash4Brands-login
// @updateURL    https://github.com/Andronio2/Cash4Brands-login/raw/master/Cash4Brands%20login.user.js
// @downloadURL  https://github.com/Andronio2/Cash4Brands-login/raw/master/Cash4Brands%20login.user.js
// @match        https://cash4brands.ru/
// @match        https://cash4brands.ru/cashback/aliexpress/
// @match        https://cash4brands.ru/gotoshop/25/
// @grant        none
// ==/UserScript==
let delayTimeoutCash4Brands = 300;
(function repeat() {
    'use strict';
// Начинать править здесь

let loginEmail = "login";
let loginPassw = "pass";

/*
 * Дальше не трогать
 */

    if (location.href == "https://cash4brands.ru/") {
        let avatar = document.querySelector(".user-info-avatar");
        let register = document.querySelector(".auth-btn");
        if (document.querySelector(".loader")) return setTimeout(repeat, 100);
        if (!avatar && !register) {
            if (--delayTimeoutCash4Brands) return setTimeout(repeat, 100);
            return;
        }

        if (register) {
            let step = localStorage.getItem("step");
            if (!step || step == "0") {
                localStorage.setItem("step", "1");
                document.querySelector(".auth-btn").click();
                delayTimeoutCash4Brands = 100;
                return setTimeout(repeat, 200);
            }
            if (step == "1") {
                let btns = document.querySelectorAll('.modal-body .form-wrapper button');
                if (!btns.length) {
                    if (--delayTimeoutCash4Brands) return setTimeout(repeat, 100);
                    return;
                }
                localStorage.setItem("step", "2");
                btns[1].click();
                return setTimeout(repeat, 200);
            }
            if (step == "2") {
                localStorage.setItem("step", "0");
                let inp = document.querySelectorAll('.modal-body .form-wrapper input');
                inp[0].value = loginEmail;
                inp[0].dispatchEvent(new Event('input'));
                inp[1].value = loginPassw;
                inp[1].dispatchEvent(new Event('input'));
                document.querySelector('.modal-body .form-wrapper button').click();
                return setTimeout(repeat, 500);
            }
        }
        if (avatar) {
            location.href = "https://cash4brands.ru/gotoshop/25/";
            return;
        }
    }
    if (location.href == "https://cash4brands.ru/cashback/aliexpress/") {
        document.querySelector('.goshop_btn_wrap .button.tooltip').click();
    }
    if (location.href == "https://cash4brands.ru/gotoshop/25/") {
        document.querySelector('.button').click();
    }
})();
