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

    ul.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("card") && !e.target.classList.contains("dragging")) {
            const draggingcard = document.querySelector(".drgging");
            const cards = [...ul.querySelectorAll(".card")];
            // console.log(cards.indexOf(draggingcard));
            const currentpos = cards.indexOf(draggingcard);
            const newpos = cards.indexOf(e.target);
            // console.log(currentpos,newpos);
            if (currentpos > newpos) {
                //from down come to up
                ul.insertBefore(draggingcard, e.target);
            } else {
                //from up come to down
                ul.insertBefore(draggingcard, e.target.nextSibling);
            }
            const todoes = JSON.parse(localStorage.getItem("todoes"));
            // console.log(todoes);
            const removed = todoes.splice(currentpos, 1);
            // console.log(removed);
            todoes.splice(newpos, 0, removed[0]);
            // console.log(todoes);
            localStorage.setItem("todoes", JSON.stringify(todoes));

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
            makeToDoElement([currentToDo]);
        }


    });


    function removeTodo(index) {
        const todos = JSON.parse(localStorage.getItem(("todoes")));
        todos.splice(index, 1);
        localStorage.setItem("todoes" , JSON.stringify(todos));
    
    }


    function sateTodo(index, isComplete) {
        const todos = JSON.parse(localStorage.getItem("todoes"));
        // console.log(isComplete +"   isComplete");
        // console.log(todos[index].isCompleted);
        todos[index].isCompleted = isComplete;
        // todos[index].isCompleted = isComplete;
        // console.log(todos[index].isCompleted +"   isCompleted");

        console.log(todos);
        localStorage.setItem("todoes", JSON.stringify(todos));

    }

    function makeToDoElement(todoArray) {
        if (!todoArray) {
            return null;

        }

        const ItemsLeft = document.querySelector('#items-left');
        todoArray.forEach(todoObject => {
            //create html elements
            const card = document.createElement("li");
            const cbContainer = document.createElement("div");
            const cbInput = document.createElement("input");
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

            if(todoObject.isCompleted == true){
                card.classList.add('checked');
                cbInput.setAttribute('checked','checked');
            }

            //add eventlistener
            card.addEventListener("dragstart", () => {
                card.classList.add("drgging");
            });

            clearBtn.addEventListener("click", () => {

                const currentcard = clearBtn.parentElement;
           
                currentcard.classList.add('fall');
                const inndexOfcurrent = [...document.querySelectorAll(".todos .card")].indexOf(currentcard);
                removeTodo(inndexOfcurrent);
                currentcard.addEventListener('animationend', () => {
                    
                    //todo set new value of Items left
                    setTimeout(()=>{
                        currentcard.remove();
                        ItemsLeft.textContent =document.querySelectorAll(
                            ".todos .card:not(.checked)"
                         ).length;

                    },100);
                })
            })

            cbInput.addEventListener("click", () => {


                const currentcard = cbInput.parentElement.parentElement;
                // console.log(currentcard);
                const checked = cbInput.checked;
                // console.log(checked + "         checked");
                const currentindex = [...document.querySelectorAll(".todos .card")].indexOf(currentcard);
                // console.log(currentindex);
                sateTodo(currentindex, checked);

                 checked 
                 ? currentcard.classList.add("checked")
                 :currentcard.classList.remove("checked");

                 ItemsLeft.textContent =document.querySelectorAll(".todos .card:not(.checked)").length;
                 console.log(ItemsLeft.textContent);



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
        ItemsLeft.textContent =document.querySelectorAll(
            ".todos .card:not(.checked)"
         ).length;
    
    }

    todoInput.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            addBtn.click();
        }
    });


}
document.addEventListener('DOMContentLoaded', main);