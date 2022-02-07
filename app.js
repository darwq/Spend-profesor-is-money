let content = document.querySelectorAll(".display");

let btnAdd = document.querySelectorAll(".add");
let btnSubtract = document.querySelectorAll(".subtract");
let clearButton = document.querySelector(".clear");

let products = document.querySelectorAll(".product");

let productImage = document.querySelectorAll(".product-image");

let budget = document.querySelector(".budget .number");

let productCounter = 0;

let sum = 984000000;

let productId = 0;
let imageId = 0;

let borderColors = [
  "#DD4A48",
  "#C0D8C0",
  "#F5EEDC",
  "#0CECDD",
  "#FFE162",
  "#191919",
  "#2D4263",
  "#B91646",
  "#3DB2FF",
  "#DA0037",
  "#444444",
  "#8A39E1",
  "#EA5C2B",
];

let number = Math.floor(Math.random() * (borderColors.length - 0) + 0);

let receiptProducts = [];
let receiptTitles = [];

let contor = 0;

// FUNCTIONS

function checkForSumLength() {
  if (sum.toString().length >= 7) {
    document.querySelector(".budget .amount").textContent = " million dollars";

    if (sum.toString().length == 7) {
      budget.textContent = "$" + sum.toString().slice(0, 1);
    } else if (sum.toString().length == 8) {
      budget.textContent = "$" + sum.toString().slice(0, 2);
    } else {
      budget.textContent = "$" + sum.toString().slice(0, 3);
    }
  } else if (sum.toString().length >= 3) {
    document.querySelector(".budget .amount").textContent =
      " thousands dollars";

    if (sum.toString().length == 4) {
      budget.textContent = "$" + sum.toString().slice(0, 1);
    } else if (sum.toString().length == 5) {
      budget.textContent = "$" + sum.toString().slice(0, 2);
    } else {
      budget.textContent = "$" + sum.toString().slice(0, 3);
    }
  } else if (sum.length === 3) {
    document.querySelector(".budget .amount").textContent = " hundreds dollars";
  } else {
    document.querySelector(".budget .amount").textContent = " dollars";
  }
}

function clear() {
  if (sum < 984000000) {
    sum = 984000000;

    checkForSumLength();

    content.forEach((content) => {
      content.textContent = "0";
    });
  } else {
    return;
  }
}

function clearElement(element) {
  let e = document.querySelector(
    `#${element.parentElement.getAttribute("id")} .product-buttons .display`
  );

  let b = document.querySelector(
    `#${element.parentElement.getAttribute("id")} .price`
  );

  let giveBack =
    parseInt(e.textContent) *
    parseInt(b.textContent.replaceAll("$", "").replaceAll(".", ""));

  sum += giveBack;

  checkForSumLength();

  e.textContent = "0";
}

function appendToReceipt(e) {
  let element = document.querySelector(
    `#${e.target.parentElement.parentElement.getAttribute(
      "id"
    )} .product-buttons .display`
  );

  let title = document.querySelector(
    `#${e.target.parentElement.parentElement.getAttribute("id")} .title`
  );

  let cost = document.querySelector(
    `#${e.target.parentElement.parentElement.getAttribute("id")} .price`
  );

  let quantity = document.querySelector(
    `#${e.target.parentElement.parentElement.getAttribute(
      "id"
    )} .product-buttons .display`
  );

  if (parseInt(element.textContent) >= 1) {
    let receipt = document.querySelector(".receipt-section");
    let child = document.querySelector(".receipt-section h3");

    child.textContent = "";

    let newChild = document.createElement("h3");
    newChild.textContent = `${title.textContent} - ${cost.textContent} - x${quantity.textContent}`;
    newChild.setAttribute("class", "receipt-product");

    if (receiptTitles.includes(title.textContent)) {
      receiptProducts[
        receiptTitles.indexOf(title.textContent)
      ].textContent = `${title.textContent} - ${cost.textContent} - x${quantity.textContent}`;
    } else {
      receiptTitles.push(title.textContent);
      receiptProducts.push(newChild);
    }

    receiptProducts.forEach((product) => {
      receipt.appendChild(product);
    });
  } else {
    let child = document.querySelector(".receipt-section h3");

    receiptProducts[receiptTitles.indexOf(title.textContent)].textContent = "";

    checkForEmptyReceipt();
  }
}

function clearToReceipt(e) {
  let title = document.querySelector(
    `#${e.target.parentElement.getAttribute("id")} .title`
  );

  receiptProducts[receiptTitles.indexOf(title.textContent)].textContent = "";

  checkForEmptyReceipt();
}

function checkForEmptyReceipt() {
  let count = 0;

  receiptProducts.forEach((product) => {
    if (product.textContent.length > 0) {
      count++;
    }
  });

  if (count == 0) {
    let child = document.querySelector(".receipt-section h3");
    child.textContent =
      "Your cart is empty. Buy something and it will be shown here.";
  }
}

function showPayAmount() {
  if (sum !== 984000000) {
    if (contor !== 0) {
      document.querySelector(".receipt .price-tag").textContent =
        "You have to pay $" + (984000000 - sum);
      return;
    }

    let priceTag = document.createElement("h4");
    priceTag.textContent = "You have to pay $" + (984000000 - sum);
    priceTag.classList.add("price-tag");

    document
      .querySelector(".receipt")
      .insertBefore(priceTag, document.querySelector(".receipt .footer-txt"));

    contor += 1;

    return;
  }

  let total = document.querySelector(".receipt .price-tag");

  document.querySelector(".receipt").removeChild(total);

  contor -= 1;
}

function clearReceipt() {
  document.querySelectorAll(".receipt .receipt-product").forEach((header) => {
    header.textContent = "";
    receiptProducts = [];
    receiptTitles = [];
    let child = document.querySelector(".receipt-section h3");
    child.textContent =
      "Your cart is empty. Buy something and it will be shown here.";
  });
}

products.forEach((product) => {
  productId++;
  product.setAttribute("id", `id-${productId}`);
  let btn = document.createElement("button");

  btn.setAttribute("class", "btn btn-primary clear-element");
  btn.textContent = "clear";

  product.appendChild(btn);
});

productImage.forEach((image) => {
  let randomIndex = Math.floor(Math.random() * (borderColors.length - 0) + 0);

  if (randomIndex < borderColors.length - 1) {
    number += 1;
  } else {
    number -= 1;
  }

  image.style.borderColor = borderColors[number];

  number = randomIndex;
});

btnAdd.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (
      sum >=
      document
        .querySelector(
          `#${e.target.parentElement.parentElement.getAttribute("id")} .price`
        )
        .textContent.replaceAll("$", "")
        .replaceAll(".", "")
    ) {
      sum -= parseInt(
        document
          .querySelector(
            `#${e.target.parentElement.parentElement.getAttribute("id")} .price`
          )
          .textContent.replaceAll("$", "")
          .replaceAll(".", "")
      );

      let displayContent = document.querySelector(
        `#${e.target.parentElement.parentElement.getAttribute(
          "id"
        )} .product-buttons .display`
      );

      displayContent.textContent = parseInt(displayContent.textContent) + 1;

      checkForSumLength();

      appendToReceipt(e);

      showPayAmount();
    }
  });
});

btnSubtract.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let displayContent = document.querySelector(
      `#${e.target.parentElement.parentElement.getAttribute(
        "id"
      )} .product-buttons .display`
    );

    if (parseInt(displayContent.textContent) > 0) {
      sum += parseInt(
        document
          .querySelector(
            `#${e.target.parentElement.parentElement.getAttribute("id")} .price`
          )
          .textContent.replaceAll("$", "")
          .replaceAll(".", "")
      );

      displayContent.textContent = parseInt(displayContent.textContent) - 1;

      checkForSumLength();

      appendToReceipt(e);

      showPayAmount();
    }
  });
});

clearButton.addEventListener("click", (e) => {
  clear();

  clearReceipt();

  showPayAmount();
});

document.querySelectorAll(".clear-element").forEach((element) => {
  element.addEventListener("click", (e) => {
    clearElement(e.target);

    clearToReceipt(e);

    showPayAmount();
  });
});
