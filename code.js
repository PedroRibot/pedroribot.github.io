
function toggle(){
    var trailer = document.querySelector(".trailer")

    trailer.classList.toggle("active")
}

function togglegameplay(){
    var trailer = document.querySelector(".gameplay")

    trailer.classList.toggle("active")
}

var imageIndex = 1;
showImages(imageIndex);

function imageNext(n) {
  showImages(imageIndex += n);
}

function currImage(n) {
  showImages(imageIndex = n);
}

function inicio(){
    setInterval(function(){ imageNext(1); }, 3000);
}

function showImages(n) {
  var i;
  var images = document.getElementsByClassName("myImages");
  var dots = document.getElementsByClassName("dot");


  if (n > images.length) {imageIndex = 1}


  if (n < 1) {imageIndex = images.length}


  for (i = 0; i < images.length; i++) {
      images[i].style.display = "none";
  }


  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }


  images[imageIndex-1].style.display = "block";
  dots[imageIndex-1].className += " active";
}