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

  // // To show only the videogames
  // var proAll = document.getElementsByClassName("project");
  // var proGame = document.getElementsByClassName("project-game");
  // for (var i = 0; i < proAll.length; i++) {
  //   proAll[i].classList.add("hide");
  // }
  // for (var i = 0; i < proGame.length; i++) {
  //     proGame[i].classList.remove("hide");
  // }
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

    let yearDiv = document.createElement("h5");
    yearDiv.className = "year-element";
    yearDiv.textContent =
      json["projects"][i]["year"];
    projectDiv.append(yearDiv);

    let titleDiv = document.createElement("h6");
    titleDiv.textContent =
      json["projects"][i]["title"];
    projectDiv.append(titleDiv);
    
   
    
    /*
    let colorDiv = document.createElement("div");
    colorDiv.className = "color-div";
    projectDiv.append(colorDiv);
    */
    let infoDiv = document.createElement("div");
    infoDiv.className = "project-info";
    projectDiv.append(infoDiv);
    
   /* let labelsDiv = document.createElement("div");
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
      } else if (json["projects"][i]["type-project"][j] == "leveldesign") {
        labelP.className =
          "label label-" + json["projects"][i]["type-project"][j];
        labelP.textContent = "LEVEL DESIGN";
      } else {
        labelP.className =
          "label label-" + json["projects"][i]["type-project"][j];
        labelP.textContent = "OTHER";
      }
      labelsDiv.append(labelP);
    }*/


    

    let descP = document.createElement("h7");
    descP.className = "short-desc";
    descP.textContent = json["projects"][i]["short-description"] ;
    infoDiv.append(descP);

    
    let projectImg = document.createElement("img");
    projectImg.src = "images/" + json["projects"][i]["small-cover"];
    infoDiv.append(projectImg);


    let disciplines = document.createElement("h7");
    disciplines.className = "roles";
    disciplines.textContent = json["projects"][i]["disciplines"] ;
    infoDiv.append(disciplines);

    let client = document.createElement("h7");
    client.className = "client";
    client.textContent =  json["projects"][i]["client"][0][0];
    infoDiv.append(client);
    
  }

  clasification();
  infoClick(json);
}

function clasification() {
  var buttonGame = document.getElementById("button-games");
  var button3d = document.getElementById("button-3d");
  var buttonOther = document.getElementById("button-other");
  var buttonLevelDesign = document.getElementById("button-leveldesign");
  var buttonAll = document.getElementById("button-all");

  var proGame = document.getElementsByClassName("project-game");
  var pro3d = document.getElementsByClassName("project-3d");
  var proLevelDesign = document.getElementsByClassName("project-leveldesign");
  var proOther = document.getElementsByClassName("project-other");
  var proAll = document.getElementsByClassName("project");

  buttonGame.addEventListener("click", showGame);
  button3d.addEventListener("click", show3d);
 // buttonLevelDesign.addEventListener("click", showLevelDesign);
 // buttonOther.addEventListener("click", showOther);
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

  function showLevelDesign() {
    for (var i = 0; i < proAll.length; i++) {
      proAll[i].classList.add("hide");
    }
    for (var i = 0; i < proLevelDesign.length; i++) {
      proLevelDesign[i].classList.remove("hide");
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
