const requestURL = "data/projects.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

var projectNumber;
var projectKeyword;

request.onload = function () {
  const projects = request.response;

  projectKeyword = localStorage.getItem("projectNumberKey");

  //Analizamos la URL
  var actual = window.location + "";
  var split = actual.split("#");
  var id = split[split.length - 1];
  projectKeyword = id;

  projectInfo(projects);
};

var keywordCorrect = false;

function projectInfo(json) {
  for (i = 0; i < json["projects"].length; i++) {
    if (json["projects"][i]["keyword"] == projectKeyword) {
      projectNumber = i;
      keywordCorrect = true;
    }
  }

  if (keywordCorrect == false) {
    window.location.href = "index.html";
  } else {
    var pv = projectNumber;

    var title = document.getElementById("title");
    var short_description = document.getElementById("short-description");
    var year = document.getElementById("year");
    var gameplay = document.getElementById("gameplay-button");
    var trailer = document.getElementById("trailer-button");
    var buttons = document.getElementById("buttons");
    var author = document.getElementById("author");
    var disciplines = document.getElementById("disciplines");
    var awards = document.getElementById("awards");
    var client = document.getElementById("client");
    var awards_title = document.getElementById("awards-title");
    var client_title = document.getElementById("client-title");
    var long_description = document.getElementById("long-description");
    var what = document.getElementById("what-i-did");
    var aditional_info = document.getElementById("aditional-info");
    var img_container = document.getElementById("project-imgs");
    var primary_text = document.getElementsByClassName("text-primary");
    var primary_bg = document.getElementsByClassName("bg-primary");
    var project_info = document.getElementById("project-info");
    var project_title = document.getElementById("project-title");
    var link_title = document.getElementById("links-title");
    var link_line = document.getElementById("links-line");

    if (json["projects"][pv]["principal-type"] == "3d") {
      for (var i = 0; i < primary_text.length; i++) {
        primary_text[i].style.color = "var(--secondary)";
      }
      for (var i = 0; i < primary_bg.length; i++) {
        primary_bg[i].style.background = "var(--secondary)";
      }
      project_info.style.borderColor = "var(--secondary)";
    } else if (json["projects"][pv]["principal-type"] == "leveldesign") {
      for (var i = 0; i < primary_text.length; i++) {
        primary_text[i].style.color = "var(--tertiary)";
      }
      for (var i = 0; i < primary_bg.length; i++) {
        primary_bg[i].style.background = "var(--tertiary)";
      }
      project_info.style.borderColor = "var(--tertiary)";
    } else if (json["projects"][pv]["principal-type"] == "other") {
      for (var i = 0; i < primary_text.length; i++) {
        primary_text[i].style.color = "var(--other)";
      }
      for (var i = 0; i < primary_bg.length; i++) {
        primary_bg[i].style.background = "var(--other)";
      }
      project_info.style.borderColor = "var(--other)";
    }

    title.textContent = json["projects"][pv]["title"];
    short_description.textContent = json["projects"][pv]["short-description"];
    year.textContent = json["projects"][pv]["year"];
    project_title.style.backgroundImage =
      "linear-gradient(to top, var(--dark), rgba(0, 0, 0, 0)), url('images/" +
      json["projects"][pv]["big-cover"] +
      "')";

    var buttonsLength = json["projects"][pv]["buttons"].length;
    for (var i = 0; i < buttonsLength; i++) {
      if (json["projects"][pv]["buttons"][i][0] == "gameplay") {
        gameplay.classList.remove("hide");
        gameplay.dataset.url = json["projects"][pv]["buttons"][i][1];
      } else if (json["projects"][pv]["buttons"][i][0] == "trailer") {
        trailer.classList.remove("hide");
        trailer.dataset.url = json["projects"][pv]["buttons"][i][1];
      }
    }

    for (var i = 0; i < json["projects"][pv]["author"].length; i++) {
      if (json["projects"][pv]["author"][i][1] == "") {
        author.innerHTML += json["projects"][pv]["author"][i][0] + "<br>";
      } else {
        author.innerHTML +=
          "<a target='blank' class='link' href='" +
          json["projects"][pv]["author"][i][1] +
          "'>" +
          json["projects"][pv]["author"][i][0] +
          "</a><br>";
      }
    }

    for (var i = 0; i < json["projects"][pv]["disciplines"].length; i++) {
      disciplines.innerHTML += json["projects"][pv]["disciplines"][i] + "<br>";
    }

    if (json["projects"][pv]["awards"].length == 0) {
      awards_title.style.display = "none";
    } else {
      for (var i = 0; i < json["projects"][pv]["awards"].length; i++) {
        awards.innerHTML +=
          "<a target='blank' class='link' href='" +
          json["projects"][pv]["awards"][i][1] +
          "'>" +
          json["projects"][pv]["awards"][i][0] +
          "</a><br>";
      }
    }

    if (json["projects"][pv]["client"].length == 0) {
      client_title.style.display = "none";
    } else {
      for (var i = 0; i < json["projects"][pv]["client"].length; i++) {
        client.innerHTML +=
          "<a target='blank' class='link' href='" +
          json["projects"][pv]["client"][i][1] +
          "'>" +
          json["projects"][pv]["client"][i][0] +
          "</a><br>";
      }
    }

    long_description.innerHTML = json["projects"][pv]["long-description"];
    what.innerHTML = json["projects"][pv]["what-i-did"];
    aditional_info.innerHTML = json["projects"][pv]["aditional-info"];

    for (var i = 0; i < json["projects"][pv]["images"].length; i++) {
      if (json["projects"][pv]["images"][i][1] == "two") {
        let imgDivImg = document.createElement("img");
        imgDivImg.className = "project-img img-doble";
        imgDivImg.src = "images/" + json["projects"][pv]["images"][i][0];
        img_container.append(imgDivImg);
        imgDivImg.style.backgroundImage =
          "url(images/" + json["projects"][pv]["images"][i][0] + ")";
      } else if (json["projects"][pv]["images"][i][1] == "one") {
        let imgDivImg = document.createElement("img");
        imgDivImg.className = "project-img";
        imgDivImg.src = "images/" + json["projects"][pv]["images"][i][0];
        img_container.append(imgDivImg);
        imgDivImg.style.backgroundImage =
          "url(images/" + json["projects"][pv]["images"][i][0] + ")";
      } else if (json["projects"][pv]["images"][i][1] == "twoFirst") {
        let imgDivImg = document.createElement("img");
        imgDivImg.className = "project-img img-doble img-doble-first";
        imgDivImg.src = "images/" + json["projects"][pv]["images"][i][0];
        img_container.append(imgDivImg);
        imgDivImg.style.backgroundImage =
          "url(images/" + json["projects"][pv]["images"][i][0] + ")";
      }
    }

    var linksLength = json["projects"][pv]["links"].length;

    if (json["projects"][pv]["links"].length == 0) {
      link_title.style.display = "none";
      link_line.style.display = "none";
    } else {
      for (var i = 0; i < linksLength; i++) {
        let otherA = document.createElement("a");
        otherA.href = json["projects"][pv]["links"][i][1];
        otherA.className = "button";
        otherA.target = "blank";
        otherA.textContent = json["projects"][pv]["links"][i][0];
        links.append(otherA);
      }
    }
  }
}
