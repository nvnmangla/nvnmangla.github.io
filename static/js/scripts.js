feather.replace({ 'stroke-width': 3.2 });


var inProgress = new Object()
inProgress.color = "#ff9f2d"
inProgress.count = 0

var upcoming = new Object()
upcoming.color = "#ff9f2d"
upcoming.count = 0

var completed = new Object()
completed.color = "#ff9f2d"
completed.count = 0

function diff_months(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.round(diff));

}

function getWords(monthCount) {
    function getPlural(number, word) {
        return number === 1 && word.one || word.other;
    }

    var months = { one: 'month', other: 'months' },
        years = { one: 'year', other: 'years' },
        m = monthCount % 12,
        y = Math.floor(monthCount / 12),
        result = [];

    y && result.push(y + ' ' + getPlural(y, years));
    m && result.push(m + ' ' + getPlural(m, months));
    return result.join(' and ');
}





const details = {
    "Finamics Engineering": {
        "title": "Co-Founder",
        "organization": "Finamics Engineering",
        "duration": "May 2019 - June 2020",
        "name": "Finamics Engineering",
        "details": ["Designed Multi-axis CNC Wood Router and CNC Spinning from scratch, involved Modal Analysis reducing 20% of the weight and 10% increment in Natural Frequency",
        "Responsible for Material Selection, Design, Testing, and Simulation", 
        "Retrofit, CNC spinning machine involving Structural and Topology optimization",
        "Achieved cost-saving of 45% during R&D",
        "Auto G-Coding using Art-Cam (wood router), and Manual G-Coding (Spinning)",
        "Successfully Delivered 2 wood routers and 1 Spinning Machine"]
    },
    
    "Deapartment of Aerospace - TA":{
        "title": "Graduate Teaching Assistant",
        "organization": "Department of Aerospace",
        "duration": "August 2022 - May 2023",
        "name": "Department of Aerospace",
        "website":"https://aero.umd.edu/",
        "details": ["ENAE 380 - Flight Software Systems",
        "ENAE 450 - Robot Programming",
        "Assisted Students in Turtlebot Programming, Gazebo Visualization, Maze Solver using Turtlebot"]
    },
    
    "Department of Aerospace - GA":{
        "title": "Graduate Research Assistant",
        "organization": "Department of Aerospace",
        "duration": "July 2022 - December 2022",
        "name": "Department of Aerospace",
        "website":"https://aero.umd.edu/",
        "details": ["Obstacle Detection for UAV (50 miles/hr), US Army Project.", 
        "Implemented Pushbroom Stereo to compute Depth map"]
    },

    "Perception and Robotics Group - GA":{
        "title": "Graduate Research Assistant",
        "organization": "Perception and Robotics Group",
        "duration": "June 2022 - July 2022",
        "name": "Department of Aerospace",
        "website":"https://prg.cs.umd.edu/",
        "details": ["3D Reconstruction of Vicon recorded scene of various objects in ROSBAG",
            "Computation of Depth map and Segmentation Map for Data Set using"]
    },

}
const orgs = ["Finamics Engineering", "Deapartment of Aerospace - TA","Department of Aerospace - GA","Perception and Robotics Group - GA"]

function insertOrgs() {
    let orgContainer = document.querySelector('.work-experience-list')
    orgs.forEach(org => {
        orgContainer.innerHTML += `<div class="checkbox" onclick="toggleExperience(this)">
                    <div class="input">
                    <div class="label">${org}</div>
                    </div>
                  </div>`
    })
}
function toggleExperience(e) {
    const experiences = document.querySelectorAll(".input");
    var object = details[e.childNodes[1].childNodes[1].innerHTML];

    var part_one = `<div class="card-info">
    <div class="experience-title">${object.title}<span> @ ${object.organization}</span></div>
    <div class="experience-duration">${object.duration}</div>`
    var experienceDetails = "";
    object.details.forEach(detail => {
        experienceDetails += `<div class="experience-detail-item">${detail}</div>`
    })


    var part_two = `<div class="experience-details">${experienceDetails}</div></div>`

    for (let experience of experiences) {
        experience.classList.remove('checked');
    }
    e.childNodes[1].classList.add('checked');
    var [dt1, dt2] = object.duration.split("-");
    var dtF = (dt2 === " Present") ? Date.today() : Date.parse(dt2);
    let duration = diff_months(Date.parse(dt1), dtF) + 1
    document.querySelector(".work-experience-content-left").innerHTML = part_one + part_two;
    document.querySelector(".work-experience-content-right").innerHTML = `duration: &nbsp;${getWords(duration)}`;
    document.querySelector(".work-experience-footer-content").innerHTML = `<span class="part-one">Website: &nbsp;<a href="${object.website}" target="_blank">${object.website}</a></span>
                                                <span class="part-two">Registered Name: &nbsp;${object.name}</span>`
}
insertOrgs();
toggleExperience(document.querySelector(".work-experience-list").childNodes[1])

let projectObject = {};
async function auto_update_projects() {
    let response = await fetch(`https://api.github.com/users/nvnmangla/repos`);
    otherProjects = `<div class="other-projects">
                        <div class="other-projects-main-container">`
    
    let data = await response.json().then(ele => {
        project_div = ""
        status = ""
        ele.forEach(element => {
            if (element.description !== null && element.description.includes("<In-progress>")) {inProgress.count += 1;status = "<In-progress>"}
            else if (element.description !== null && element.description.includes("<Completed>")) {completed.count += 1;status = "<Completed>"}
            else if (element.description !== null && element.description.includes("<Upcoming>")) {upcoming.count += 1;status = "<Upcoming>"}
            if (element.description !== null && element.description.includes("#")) {
                
                folder = "#";
                id = element.id;
                topics = element.topics;
                topicsArr = []
                topicsString = `<div class="project-topics">`;
                topics.forEach(topic => {
                    topicsArr.push(topic)
                    topicsString += `<span class="topics">${topic}</span>`
                });
                topicsString += "</div>"

                default_branch = element.default_branch;
                
                projectLink = "#";
                title = element.name;
                content = element.description;
                content = content.slice(0, -1)
                if(element.description.includes("@")) {
                    obj = content.split("@");
                    content = obj[0]
                    github = obj[1]
                }
                else {
                    github = element.html_url;
                }

                content = content.split("<")[0]
                bg = element.homepage;
                bg = bg ? bg : "https://cdna.artstation.com/p/assets/images/images/008/571/854/large/klaus-wittmann-overdrive-b-w.jpg?1513640413";
                projectObject[id] = {"project-title":`Project: ${title}`, "project-description":content, "project-topics":topicsArr}
                string = ` 
                        <a class="corner-box" href=${github} target="_blank">
                            <div class="left-legend">
                                <div class="data-source">
                                    INTERNAL_DOC_ID: [${id}]
                                </div>
                            </div>
                            <div class="corner-box-content-wrapper"><div class="corner-box-content-bg" style="background:url(${bg}); background-size:cover; background-repeat:no-repeat">
                            <div class="triangle"></div>
                                <div class="corner-box-content" id="${id}">
                                <div class="corner-box-content-cover" onmouseover="randomOnHover(this)" onmouseout="normalOnNotHover(this)"></div>
                                    <div class="project-top">
                                        <h1 class="project-title">Project: ${title}</h1>
                                        <p class="project-description">${content}</p>
                                    </div>
                                    ${topicsString}
                            </div>
                                
                            </div></div>
                            <div class="right-legend">
                                <div class="data-source">
                                    904add5c-[Click for github repository]
                                </div>
                            </div>
                        </a>`;
                project_div = string + project_div;


            }
            else if (element.description !== null && element.description.includes("$")){
                title = element.name;
                topics = element.topics;
                topicsString = ``;
                topics.forEach(topic => {
                    topicsString += `<span class="other-project-topic" style="color: #fff;">${topic}</span>`
                });
                title = title.charAt(0).toUpperCase() + title.slice(1);
                content = element.description;
                content = content.slice(0, -1)
                if(element.description.includes("@")) {
                    obj = content.split("@");
                    content = obj[0]
                    github = obj[1]
                }
                else {
                    github = element.html_url;
                }
                if(status == "<Completed>") {progress = 100; color="#34c471"}
                else {
                    if(element.description.includes("^")) {
                        obj = content.split("^");
                        progress = obj[1];
                        content = obj[0];
                    }
                    else{progress = 60;}
                     
                    color="#ff9f2d"
                }
                otherProjects += ` <a class="other-project-wrapper" href=${github} target="_blank">
                                            <div class="other-project-content">
                                                <div class="triangle"></div>
                                                <div class="other-project-header">${title}</div>
                                                <div class="other-project-sub-header">${content}</div>
                                                <div class="other-project-progress-wrapper">
                                                    <div class="other-project-progress-bar">
                                                        <span class="other-project-progress" ,
                                                            style="width: ${progress}%; background-color: ${color};"></span>
                                                    </div>
                                                    <p class="other-project-progress-percentage">Progress: ${progress}%</p>
                                                    <div class="other-project-topics-wrapper">
                                                        ${topicsString}
                                                    </div>
                                                </div>
                                            </div>
                                        </a>`
            }
        });
        document.querySelector('.wrapper').innerHTML += ` 
                    <div class="project-heading">
                                    <div class="project-heading-title">PROJECTS</div>
                                    <div class="project-status-container">
                                        <div class="project-status">
                                            <div class="project-status-number">${inProgress.count}</div>
                                            <div class="project-status-title">In Progress</div>
                                        </div>
                                        <div class="project-status">
                                            <div class="project-status-number">${upcoming.count}</div>
                                            <div class="project-status-title">Upcoming</div>
                                        </div>
                                        <div class="project-status">
                                            <div class="project-status-number">${completed.count}</div>
                                            <div class="project-status-title">Completed</div>
                                        </div>
                                    </div>
                                </div>`
    document.querySelector('.wrapper').innerHTML += project_div
    document.querySelector('.wrapper').innerHTML += `<div class="project-heading"><div class="project-heading-title" style="padding-top: 40px;">OTHER PROJECTS</div></div>`
    document.querySelector('.wrapper').innerHTML += otherProjects + `</div></div>`
    
    })
}

auto_update_projects()

const scrambleText = text => {
    const randomInt = max => Math.floor(Math.random() * max)
    const randomFromArray = array => array[randomInt(array.length)]
    const chars = '*?><[]&@#)(.%$-_:/;?!'.split('')
    return text
        .split('')
        .map(x => randomInt(3) > 1 ? randomFromArray(chars) : x)
        .join('')
}

function scrambleHandler(e, id) {
    let count = 0;
    let interval = setInterval(() => {
        if (++count === 5) {
            clearInterval(interval)
            e.innerText = projectObject[id][e.className]
        } else {
            e.innerText = scrambleText(projectObject[id][e.className])
        }
    }

        , 100)
}

function scrambleHandlerTopics(e, id, index) {
    let count = 0;
    let interval = setInterval(() => {
        if (++count === 5) {
            clearInterval(interval)
            e.innerText = projectObject[id]["project-topics"][index].toUpperCase();
        } else {
            e.innerText = scrambleText(projectObject[id]["project-topics"][index].toUpperCase())
        }
    }

        , 70)
}





function randomOnHover(ele) {
    let e = ele.parentNode;
    let id = e.id
    let index = 0;
    
    let arr = [e.querySelector("h1"), e.querySelector("p")]
    let arrTopics = e.querySelectorAll("span")
    
    arr.forEach(ele => scrambleHandler(ele,id))
    arrTopics.forEach(ele => {
        scrambleHandlerTopics(ele,id,index)
        index += 1
    })
    
}

function normalOnNotHover(ele) {
    let e = ele.parentNode;
    let id = e.id;
    let index = 0;
    let arr = [e.querySelector("h1"), e.querySelector("p")]
    arr.forEach(ele => scrambleHandler(ele,id))
    let arrTopics = e.querySelectorAll("span")
    
    arr.forEach(ele => scrambleHandler(ele,id))
    arrTopics.forEach(ele => {
        scrambleHandlerTopics(ele,id,index)
        index += 1
    })
}

window.addEventListener("scroll", () => {
    let element =  document.querySelector('.scroll-down')
    let distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
	let scrollTop = document.documentElement.scrollTop;

    var fontSize = 25;
    
	
	let opacity = 1;
    diff = scrollTop - distanceToTop;    
	let diffOpacity = opacity - (diff / 1000);
    let diffFont = fontSize - (diff/140);
	element.style.opacity = diffOpacity;
	
    if (diffFont < 0) {
        element.style.fontSize = "0px";
    }
    else {
        element.style.fontSize = `${diffFont}px`;
    }
    

    
});








// document.onreadystatechange = function () {
//     if(document.readyState === "complete"){
//         document.querySelector(".loader").setAttribute("style", "height: 0; visibility:hidden");
//         document.querySelector(".page-wrapper").style.visibility = "visible";
//     }
//   }
