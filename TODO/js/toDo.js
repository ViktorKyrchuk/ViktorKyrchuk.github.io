class ToDoItem {
    #title;
    #status;
    #startDate;
    #endDate;

    constructor(title, startDate = new Date(), endDate = new Date(null), status = "todo") {
        this.#title = title;
        this.#status = status;
        this.#startDate = startDate;
        this.#endDate = endDate;
    }

    getTitle() {
        return this.#title;
    }

    getStatus() {
        return this.#status;
    }

    addZero(num) {
        return num < 10 ? "0" + num : num;
    }

    getBeautyDate(date) {
        return `${this.addZero(date.getDate())}/${this.addZero(date.getMonth() + 1)}/${date.getFullYear()} ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`;
    }

    getStartDate() {
        return this.#startDate;
    }

    getEndDate() {
        return this.#endDate ? this.#endDate : null;
    }

    showItem() {
        const itemInfo = document.createElement("div");
        const status = this.getStatus();

        let lineThrougth = "";
        let displayClass = "";

        switch (status) {
            case "todo":
                lineThrougth = "";
                displayClass = "d-none";
                break;
            case "done":
                lineThrougth = "text-decoration-line-through text-muted";
                displayClass = "";
                break;
            default:
                lineThrougth = "";
                displayClass = "";
                break;
        }

        itemInfo.innerHTML = `
            <div class="d-flex justify-content-between align-items-center ">
                <div class="d-flex flex-column">
                    <div class="fw-semibold ${lineThrougth}">${this.getTitle()}</div>
                    <small class="text-secondary">Created: ${this.getBeautyDate(this.getStartDate())}</small>
                    <small class="text-secondary ${displayClass}">Done: ${this.getEndDate() ? this.getBeautyDate(this.getEndDate()) : ""}</small>
                </div>
                <span class="badge text-bg-${status === "done" ? "success" : "warning"} rounded-pill">${status}</span>
            </div>
        `;

        return itemInfo.innerHTML;
    }

    markAsDone() {
        this.#status = "done";
        this.#endDate = new Date();
    }
}

// ----------------------------
// ----------------------------
// ----------------------------

const toDoList = [];
const toDoListItems = document.getElementById("toDoListItems");
const toDoInput = document.getElementById("toDoInput");
const addToDoBtn = document.getElementById("addToDoBtn");
const tasksCount = document.getElementById("tasksCount");

addToDoBtn.addEventListener("click", () => {
    const title = toDoInput.value.trim();
    if (title) {
        addToDoItem(title);
    }
});

toDoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const title = toDoInput.value.trim();
        if (title) {
            addToDoItem(title);
        }
    }
});

function addToDoItem(title) {
    const newItem = new ToDoItem(title);
    toDoList.push(newItem);
    renderToDoList();
    saveToLocalStorage();
    toDoInput.value = "";
}

function renderToDoList() {
    toDoListItems.innerHTML = "";
    tasksCount.textContent = toDoList.length;

    if(toDoList.length === 0) {
        const li = document.createElement("li");
        li.className = "list-group-item text-center text-secondary";
        li.innerHTML = 'There are no tasks in your list.<br/> Add a new task to get started!';
        toDoListItems.appendChild(li);
        return;
    }
    for (const item of toDoList) {
        const li = document.createElement("li");
        li.className = `list-group-item user-select-none ${item.getStatus() === "done" ? "list-group-item-success" : ""}`;
        li.innerHTML = item.showItem();
        toDoListItems.appendChild(li);
    }
}

toDoListItems.addEventListener("click", (event) => {
    const clickedItem = event.target;

    const itemIndex = Array.from(toDoListItems.children).indexOf(
        clickedItem.closest("li"),
    );
    if (itemIndex !== -1) {
        const item = toDoList[itemIndex];
        if (item.getStatus() == "todo") {
            item.markAsDone();
            renderToDoList();
            saveToLocalStorage();
        }
    }
});

// use localStorage to save the toDoList array

function saveToLocalStorage() {
    localStorage.setItem(
        "toDoList",
        JSON.stringify(
            toDoList.map((item) => ({
                title: item.getTitle(),
                status: item.getStatus(),
                startDate: item.getStartDate(),
                endDate: item.getEndDate(),
            })),
        ),
    );
}

function loadFromLocalStorage() {
    const storedList = localStorage.getItem("toDoList");
    if (storedList) {
        const parsedList = JSON.parse(storedList);
        for (const itemData of parsedList) {
            const item = new ToDoItem(
                itemData.title,
                new Date(itemData.startDate),
                new Date(itemData.endDate),
                itemData.status,
            );
            toDoList.push(item);
        }
    }
}

window.onload = () => {
    loadFromLocalStorage();
    renderToDoList();
};
