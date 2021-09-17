// Instatiate variables
if (localStorage.getItem("serves") == null) {
  localStorage.setItem("serves", 2);
}

var serves = parseInt(localStorage.getItem("serves"));
var counter = document.getElementById("serveCounter");
counter.innerHTML = serves;

if (serves <= 1) {
  document.querySelectorAll(".remove").forEach((item, i) => {
    item.style.opacity = 0.3;
  });
} else if (serves >= 10) {
  document.querySelectorAll(".add").forEach((item, i) => {
    item.style.opacity = 0.3;
  });
}

var ingredientNumbers = [];

if (localStorage.getItem("checklist") == null) {
  var x = [];
  document.querySelectorAll(".ingredient").forEach((item, i) => {
    x.push(false);
  });
  localStorage.setItem("checklist", JSON.stringify(x));
}
var checklist = JSON.parse(localStorage.getItem("checklist"));

// Add event handlers
document.querySelectorAll(".add").forEach((item, i) => {
  item.addEventListener("click", () => {
    setServes(1);
  });
});

document.querySelectorAll(".remove").forEach((item, i) => {
  item.addEventListener("click", () => {
    setServes(-1);
  });
});

document.querySelectorAll(".check").forEach((item, i) => {
  item.addEventListener("click", () => {
    toggleCheck(item, i);
  });
  if (checklist[i]) {
    item.innerHTML = "check_circle";
  } else {
    item.innerHTML = "radio_button_unchecked";
  }
});


// Read numbers from ingredient list and adjust accordingly
document.querySelectorAll(".ingredient").forEach((item, i) => {
  var y = parseFloat(item.innerHTML.replace(/^[^\d]*/g, ""));
  ingredientNumbers.push(y);
});
updateIngredients();


// Functions
function updateIngredients() {
  document.querySelectorAll(".ingredient").forEach((item, i) => {
    var y = parseFloat(item.innerHTML.replace(/^[^\d]*/g, ""));
    item.innerHTML = item.innerHTML.replace(y, Math.round(10*ingredientNumbers[i]*serves/4)/10);
  });
}

function setServes(x) {
  serves = serves + x;
  if (serves <= 1) {
    serves = 1;
    document.querySelectorAll(".remove").forEach((item, i) => {
      item.style.opacity = 0.3;
    });
  } else if (serves >= 10) {
    serves = 10;
    document.querySelectorAll(".add").forEach((item, i) => {
      item.style.opacity = 0.3;
    });
  } else {
    document.querySelectorAll(".remove, .add").forEach((item, i) => {
      item.style.opacity = 1;
    });
  }
  counter.innerHTML = serves;
  updateIngredients();
  localStorage.setItem("serves", serves);
}

function toggleCheck(item, i) {
  if(item.innerHTML == "check_circle") {
    item.innerHTML = "radio_button_unchecked";
    checklist[i] = false;
  } else {
    item.innerHTML = "check_circle"
    checklist[i] = true;
  }
  localStorage.setItem("checklist", JSON.stringify(checklist));
}
