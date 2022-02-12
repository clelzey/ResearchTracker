let myResearch = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const researchFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (researchFromLocalStorage) {
    myResearch = researchFromLocalStorage
    render(myResearch)
}

function render(leads) {
    let listItems = ""
    leads.forEach( (lead) => {
        listItems += `
            <li>
                <a target='_blank' href='${lead}'>
                    ${lead}
                </a>
            </li>
        `
    })
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    myResearch = []
    render(myResearch)
})

tabBtn.addEventListener("click", () => {    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		myResearch.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myResearch) )
        render(myResearch)
    })
})

inputBtn.addEventListener("click", () => {
    myResearch.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myResearch) )
    render(myResearch)
})