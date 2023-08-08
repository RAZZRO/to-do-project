const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("addt");
const ul = document.querySelector(".todos");


function main() {

    //Theme switcher
    themeSwitcherBtn.addEventListener('click', () => {
        bodyTag.classList.toggle("light");
        const themeimg = themeSwitcherBtn.children[0];
        themeimg.setAttribute("src",

            themeimg.getAttribute("src") === "./assets/images/icon-sun.svg"
                ? "./assets/images/icon-moon.svg"
                : "./assets/images/icon-sun.svg"

        );
    });


    makeToDoElement(JSON.parse(localStorage.getItem("todoes")));
    ul.addEventListener("dragover",(e) =>{
        e.preventDefault();
        if(e.target.classList.contains("card") && !e.target.classList.contains("dragging")){
            const draggingcard = document.querySelector(".drgging");
            const cards = [...ul.querySelectorAll(".card")];
            console.log(cards.indexOf(draggingcard));

        }

    });


    //add todo in localstorage
    addBtn.addEventListener('click', () => {

        const item = todoInput.value.trim();
        if (item) {

            todoInput.value = "";
            const todoes = !localStorage.getItem("todoes")
                ? []
                : JSON.parse(localStorage.getItem("todoes"));

            const currentToDo = {
                item: item,
                isCompleted: false
            }

            todoes.push(currentToDo);
            localStorage.setItem("todoes", JSON.stringify(todoes));
        }


    });


    function makeToDoElement(todoArray) {
        if (!todoArray) {
            return null;

        }

        todoArray.forEach(todoObject => {
            //create html elements
            const card = document.createElement("li");
            const cbContainer = document.createElement("div");
            const cbInput = document.createElement("inut");
            const checkSpan = document.createElement("span");
            const item = document.createElement("p");
            const clearBtn = document.createElement("button");
            const img = document.createElement("img");

            //create classes
            card.classList.add("card");
            cbContainer.classList.add("cb-container");
            cbInput.classList.add("cb-input");
            checkSpan.classList.add("check");
            item.classList.add("item");
            clearBtn.classList.add("clear");

            //add attributes
            card.setAttribute("draggable", "true");
            cbInput.setAttribute("type", "checkbox");
            img.setAttribute("src", "./assets/images/icon-cross.svg");
            img.setAttribute("alt", "Clear it");

            item.textContent = todoObject.item;

            //add eventlistener
            card.addEventListener("dragstart", () => {
                card.classList.add("drgging");
            });

            card.addEventListener("dragend", () => {
                card.classList.remove("drgging");

            });

            //set elements by parrent child
            clearBtn.appendChild(img);
            cbContainer.appendChild(cbInput);
            cbContainer.appendChild(checkSpan);
            card.appendChild(cbContainer);
            card.appendChild(item);
            card.appendChild(clearBtn);

            document.querySelector(".todos").appendChild(card);




        });
    }


}
document.addEventListener('DOMContentLoaded', main);