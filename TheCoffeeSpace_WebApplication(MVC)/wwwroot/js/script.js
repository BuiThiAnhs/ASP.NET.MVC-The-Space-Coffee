"use strict";
// Login Interaction
const loginBtn = document.querySelector("#login-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const usernameIn = document.querySelector("#userid");
const emailIn = document.querySelector("#emailid");
const usernameOut = document.querySelector("#username-display");
const usernameOutNavBar = document.querySelector(".sign-in");
const signUpNavBar = document.querySelector(".sign-up");
const slashNavBar = document.querySelector("#slash");
const passwordIn = document.querySelector("#pswrd");
const loginForm = document.querySelector("#login-form");

function checkUsername() {
  let password = passwordIn.value;
  if (usernameIn.value === "") {
    usernameOut.innerHTML = "Please enter a username.";
  } else if (password.length < 8) {
    usernameOut.innerHTML =
      "Please enter a password that is at least 8 character long.";
  } else {
    Storage.setUsername(usernameIn.value);
    location.reload();
    if (usernameIn.value == "E-commerce") {
      window.open("https://lchua2314.github.io/E-commerce-Website/index.html");
      alert("Thanks for looking at the code! :)");
    }
  }
}


function createNewUsername() {
  let password = passwordIn.value,
    email = emailIn.value;
  if (!validateEmail(email)) {
    usernameOut.innerHTML = "Please enter a valid email address.";
  } else if (usernameIn.value === "") {
    usernameOut.innerHTML = "Please enter a username.";
  } else if (password.length < 8) {
    usernameOut.innerHTML =
      "Please enter a password that is at least 8 character long.";
  } else {
    Storage.setUsername(usernameIn.value);
    location.reload();
  }
}

function validateEmail(inputEmail) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(inputEmail).toLowerCase());
}

class Storage {
  static setUsername(inputUsername) {
    localStorage.setItem("username", inputUsername);
  }
  static getUsername() {
    return localStorage.getItem("username");
  }
  static setPassword(inputPassword) {
    localStorage.setItem("password", inputPassword);
  }
  static getPassword() {
    return localStorage.getItem("password");
  }
  static setAmount(itemName, itemAmount) {
    localStorage.setItem(itemName, itemAmount.toString());
  }
  static removeAmount(itemName) {
    localStorage.removeItem(itemName);
  }
}

let currUser = Storage.getUsername();
if (currUser) {
  usernameOutNavBar.innerHTML = '<i class="fas fa-user"></i> ' + currUser;
  signUpNavBar.innerHTML = "";
  slashNavBar.innerHTML = "";
  if (loginForm) {
    loginForm.innerHTML = "";
    usernameOut.innerHTML =
      'Currently logged in as: <br> <i class="fas fa-user"></i> ' + currUser;
  }
}

if (loginBtn) {
  if (!currUser) {
    loginBtn.addEventListener("click", checkUsername);
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  } else {
    loginBtn.innerHTML = "Sign Out";
    loginBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      location.reload();
    });
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}

if (signUpBtn) {
  if (!currUser) {
    signUpBtn.addEventListener("click", createNewUsername);
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  } else {
    signUpBtn.innerHTML = "Sign Out";
    signUpBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      location.reload();
    });
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}

// Navbar Mobile
const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn__burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".menu-nav__item");

let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    hamburger.classList.add("open");
    nav.classList.add("open");
    menuNav.classList.add("open");
    html.classList.add("no-scroll");
    navItems.forEach((item) => item.classList.add("open"));

    showMenu = true;
  } else {
    hamburger.classList.remove("open");
    nav.classList.remove("open");
    menuNav.classList.remove("open");
    html.classList.remove("no-scroll");
    navItems.forEach((item) => item.classList.remove("open"));

    showMenu = false;
  }
}


// Shopping Cart Open and Close Function
const html = document.querySelector("html");
const cart = document.querySelector(".cart");
const cartOpenBtn = document.querySelector(".cart__openBtn");
const cartCloseBtn = document.querySelector(".cart__closeBtn");
const cartOverlay = document.querySelector(".cart-overlay");

cartOpenBtn.addEventListener("click", function () {
  cart.classList.add("showcart");
  cartOverlay.classList.add("transparentBcg");
  html.classList.add("no-scroll");
});

cartCloseBtn.addEventListener("click", function () {
  cart.classList.remove("showcart");
  cartOverlay.classList.remove("transparentBcg");
  html.classList.remove("no-scroll");
});

// Shopping Cart Adding Items to Cart
const total = document.querySelector(".total");
const pay = document.querySelector(".pay");
let totalAmount;

// Establish totalAmount in local storage if not there already.
if (!localStorage.getItem("total")) {
  localStorage.setItem("total", "0");
} else {
  totalAmount = parseFloat(localStorage.getItem("total"));
  updateTotal(0);
}

/**
 * Updates total in the local storage and class "total" in the DOM
 * @param {Float} moneyChange
 */
function updateTotal(moneyChange) {
    totalAmount += moneyChange;
    localStorage.setItem("total", totalAmount.toString());
    if (totalAmount > 1) {
        total.innerHTML = `<span class="span-primary">Total Amount:</span> ${(totalAmount / 1000).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND`;
        if (currUser != "" && currUser != null) { 
            pay.innerHTML += 'Pay';
            pay.style.opacity = "1";
        }
    } else {
        total.innerHTML = `<br>
      <br>
      Your Shopping Cart is empty. <br>
        Add items to cart by hovering over / tapping on the images of products
    on the Menu page.`;
        pay.innerHTML = '';
        pay.style.opacity = "0";
    }
}

/* Item displays in the DOM */

// Item Display: Item 1:
const item1Display = document.querySelector(".item1-display");
let item1Counter, item1Amount, up1, down1, remove1;
if (localStorage.getItem("item1")) {
  item1Counter = parseInt(localStorage.getItem("item1"));
} else {
  item1Counter = 0;
}

// Item Display: Item 2:
const item2Display = document.querySelector(".item2-display");
let item2Counter, item2Amount, up2, down2, remove2;
if (localStorage.getItem("item2")) {
  item2Counter = parseInt(localStorage.getItem("item2"));
} else {
  item2Counter = 0;
}

// Item Display: Item 3:
const item3Display = document.querySelector(".item3-display");
let item3Counter, item3Amount, up3, down3, remove3;
if (localStorage.getItem("item3")) {
  item3Counter = parseInt(localStorage.getItem("item3"));
} else {
  item3Counter = 0;
}

// Item Display: Item 4:
const item4Display = document.querySelector(".item4-display");
let item4Counter, item4Amount, up4, down4, remove4;
if (localStorage.getItem("item4")) {
  item4Counter = parseInt(localStorage.getItem("item4"));
} else {
  item4Counter = 0;
}

// Item Display: Item 5:
const item5Display = document.querySelector(".item5-display");
let item5Counter, item5Amount, up5, down5, remove5;
if (localStorage.getItem("item5")) {
  item5Counter = parseInt(localStorage.getItem("item5"));
} else {
  item5Counter = 0;
}

// Item Display: Item 6:
const item6Display = document.querySelector(".item6-display");
let item6Counter, item6Amount, up6, down6, remove6;
if (localStorage.getItem("item6")) {
  item6Counter = parseInt(localStorage.getItem("item6"));
} else {
  item6Counter = 0;
}

// Item Display: Item 7:
const item7Display = document.querySelector(".item7-display");
let item7Counter, item7Amount, up7, down7, remove7;
if (localStorage.getItem("item7")) {
  item7Counter = parseInt(localStorage.getItem("item7"));
} else {
  item7Counter = 0;
}

// Item Display: Item 8:
const item8Display = document.querySelector(".item8-display");
let item8Counter, item8Amount, up8, down8, remove8;
if (localStorage.getItem("item8")) {
  item8Counter = parseInt(localStorage.getItem("item8"));
} else {
  item8Counter = 0;
}

// Item Display: Item 9:
const item9Display = document.querySelector(".item9-display");
let item9Counter, item9Amount, up9, down9, remove9;
if (localStorage.getItem("item9")) {
  item9Counter = parseInt(localStorage.getItem("item9"));
} else {
  item9Counter = 0;
}

// Item Display: Item 10:
const item10Display = document.querySelector(".item10-display");
let item10Counter, item10Amount, up10, down10, remove10;
if (localStorage.getItem("item10")) {
  item10Counter = parseInt(localStorage.getItem("item10"));
} else {
  item10Counter = 0;
}

// Item Display: Item 11:
const item11Display = document.querySelector(".item11-display");
let item11Counter, item11Amount, up11, down11, remove11;
if (localStorage.getItem("item11")) {
  item11Counter = parseInt(localStorage.getItem("item11"));
} else {
  item11Counter = 0;
}

// Item Display: Item 12:
const item12Display = document.querySelector(".item12-display");
let item12Counter, item12Amount, up12, down12, remove12;
if (localStorage.getItem("item12")) {
  item12Counter = parseInt(localStorage.getItem("item12"));
} else {
  item12Counter = 0;
}

// Tests whether or not person is on the Menu page
if (document.querySelector(".one__cart__button")) {
      // Item 1:
      const uPrice1 = document.getElementById("item-price1").innerHTML.toString().match(/\d+/g);
      const price1 = uPrice1.toString().replace(/,/g, "");
      const item1Button = document.querySelector(".one__cart__button");

      item1Button.addEventListener("click", function () {
        if (!localStorage.getItem("item1")) {
          initializeItem1();
        }
        item1Counter++;
        item1Amount.innerHTML = item1Counter;
          updateTotal(parseInt(price1));
        Storage.setAmount("item1", item1Counter);
      });

  // Item 2:
      const uPrice2 = document.getElementById("item-price2").innerHTML.toString().match(/\d+/g);
      const price2 = uPrice2.toString().replace(/,/g, "");
      const item2Button = document.querySelector(".two__cart__button");

      item2Button.addEventListener("click", function () {
            if (!localStorage.getItem("item2")) {
                initializeItem2();
            }
            item2Counter++;
            item2Amount.innerHTML = item2Counter;
            updateTotal(parseInt(price2));
            Storage.setAmount("item2", item2Counter);
      });

    // Item 3:
      const uPrice3 = document.getElementById("item-price3").innerHTML.toString().match(/\d+/g)
      const price3 = uPrice3.toString().replace(/,/g, "");
      const item3Button = document.querySelector(".three__cart__button");

      item3Button.addEventListener("click", function () {
            if (!localStorage.getItem("item3")) {
                initializeItem3();
            }
            item3Counter++;
            item3Amount.innerHTML = item3Counter;
            updateTotal(parseInt(price3));
            Storage.setAmount("item3", item3Counter);
      });

    // Item 4:
    const uPrice4 = document.getElementById("item-price4").innerHTML.toString().match(/\d+/g)
    const price4 = uPrice4.toString().replace(/,/g, "");
    const item4Button = document.querySelector(".four__cart__button");

    item4Button.addEventListener("click", function () {
        if (!localStorage.getItem("item4")) {
            initializeItem4();
        }
        item4Counter++;
        item4Amount.innerHTML = item4Counter;
        updateTotal(parseInt(price4));
        Storage.setAmount("item4", item4Counter);
    });

    // Item 5:
    const uPrice5 = document.getElementById("item-price5").innerHTML.toString().match(/\d+/g)
    const price5 = uPrice5.toString().replace(/,/g, "");
    const item5Button = document.querySelector(".five__cart__button");

    item5Button.addEventListener("click", function () {
        if (!localStorage.getItem("item5")) {
            initializeItem5();
        }
        item5Counter++;
        item5Amount.innerHTML = item5Counter;
        updateTotal(parseInt(price5));
        Storage.setAmount("item5", item5Counter);
    });

    // Item 6:
    const uPrice6 = document.getElementById("item-price6").innerHTML.toString().match(/\d+/g)
    const price6 = uPrice6.toString().replace(/,/g, "");
    const item6Button = document.querySelector(".six__cart__button");


    item6Button.addEventListener("click", function () {
        if (!localStorage.getItem("item6")) {
            initializeItem6();
        }
        item6Counter++;
        item6Amount.innerHTML = item6Counter;
        updateTotal(parseInt(price6));
        Storage.setAmount("item6", item6Counter);
    });

    // Item 7:
    const uPrice7 = document.getElementById("item-price7").innerHTML.toString().match(/\d+/g)
    const price7 = uPrice7.toString().replace(/,/g, "");
    const item7Button = document.querySelector(".seven__cart__button");

    item7Button.addEventListener("click", function () {
        if (!localStorage.getItem("item7")) {
            initializeItem7();
        }
        item7Counter++;
        item7Amount.innerHTML = item7Counter;
        updateTotal(parseInt(price7));
        Storage.setAmount("item7", item7Counter);
    });

    // Item 8:
    const uPrice8 = document.getElementById("item-price8").innerHTML.toString().match(/\d+/g)
    const price8 = uPrice8.toString().replace(/,/g, "");
    const item8Button = document.querySelector(".eight__cart__button");

    item8Button.addEventListener("click", function () {
        if (!localStorage.getItem("item8")) {
            initializeItem8();
        }
        item8Counter++;
        item8Amount.innerHTML = item8Counter;
        updateTotal(parseInt(price8));
        Storage.setAmount("item8", item8Counter);
    });

    // Item 9:
    const uPrice9 = document.getElementById("item-price9").innerHTML.toString().match(/\d+/g)
    const price9 = uPrice9.toString().replace(/,/g, "");
    const item9Button = document.querySelector(".nine__cart__button");

    item9Button.addEventListener("click", function () {
        if (!localStorage.getItem("item9")) {
            initializeItem9();
        }
        item9Counter++;
        item9Amount.innerHTML = item9Counter;
        updateTotal(parseInt(price9));
        Storage.setAmount("item9", item9Counter);
    });

    // Item 10:
    const uPrice10 = document.getElementById("item-price10").innerHTML.toString().match(/\d+/g)
    const price10 = uPrice10.toString().replace(/,/g, "");
    const item10Button = document.querySelector(".ten__cart__button");

    item10Button.addEventListener("click", function () {
        if (!localStorage.getItem("item10")) {
            initializeItem10();
        }
        item10Counter++;
        item10Amount.innerHTML = item10Counter;
        updateTotal(parseInt(price10));
        Storage.setAmount("item10", item10Counter);
    });

    // Item 11:
    const uPrice11 = document.getElementById("item-price11").innerHTML.toString().match(/\d+/g)
    const price11 = uPrice11.toString().replace(/,/g, "");
    const item11Button = document.querySelector(".eleven__cart__button");

    item11Button.addEventListener("click", function () {
        if (!localStorage.getItem("item11")) {
            initializeItem11();
        }
        item11Counter++;
        item11Amount.innerHTML = item11Counter;
        updateTotal(parseInt(price11));
        Storage.setAmount("item11", item11Counter);
    });

    // Item 12:
    const uPrice12 = document.getElementById("item-price12").innerHTML.toString().match(/\d+/g)
    const price12 = uPrice12.toString().replace(/,/g, "");
    const item12Button = document.querySelector(".twelve__cart__button");

    item12Button.addEventListener("click", function () {
        if (!localStorage.getItem("item12")) {
            initializeItem12();
        }
        item12Counter++;
        item12Amount.innerHTML = item12Counter;
        updateTotal(parseInt(price12));
        Storage.setAmount("item12", item12Counter);
    });
}

// Check if there are items in the local storage
if (checkStorageForCart()) {
  if (localStorage.getItem("item1")) {
    // Item 1:
    initializeItem1();
  }
  if (localStorage.getItem("item2")) {
    // Item 2:
    initializeItem2();
  }
  if (localStorage.getItem("item3")) {
    // Item 3:
    initializeItem3();
  }
  if (localStorage.getItem("item4")) {
    // Item 4:
    initializeItem4();
  }
  if (localStorage.getItem("item5")) {
    // Item 5:
    initializeItem5();
  }
  if (localStorage.getItem("item6")) {
    // Item 6:
    initializeItem6();
  }
  if (localStorage.getItem("item7")) {
    // Item 7:
    initializeItem7();
  }
  if (localStorage.getItem("item8")) {
    // Item 8:
    initializeItem8();
  }
  if (localStorage.getItem("item9")) {
    // Item 9:
    initializeItem9();
  }
  if (localStorage.getItem("item10")) {
    // Item 10:
    initializeItem10();
  }
  if (localStorage.getItem("item11")) {
    // Item 11:
    initializeItem11();
  }
  if (localStorage.getItem("item12")) {
    // Item 12:
    initializeItem12();
  }
}

/**
 * Checks if there is at least one item in the local storage
 */
function checkStorageForCart() {
  if (
    localStorage.getItem("item1") ||
    localStorage.getItem("item2") ||
    localStorage.getItem("item3") ||
    localStorage.getItem("item4") ||
    localStorage.getItem("item5") ||
    localStorage.getItem("item6") ||
    localStorage.getItem("item7") ||
    localStorage.getItem("item8") ||
    localStorage.getItem("item9") ||
    localStorage.getItem("item10") ||
    localStorage.getItem("item11") ||
    localStorage.getItem("item12")
  ) {
    return true;
  }
  return false;
}

/**
 * Initializes item1 if it is already in the cart or needs to be added to the cart.
 */


function initializeItem1() {
    const uPrice = document.getElementById("item-price1").innerHTML.toString().match(/\d+/g);
      const price = uPrice.toString().replace(/,/g, "");
      const collection = document.getElementById("one1-cart-item");
      item1Display.innerHTML += collection.innerHTML;
      item1Amount = document.querySelector(".item-amount1");
      up1 = document.querySelector(".item1Up");
      down1 = document.querySelector(".item1Down");
      remove1 = document.querySelector(".remove-item-1");

      up1.addEventListener("click", function () {
        item1Counter++;
        item1Amount.innerHTML = item1Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item1", item1Counter);
      });

      down1.addEventListener("click", function () {
        item1Counter--;
        item1Amount.innerHTML = item1Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item1", item1Counter);

        if (item1Counter === 0) {
          item1Display.innerHTML = "";
          Storage.removeAmount("item1");
        }
      });

      remove1.addEventListener("click", function () {
        item1Display.innerHTML = "";
        updateTotal(-parseInt(price) * item1Counter);
        item1Counter = 0;
        Storage.removeAmount("item1");
      });
}

/**
 * Initializes item2 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem2() {
    const uPrice = document.getElementById("item-price2").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("two2-cart-item");
    item2Display.innerHTML += collection.innerHTML;
    item2Amount = document.querySelector(".item-amount2");
    up2 = document.querySelector(".item2Up");
    down2 = document.querySelector(".item2Down");
    remove2 = document.querySelector(".remove-item-2");

    up2.addEventListener("click", function () {
        item2Counter++;
        item2Amount.innerHTML = item2Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item2", item2Counter);
    });

    down2.addEventListener("click", function () {
        item2Counter--;
        item2Amount.innerHTML = item2Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item2", item2Counter);

        if (item2Counter === 0) {
            item2Display.innerHTML = "";
            Storage.removeAmount("item2");
        }
    });

    remove2.addEventListener("click", function () {
        item2Display.innerHTML = "";
        updateTotal(-parseInt(price) * item2Counter);
        item2Counter = 0;
        Storage.removeAmount("item2");
    });
}

/**
 * Initializes item3 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem3() {
    const uPrice = document.getElementById("item-price3").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("three3-cart-item");
    item3Display.innerHTML += collection.innerHTML;
    item3Amount = document.querySelector(".item-amount3");
    up3 = document.querySelector(".item3Up");
    down3 = document.querySelector(".item3Down");
    remove3 = document.querySelector(".remove-item-3");

    up3.addEventListener("click", function () {
        item3Counter++;
        item3Amount.innerHTML = item3Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item3", item3Counter);
    });

    down3.addEventListener("click", function () {
        item3Counter--;
        item3Amount.innerHTML = item3Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item3", item3Counter);

        if (item3Counter === 0) {
            item3Display.innerHTML = "";
            Storage.removeAmount("item3");
        }
    });

    remove3.addEventListener("click", function () {
        item3Display.innerHTML = "";
        updateTotal(-parseInt(price) * item3Counter);
        item3Counter = 0;
        Storage.removeAmount("item3");
    });
}

/**
 * Initializes item4 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem4() {
    const uPrice = document.getElementById("item-price4").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("four4-cart-item");
    item4Display.innerHTML += collection.innerHTML;
    item4Amount = document.querySelector(".item-amount4");
    up4 = document.querySelector(".item4Up");
    down4 = document.querySelector(".item4Down");
    remove4 = document.querySelector(".remove-item-4");

    up4.addEventListener("click", function () {
        item4Counter++;
        item4Amount.innerHTML = item4Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item4", item4Counter);
    });

    down4.addEventListener("click", function () {
        item4Counter--;
        item4Amount.innerHTML = item4Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item4", item4Counter);

        if (item4Counter === 0) {
            item4Display.innerHTML = "";
            Storage.removeAmount("item4");
        }
    });

    remove4.addEventListener("click", function () {
        item4Display.innerHTML = "";
        updateTotal(-parseInt(price) * item4Counter);
        item4Counter = 0;
        Storage.removeAmount("item4");
    });
}

/**
 * Initializes item5 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem5() {
    const uPrice = document.getElementById("item-price5").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("five5-cart-item");
    item5Display.innerHTML += collection.innerHTML;
    item5Amount = document.querySelector(".item-amount5");
    up5 = document.querySelector(".item5Up");
    down5 = document.querySelector(".item5Down");
    remove5 = document.querySelector(".remove-item-5");

    up5.addEventListener("click", function () {
        item5Counter++;
        item5Amount.innerHTML = item5Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item5", item5Counter);
    });

    down5.addEventListener("click", function () {
        item5Counter--;
        item5Amount.innerHTML = item5Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item5", item5Counter);

        if (item5Counter === 0) {
            item5Display.innerHTML = "";
            Storage.removeAmount("item5");
        }
    });

    remove5.addEventListener("click", function () {
        item5Display.innerHTML = "";
        updateTotal(-parseInt(price) * item5Counter);
        item5Counter = 0;
        Storage.removeAmount("item5");
    });
}

/**
 * Initializes item6 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem6() {
    const uPrice = document.getElementById("item-price6").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("six6-cart-item");
    item6Display.innerHTML += collection.innerHTML;
    item6Amount = document.querySelector(".item-amount6");
    up6 = document.querySelector(".item6Up");
    down6 = document.querySelector(".item6Down");
    remove6 = document.querySelector(".remove-item-6");

    up6.addEventListener("click", function () {
        item6Counter++;
        item6Amount.innerHTML = item6Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item6", item6Counter);
    });

    down6.addEventListener("click", function () {
        item6Counter--;
        item6Amount.innerHTML = item6Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item6", item6Counter);

        if (item6Counter === 0) {
            item6Display.innerHTML = "";
            Storage.removeAmount("item6");
        }
    });

    remove6.addEventListener("click", function () {
        item6Display.innerHTML = "";
        updateTotal(-parseInt(price) * item6Counter);
        item6Counter = 0;
        Storage.removeAmount("item6");
    });
}

/**
 * Initializes item7 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem7() {
    const uPrice = document.getElementById("item-price7").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("seven7-cart-item");
    item7Display.innerHTML += collection.innerHTML;
    item7Amount = document.querySelector(".item-amount7");
    up7 = document.querySelector(".item7Up");
    down7 = document.querySelector(".item7Down");
    remove7 = document.querySelector(".remove-item-7");

    up7.addEventListener("click", function () {
        item7Counter++;
        item7Amount.innerHTML = item7Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item7", item7Counter);
    });

    down7.addEventListener("click", function () {
        item7Counter--;
        item7Amount.innerHTML = item7Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item7", item7Counter);

        if (item7Counter === 0) {
            item7Display.innerHTML = "";
            Storage.removeAmount("item7");
        }
    });

    remove7.addEventListener("click", function () {
        item7Display.innerHTML = "";
        updateTotal(-parseInt(price) * item7Counter);
        item7Counter = 0;
        Storage.removeAmount("item7");
    });
}

/**
 * Initializes item8 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem8() {
    const uPrice = document.getElementById("item-price8").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("eight8-cart-item");
    item8Display.innerHTML += collection.innerHTML;
    item8Amount = document.querySelector(".item-amount8");
    up8 = document.querySelector(".item8Up");
    down8 = document.querySelector(".item8Down");
    remove8 = document.querySelector(".remove-item-8");

    up8.addEventListener("click", function () {
        item8Counter++;
        item8Amount.innerHTML = item8Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item8", item8Counter);
    });

    down8.addEventListener("click", function () {
        item8Counter--;
        item8Amount.innerHTML = item8Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item8", item8Counter);

        if (item8Counter === 0) {
            item8Display.innerHTML = "";
            Storage.removeAmount("item8");
        }
    });

    remove8.addEventListener("click", function () {
        item8Display.innerHTML = "";
        updateTotal(-parseInt(price) * item8Counter);
        item8Counter = 0;
        Storage.removeAmount("item8");
    });
}

/**
 * Initializes item9 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem9() {
    const uPrice = document.getElementById("item-price9").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("nine9-cart-item");
    item9Display.innerHTML += collection.innerHTML;
    item9Amount = document.querySelector(".item-amount9");
    up9 = document.querySelector(".item9Up");
    down9 = document.querySelector(".item9Down");
    remove9 = document.querySelector(".remove-item-9");

    up9.addEventListener("click", function () {
        item9Counter++;
        item9Amount.innerHTML = item9Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item9", item9Counter);
    });

    down9.addEventListener("click", function () {
        item9Counter--;
        item9Amount.innerHTML = item9Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item9", item9Counter);

        if (item9Counter === 0) {
            item9Display.innerHTML = "";
            Storage.removeAmount("item9");
        }
    });

    remove9.addEventListener("click", function () {
        item9Display.innerHTML = "";
        updateTotal(-parseInt(price) * item9Counter);
        item9Counter = 0;
        Storage.removeAmount("item9");
    });
}

/**
 * Initializes item10 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem10() {
    const uPrice = document.getElementById("item-price10").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("ten10-cart-item");
    item10Display.innerHTML += collection.innerHTML;
    item10Amount = document.querySelector(".item-amount10");
    up10 = document.querySelector(".item10Up");
    down10 = document.querySelector(".item10Down");
    remove10 = document.querySelector(".remove-item-10");

    up10.addEventListener("click", function () {
        item10Counter++;
        item10Amount.innerHTML = item10Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item10", item10Counter);
    });

    down10.addEventListener("click", function () {
        item10Counter--;
        item10Amount.innerHTML = item10Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item10", item10Counter);

        if (item10Counter === 0) {
            item10Display.innerHTML = "";
            Storage.removeAmount("item10");
        }
    });

    remove10.addEventListener("click", function () {
        item10Display.innerHTML = "";
        updateTotal(-parseInt(price) * item10Counter);
        item10Counter = 0;
        Storage.removeAmount("item10");
    });
}

/**
 * Initializes item11 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem11() {
    const uPrice = document.getElementById("item-price11").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("eleven11-cart-item");
    item11Display.innerHTML += collection.innerHTML;
    item11Amount = document.querySelector(".item-amount11");
    up11 = document.querySelector(".item11Up");
    down11 = document.querySelector(".item11Down");
    remove11 = document.querySelector(".remove-item-11");

    up11.addEventListener("click", function () {
        item11Counter++;
        item11Amount.innerHTML = item11Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item11", item11Counter);
    });

    down11.addEventListener("click", function () {
        item11Counter--;
        item11Amount.innerHTML = item11Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item11", item11Counter);

        if (item11Counter === 0) {
            item11Display.innerHTML = "";
            Storage.removeAmount("item11");
        }
    });

    remove11.addEventListener("click", function () {
        item11Display.innerHTML = "";
        updateTotal(-parseInt(price) * item11Counter);
        item11Counter = 0;
        Storage.removeAmount("item11");
    });
}

/**
 * Initializes item12 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem12() {
    const uPrice = document.getElementById("item-price12").innerHTML.toString().match(/\d+/g);
    const price = uPrice.toString().replace(/,/g, "");
    const collection = document.getElementById("twelve12-cart-item");
    item12Display.innerHTML += collection.innerHTML;
    item12Amount = document.querySelector(".item-amount12");
    up12 = document.querySelector(".item12Up");
    down12 = document.querySelector(".item12Down");
    remove12 = document.querySelector(".remove-item-12");

    up12.addEventListener("click", function () {
        item12Counter++;
        item12Amount.innerHTML = item12Counter;
        updateTotal(parseInt(price));
        Storage.setAmount("item12", item12Counter);
    });

    down12.addEventListener("click", function () {
        item12Counter--;
        item12Amount.innerHTML = item12Counter;
        updateTotal(-parseInt(price));
        Storage.setAmount("item12", item12Counter);

        if (item12Counter === 0) {
            item12Display.innerHTML = "";
            Storage.removeAmount("item12");
        }
    });

    remove12.addEventListener("click", function () {
        item12Display.innerHTML = "";
        updateTotal(-parseInt(price) * item12Counter);
        item12Counter = 0;
        Storage.removeAmount("item12");
    });
}

//User add to cart event
$(function () {
    let $notifi = $(".cart_mess"),
        $pop = $(".pop");
    $notifi.click(function () {
        TweenMax.fromTo(
            $pop,
            0.5,
            {
                x: 500
            },
            {
                display: "flex",
                x: -10,
                yoyo: true,
                ease: Bounce.easeOut
            }
        );
        setTimeout(function () {
            TweenMax.to($pop, 0.5, {
                display: "none",
                x: 510,
                yoyo: true,
                ease: Bounce.easeOut
            });
        }, 2000);
    });
});
