const requestURL = "data/projects.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

var projectNumber;
var projectKeyword;

request.onload = function () {
  const projects = request.response;
  createProject(projects);
};

const divProjects = document.getElementById("projects-container");

function createProject(json) {
  lenghtProjects = json["projects"].length;
  for (i = 0; i < json["projects"].length; i++) {
    lenghtType = json["projects"][i]["type-project"].length;

    let projectDiv = document.createElement("div");
    projectDiv.className = "project";
    for (var j = 0; j < lenghtType; j++) {
      projectDiv.classList.add(
        "project-" + json["projects"][i]["type-project"][j]
      );
    }
    divProjects.append(projectDiv);

    let hoverDiv = document.createElement("div");
    hoverDiv.className = "hover-element";
    hoverDiv.id = i;
    projectDiv.append(hoverDiv);

    let titleDiv = document.createElement("h4");
    titleDiv.textContent =
      json["projects"][i]["title"] + " - " + json["projects"][i]["year"];
    projectDiv.append(titleDiv);

    let colorDiv = document.createElement("div");
    colorDiv.className = "color-div";
    projectDiv.append(colorDiv);

    let infoDiv = document.createElement("div");
    infoDiv.className = "project-info";
    projectDiv.append(infoDiv);

    let labelsDiv = document.createElement("div");
    labelsDiv.className = "labels";
    infoDiv.append(labelsDiv);

    for (var j = 0; j < lenghtType; j++) {
      let labelP = document.createElement("p");
      if (json["projects"][i]["type-project"][j] == "game") {
        labelP.className =
          "label label-" + json["projects"][i]["type-project"][j];
        labelP.textContent = "GAMES";
      } else if (json["projects"][i]["type-project"][j] == "3d") {
        labelP.className =
          "label label-" + json["projects"][i]["type-project"][j];
        labelP.textContent = "3D MODELING";
      } else {
        labelP.className =
          "label label-" + json["projects"][i]["type-project"][j];
        labelP.textContent = "OTHER";
      }
      labelsDiv.append(labelP);
    }

    let descP = document.createElement("p");
    descP.className = "short-desc";
    descP.textContent = json["projects"][i]["short-description"];
    infoDiv.append(descP);

    let projectImg = document.createElement("img");
    projectImg.src = "images/" + json["projects"][i]["small-cover"];
    infoDiv.append(projectImg);
  }

  clasification();
  infoClick(json);
}

function clasification() {
  var buttonGame = document.getElementById("button-games");
  var button3d = document.getElementById("button-3d");
  var buttonOther = document.getElementById("button-other");
  var buttonAll = document.getElementById("button-all");

  var proGame = document.getElementsByClassName("project-game");
  var pro3d = document.getElementsByClassName("project-3d");
  var proOther = document.getElementsByClassName("project-other");
  var proAll = document.getElementsByClassName("project");

  buttonGame.addEventListener("click", showGame);
  button3d.addEventListener("click", show3d);
  buttonOther.addEventListener("click", showOther);
  buttonAll.addEventListener("click", showAll);

  function showGame() {
    for (var i = 0; i < proAll.length; i++) {
        proAll[i].classList.add("hide");
    }
    for (var i = 0; i < proGame.length; i++) {
        proGame[i].classList.remove("hide");
    }
  }

  function show3d() {
    for (var i = 0; i < proAll.length; i++) {
        proAll[i].classList.add("hide");
    }
    for (var i = 0; i < pro3d.length; i++) {
        pro3d[i].classList.remove("hide");
    }
  }

  function showOther() {
    for (var i = 0; i < proAll.length; i++) {
      proAll[i].classList.add("hide");
    }
    for (var i = 0; i < proOther.length; i++) {
        proOther[i].classList.remove("hide");
    }
  }

  function showAll() {
    for (var i = 0; i < proAll.length; i++) {
        proAll[i].classList.remove("hide");
    }
  }
}

function infoClick(json) {
  var project = document.getElementsByClassName("project");
  for (var i = 0; i < project.length; i++) {
    project[i].addEventListener("click", function (event) {
      var projectNumber = event.target.id;
      console.log(projectNumber);
      localStorage.setItem("projectNumberKey", json["projects"][projectNumber]["keyword"]);
      window.location.href = "project.html" + "#" + json["projects"][projectNumber]["keyword"];
    });
  }
}
