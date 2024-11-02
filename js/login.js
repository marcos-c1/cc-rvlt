const loginForm = document.getElementById("login__container");
const rememberSpan = document.querySelector("#remember__container > span");
const checkbox = document.getElementById("check");
const forgotPwd = document.getElementById("forgot-pwd");
const forgotModal = document.getElementById("forgot-pwd-modal");
const bgBlur = document.getElementById("opacity-bg");

bgBlur.addEventListener('click', () => {
  if (forgotModal.style.display === "block") {
    bgBlur.toggleAttribute("hidden");
    forgotModal.style.display = "none";
  }
})
//TODO: Implement an onclick event outside forgotModal container that closes the container itself
forgotPwd.addEventListener("click", () => {
  if (forgotModal.style.display === "none" || !forgotModal.style.display) {
    bgBlur.removeAttribute("hidden");
    forgotModal.style.display = "block";
  } else {
    bgBlur.setAttribute("hidden");
    forgotModal.style.display = "none";
  }
});

rememberSpan.addEventListener("click", () => {
  if (checkbox.checked) {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }
});

loginForm.addEventListener("submit", handleLogin);

function handleLogin(e) {
  e.preventDefault();
  const { login, pwd, check } = e.target;

  console.log(login, pwd, check);
  login.value = "";
  pwd.value = "";
  check.checked = false;
}
