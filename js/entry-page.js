// Form submission handler
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const messageContainer = document.getElementById("message");
  const submitButton = document.getElementById("submit-button");

  // Show loading message
  messageContainer.textContent = "Submitting...";
  messageContainer.style.display = "block";
  messageContainer.className = "alert alert-info"; // Bootstrap's alert style
  submitButton.disabled = true;

  const formData = new FormData(this);

  // Prepare the data string for submission
  const keyValuePairs = Array.from(formData.entries()).map(
    ([key, value]) => `${key}=${encodeURIComponent(value)}`
  );
  const formDataString = keyValuePairs.join("&");

  fetch(
    "https://script.google.com/macros/s/AKfycbyoLXZhG8gERRXpZq0vZSWv3X0OGcLKm2UthfI8mIwZwk8vbq5kebxxFYLXRn3A6FLqdw/exec",
    {
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("Failed to submit the form.");
    })
    .then(() => {
      // Display success message
      messageContainer.textContent = "Data submitted successfully!";
      messageContainer.className = "alert alert-success";

      // Clear the form
      document.getElementById("form").reset();

      // Enable the submit button again
      submitButton.disabled = false;

      // Hide the message after a timeout
      setTimeout(() => {
        messageContainer.style.display = "none";
      }, 2600);
    })
    .catch((error) => {
      console.error(error);
      // Display error message
      messageContainer.textContent = "An error occurred while submitting the form.";
      messageContainer.className = "alert alert-danger";
      messageContainer.style.display = "block";

      // Enable the submit button again
      submitButton.disabled = false;
    });
});

// YouTube link thumbnail preview handler
document.getElementById("youtube_link").addEventListener("input", function () {
  const url = this.value;
  const videoIdMatch =
    url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/) ||
    url.match(/(?:https?:\/\/)?youtu\.be\/([^?]+)/);

  if (videoIdMatch) {
    const videoId = videoIdMatch[1];
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const thumbnailImg = document.getElementById("youtube-thumbnail");
    thumbnailImg.src = thumbnailUrl;
    thumbnailImg.style.display = "block";
  } else {
    document.getElementById("youtube-thumbnail").style.display = "none";
  }
});

// Set current date and time in the form on page load
window.addEventListener("DOMContentLoaded", function () {
  const dateField = document.querySelector('input[name="date"]');
  const timeField = document.querySelector('input[name="time"]');

  // Get current date and time
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const currentTime = now.toTimeString().split(":").slice(0, 2).join(":"); // Format: HH:MM

  // Set the fields
  dateField.value = currentDate;
  timeField.value = currentTime;
});


fetch('./../components/header.html') // Relative path
.then(response => response.text())
.then(data => {
  document.getElementById('header-container').innerHTML = data;
});

fetch('./../components/footer.html') // Relative path
.then(response => response.text())
.then(data => {
  document.getElementById('footer-container').innerHTML = data;
});