const emailSubject = document.getElementById("subject");
const emailBody = document.getElementById("emailBody");
const charCount = document.getElementById("charCount");
const resultDiv = document.getElementById("result");
const resTextDiv = document.getElementById("res-text");
const resImgDiv = document.getElementById("res-img");
const loadingText = document.getElementById("loading");

emailBody.addEventListener("input", () => {
  charCount.textContent = `${emailBody.value.length}/1000 chars`;
});

const BE_URL = "http://103.76.120.138";

async function detectSpam() {
  const subject = emailSubject.value.toLowerCase();
  const body = emailBody.value.toLowerCase();

  if (body === "") {
    alert("Body is required!");
    return;
  }

  loadingText.innerText = "Loading...";
  resultDiv.classList.add("hidden");
  resImgDiv.setAttribute("src", "");

  let isSpam = false;


  const data = {
    subject: subject,
    body: body,
  };
  
  await fetch(`${BE_URL}/predict`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(function (res) {
    return res.json();
  }
  ).then(function (data) {
    isSpam = data.prediction;
    resImgDiv.setAttribute("src", `${BE_URL}/${data.image_name}.png`)
    loadingText.innerText = null;
  })
  .catch(function (err) {
    console.error(err);
  });

  resultDiv.classList.remove("hidden", "spam", "ham");
  if (isSpam) {
    resTextDiv.textContent = "This email is a spam!";
    resultDiv.classList.add("spam");
  } else {
    resTextDiv.textContent = "This email is a ham!";
    resultDiv.classList.add("ham");
  }
}

function clearForm() {
  document.getElementById("subject").value = '';
  document.getElementById("emailBody").value = '';
  charCount.textContent = '0/1000 chars';
  resultDiv.classList.add("hidden");
}