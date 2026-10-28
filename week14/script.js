const input_name = document.getElementById("input")
const btn = document.getElementById("adding")
const container = document.getElementById("to-do_list")
let name_list = []

function createLi(text) {
    let li = document.createElement("li")

    let span = document.createElement("span")
    span.textContent = text

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "delete"
    deleteBtn.className = "delete_btn"
    deleteBtn.addEventListener("click", () => {
        li.remove()
        
        let index = name_list.indexOf(text)
        if (index !== -1) {
            name_list.splice(index, 1)
        }
        updateStorage()
    })

    li.appendChild(span)
    li.appendChild(deleteBtn)

    return li
}

function updateStorage() {
    let arr_to_text = JSON.stringify(name_list)
    localStorage.setItem("name_list", arr_to_text)
}

btn.addEventListener("click", () => {
    if (input_name.value.trim() === "") return

    let new_li = createLi(input_name.value)
    container.appendChild(new_li)

    name_list.push(input_name.value)
    updateStorage()

    input_name.value = ""
})

window.onload = () => {
    let data = localStorage.getItem("name_list")
    if (data) {
        let arr = JSON.parse(data)
        arr.forEach((i) => {
            let new_li = createLi(i)
            container.appendChild(new_li)
            name_list.push(i)
        })
    }
}