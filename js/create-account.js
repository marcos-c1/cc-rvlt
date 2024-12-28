const imgInput = document.getElementById("file");
const imgSrc = document.getElementById("pic");
const caption = document.getElementById("caption");
const formAccount = document.getElementById("create-account-form");

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

formAccount.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const { name, mail, cel } = e.target;
  var validateEmail = false;
  var validatePhone = false;

  if (/[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/.test(mail.value)) {
    validateEmail = true;
  } else {
    const error = document.getElementById("error-email");
    error.textContent = "Please, type an valid email address.";
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
    error.textContent = "Please, type an valid brazil phone number.";
    name.value = "";
    mail.value = "";
    cel.value = "";
  }

  if (validateEmail && validatePhone) {
    const fileData = await fetch(imgSrc.src, {
      method: "GET",
    }).then((r) => r.blob());
    console.log(fileData);
    const response = await fetch("http://localhost:5000/api/v1/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: name.value,
        email: mail.value,
        phone: cel.value,
        imgBlob: fileData,
      }),
    });
    console.log(response.json());
  }
}
