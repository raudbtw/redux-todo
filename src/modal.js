// MODAL
const modalBtn = document.getElementById("show-modal");
const modalOverlay = document.querySelector(".modal-overlay");
const modalclose = document.querySelector(".close-modal");
const modalWrapper = document.querySelector(".modal-wrapper");

try {
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) modalOverlay.style.display = "none";
  });
  modalclose.addEventListener("click", function () {
    modalOverlay.style.display = "none";
  });

  modalBtn.addEventListener("click", function () {
    modalOverlay.style.display = "flex";
  });
} catch (e) {
  console.log(e.message);
}
