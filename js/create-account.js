const imgInput = document.getElementById("file");
const imgSrc = document.getElementById("pic");
const caption = document.getElementById("caption");
const formAccount = document.getElementById("create-account-form");
const popUp = document.getElementById("pop-up");
const closeIcon = document.getElementById("close-icon");
const pwdInput = document.getElementById("pwd");

pwdInput.addEventListener("focus", (_) => {
  const containerPwd = document.querySelectorAll("#container-pwd");
  for (let i = 0; i < containerPwd.length; i++) {
    containerPwd[i].classList.replace("none", "flex-effect");
  }
});

pwdInput.addEventListener("focusout", (_) => {
  const containerPwd = document.querySelectorAll("#container-pwd");
  for (let i = 0; i < containerPwd.length; i++) {
    containerPwd[i].classList.replace("flex-effect", "none");
  }
});

imgInput.addEventListener("change", (ev) => {
  const file = ev.target.files[0];
  const fileReader = new FileReader();

  fileReader.addEventListener("load", (ev) => {
    imgSrc.src = ev.target.result;
  });

  if (file) {
    // imgSrc.src = URL.createObjectURL(file);
    fileReader.readAsDataURL(file);
    caption.innerText = file.name;
  } else {
    imgSrc.src = "./imgs/picture-not-found.svg";
    caption.innerText = "Preview your profile picture";
  }
});

async function saveFormToServer(name, mail, cel) {
  const fileData = await fetch(imgSrc.src, {
    method: "GET",
  }).then((r) => r.blob());

  await fetch("http://localhost:5000/api/v1/usuario", {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: name.value,
      email: mail.value,
      phone: cel.value,
      imgBlob: fileData,
    }),
  }).then(() => false);
}

closeIcon.addEventListener("click", () => {
  popUp.className = "hidden";
});

formAccount.addEventListener("submit", (e) => handleFormSubmit(e));

function handleFormSubmit(event) {
  event.preventDefault();
  const { name, mail, cel } = event.target;
  var validateEmail = false;
  var validatePhone = false;

  if (/[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/.test(mail.value)) {
    validateEmail = true;
  } else {
    const error = document.getElementById("error-email");
    error.innerText = "Please, type an valid email address.";
    name.value = "";
    mail.value = "";
    cel.value = "";
  }

  if (
    /\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*/.test(cel.value)
  ) {
    validatePhone = true;
  } else {
    const error = document.getElementById("error-phone");
    error.innerText = "Please, type an valid brazil phone number.";
    name.value = "";
    mail.value = "";
    cel.value = "";
  }

  if (validateEmail && validatePhone) {
    saveFormToServer(name, mail, cel);
    popUp.className = "visible";
    setTimeout(() => {
      popUp.className = "hidden";
    }, 3000);
  }
}
