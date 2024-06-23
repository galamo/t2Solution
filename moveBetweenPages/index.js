const mainContent = document.querySelector("#main-content")
function init() {

    document.querySelector("#about").addEventListener("click", () => {
        drawAbout()
    })
    document.querySelector("#home").addEventListener("click", () => {
        drawHome()
    })
    document.querySelector("#reports").addEventListener("click", () => {
        drawReports()
    })

}

function drawAbout() {
    // DO A LOT OF THINGS!
    mainContent.innerHTML = ""
    const header = document.createElement("h1")
    header.innerText = "About Me"
    mainContent.append(header)
}
function drawHome() {
    // DO A LOT OF THINGS!
    mainContent.innerHTML = ""
    const header = document.createElement("h1")
    header.innerText = "Home"
    mainContent.append(header)
}
function drawReports() {
    // DO A LOT OF THINGS!
    mainContent.innerHTML = ""
    const header = document.createElement("h1")
    header.innerText = "Reports"
    mainContent.append(header)
}

init()