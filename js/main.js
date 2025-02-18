const topBar = document.querySelector("#top-bar");
const exteriorColorSection = document.querySelector("#exterior-buttons");
const interiorColorSection = document.querySelector("#interior-buttons");
const interiorImage = document.querySelector("#interior-image");
const exteriorImage = document.querySelector("#exterior-image");
const wheelButtonsSection = document.querySelector("#wheel-buttons");
const totalPriceElement = document.querySelector("#total-price");
const performanceBtn = document.querySelector("#performance-btn");
const accessoryCheckboxes = document.querySelectorAll(
  ".accessory-form-checkbox"
);
const fullSelfDrivingCheckbox = document.querySelector(
  "#full-self-driving-checkbox"
);

let selectedColor = "Stealth Grey";

const basePrice = 52490;
let currentPrice = basePrice;

const pricing = {
  "Performance Wheels": 2500,
  "Performance Package": 5000,
  "Full Self-Driving": 8500,
  Accessories: {
    "Center Console Trays": 35,
    Sunshade: 105,
    "All-Weather Interior Liners": 225,
  },
};

const selectedOptions = {
  "Performance Wheels": false,
  "Performance Package": false,
  "Full Self-Driving": false,
};

// Image Mapping
const exteriorImages = {
  "Stealth Grey": "./images/model-y-stealth-grey.jpg",
  "Pearl White": "./images/model-y-pearl-white.jpg",
  "Deep Blue": "./images/model-y-deep-blue-metallic.jpg",
  "Solid Black": "./images/model-y-solid-black.jpg",
  "Ultra Red": "./images/model-y-ultra-red.jpg",
  Quicksilver: "./images/model-y-quicksilver.jpg",
};

const interiorImages = {
  Dark: "./images/model-y-interior-dark.jpg",
  Light: "./images/model-y-interior-light.jpg",
};
function handleScroll() {
  const atTop = window.scrollY === 0;
  topBar.classList.toggle("visible-bar", atTop);
  topBar.classList.toggle("hidden-bar", !atTop);
}

function updateExteriorImage() {
  const performanceSuffix = selectedOptions["Performance Wheels"]
    ? "-performance"
    : "";
  const colorKey =
    selectedColor in exteriorImages ? selectedColor : "Stealth Grey";
  exteriorImage.src = exteriorImages[colorKey].replace(
    ".jpg",
    `${performanceSuffix}.jpg`
  );
}

function handleColorButtonClick(e) {
  console.log("e.target.tagName", e.target.tagName);
  let button;
  if ((e.target.tagName = "IMG")) {
    button = e.target.closest("button");
  } else {
    button = e.target;
  }
  console.log("button", button);
  if (button) {
    const buttons = e.currentTarget.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("btn-selected"));
    button.classList.add("btn-selected");

    // Change exterior image
    if (e.currentTarget === exteriorColorSection) {
      selectedColor = button.querySelector("img").alt;
      updateExteriorImage();
    }
    // Change interior image
    if (e.currentTarget === interiorColorSection) {
      const color = button.querySelector("img").alt;
      interiorImage.src = interiorImages[color];
    }
  }
}

function handleWheelButtonClick(e) {
  if (e.target.tagName === "BUTTON") {
    debugger;
    const buttons = document.querySelectorAll("#wheel-buttons button");
    buttons.forEach((btn) => btn.classList.remove("bg-gray-700", "text-white"));
    e.target.classList.add("bg-gray-700", "text-white");
    selectedOptions["Performance Wheels"] =
      e.target.textContent.includes("Performance");
    updateTotalPrice();
    updateExteriorImage();
  }
}

function updateTotalPrice() {
  debugger;
  currentPrice = basePrice;
  // Performance Wheel Option
  console.log("!!!!!!!!", selectedOptions);

  if (selectedOptions["Performance Wheels"]) {
    currentPrice += pricing["Performance Wheels"];
  }
  // Performance Package Option
  if (selectedOptions["Performance Package"]) {
    currentPrice += pricing["Performance Package"];
  }

  // Full Self Driving Option

  if (selectedOptions["Full Self-Driving"]) {
    currentPrice += pricing["Full Self-Driving"];
  }
  // Accessory Checkboxes
  accessoryCheckboxes.forEach((checkbox) => {
    // Extract the accessory label
    const accessoryLabel = checkbox
      .closest("label")
      .querySelector("span")
      .textContent.trim();

    const accessoryPrice = pricing["Accessories"][accessoryLabel];

    // Add to current price if accessory is selected
    if (checkbox.checked) {
      currentPrice += accessoryPrice;
    }
  });
  console.log("$$$$$$$$", currentPrice);
  // Update the total price in UI
  totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`;
}

const fullSelfDrivingChange = () => {
  console.log("inside fullSelfDrivingCHange");
  selectedOptions["Full Self-Driving"] = fullSelfDrivingCheckbox.checked;
  debugger;
  updateTotalPrice();
};

function handlePerformanceButtonClick() {
  const isSelected = performanceBtn.classList.toggle("bg-gray-700");
  performanceBtn.classList.toggle("text-white");
  // Update selected options
  selectedOptions["Performance Package"] = isSelected;
  updateTotalPrice();
}

// Event listeners

window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener("click", handleColorButtonClick);
interiorColorSection.addEventListener("click", handleColorButtonClick);
wheelButtonsSection.addEventListener("click", handleWheelButtonClick);
performanceBtn.addEventListener("click", handlePerformanceButtonClick);
fullSelfDrivingCheckbox.addEventListener("change", fullSelfDrivingChange);
