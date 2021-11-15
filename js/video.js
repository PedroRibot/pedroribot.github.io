var videoModal = document.getElementById("video");
var videoSq = document.getElementById("videoSq");
var videoButton = document.getElementsByClassName("button-video");

for (var i = 0; i < videoButton.length; i++) {
  (function (index) {
    videoButton[index].addEventListener("click", function () {
      videoSq.src = videoButton[index].dataset.url;
      videoModal.style.display = "flex";
    });
  })(i);
}

videoModal.addEventListener("click", function (e) {
  if (videoSq.contains(e.target) && videoModal.style.display == "flex") {

  } else {
    videoModal.style.display = "none";
    videoSq.src = "";
  }
});

