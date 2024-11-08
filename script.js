const emailSubject = document.getElementById("subject");
const emailBody = document.getElementById("emailBody");
const charCount = document.getElementById("charCount");
const resultDiv = document.getElementById("result");

emailBody.addEventListener("input", () => {
  charCount.textContent = `${emailBody.value.length}/1000 chars`;
});

async function detectSpam() {
  let isSpam = false;

  const subject = emailSubject.value.toLowerCase();
  const body = emailBody.value.toLowerCase();

  const data = {
    subject: subject,
    body: body,
  };
  
  await fetch('http://103.76.120.138/predict', {
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
  })
  .catch(function (err) {
    console.error(err);
  });

  resultDiv.classList.remove("hidden", "spam", "ham");
  if (isSpam) {
    resultDiv.textContent = "This email is a spam!";
    resultDiv.classList.add("spam");
  } else {
    resultDiv.textContent = "This email is a ham!";
    resultDiv.classList.add("ham");
  }
}

function clearForm() {
  document.getElementById("subject").value = '';
  document.getElementById("emailBody").value = '';
  charCount.textContent = '0/1000 chars';
  resultDiv.classList.add("hidden");
}