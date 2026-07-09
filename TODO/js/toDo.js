class ToDoItem {
    #title;
    #status;
    #startDate;
    #endDate;

    constructor(title, startDate = new Date(), endDate = null, status = 'todo') {
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

    getBeautyDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }

    getStartDate() {
        return this.getBeautyDate(this.#startDate);
    }

    getEndDate() {
        return this.#endDate ? this.getBeautyDate(this.#endDate) : null;
    }

    showItem() {
        const itemInfo = document.createElement('div');
        const status = this.getStatus();
        const lineThrougth = status === 'done' ? 'text-decoration-line-through' : '';
        const displayClass = status === 'todo' ? 'd-none' : '';

        itemInfo.innerHTML = `
            <div class="d-flex justify-content-between align-items-center ">
                <div class="d-flex flex-column">
                    <div class="fw-semibold ${lineThrougth}">${this.getTitle()}</div>
                    <small class="text-secondary">Created: ${this.getStartDate()}</small>
                    <small class="text-secondary ${displayClass}">Done: ${this.getEndDate()}</small>
                </div>
                <span class="badge text-bg-${status === 'done' ? 'success' : 'warning'} rounded-pill">${status}</span>
            </div>
        `;

        return itemInfo.innerHTML;
    }

    markAsDone() {
        this.#status = 'done';
        this.#endDate = new Date();
    }
}


// ----------------------------
// ----------------------------
// ----------------------------

const toDoList = [];
const toDoListItems = document.getElementById('toDoListItems');
const toDoInput = document.getElementById('toDoInput');
const addToDoBtn = document.getElementById('addToDoBtn');

addToDoBtn.addEventListener('click', () => {
    const title = toDoInput.value.trim();
    if (title) {
        addToDoItem(title);
    }
});

function addToDoItem(title) {
    const newItem = new ToDoItem(title);
    toDoList.push(newItem);
    renderToDoList();
    toDoInput.value = '';
}

function renderToDoList() {
    toDoListItems.innerHTML = '';
    for (const item of toDoList) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = item.showItem();
        toDoListItems.appendChild(li);
        // console.log(item);
    }
}

toDoListItems.addEventListener('click', (event) => {
    const clickedItem = event.target;

    const itemIndex = Array.from(toDoListItems.children).indexOf(clickedItem.closest('li'));
    if (itemIndex !== -1) {
        const item = toDoList[itemIndex];
        if (item.getStatus() == 'todo') {
            item.markAsDone();
            renderToDoList();
        }
    }
});