const imgInput = document.getElementById("file");
const imgSrc = document.getElementById("pic");
const caption = document.getElementById("caption");

imgInput.addEventListener("change", (ev) => {
  const file = ev.target.files[0];
  console.log(file);
  if (file) {
    imgSrc.src = URL.createObjectURL(file);
    caption.innerText = file.name;
  } else {
    imgSrc.src = "./imgs/picture-not-found.svg";
    caption.innerText = "Preview your profile picture";
  }
});
