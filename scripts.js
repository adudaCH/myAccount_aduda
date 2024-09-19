import Action from "./Action.js";
import ActionManager from "./ActionManager.js";

let manager = new ActionManager();

window.addNewAction = function addNewAction() {
    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let amount = +document.getElementById("amount").value || 0;
    manager.addAction(new Action(type, description, amount));
    showActions();
    showAll();
};

function showActions() {
    let actions = manager.getlocalStorge();

    let tBody = document.getElementById("tbody");
    // tBody.innerHTML = "";

    for (let action of actions) {
        let colors = action.type == "income" ? "green" : "red";
        tBody.innerHTML += `
        <tr>
            <td class='fw-normal' style="color:${colors};">${action.description}</td>
            <td class='fw-bold' style="color: ${colors};">${action.amount} <i class="fa-solid fs-6 fa-shekel-sign"></i></td>
            <td>
                <button class='btn shadow btn-light' onclick="deleteAction(${action.id})">
                    <i class="fa-solid fa-trash-can text-danger fs-5"></i>
                </button>
            </td>
            <td>
                <button class='btn btn-light shadow' onclick="updateAction(${action.id})">
                    <i class="fa-regular fs-5 fa-pen-to-square text-success"></i>
                </button>
            </td>
        </tr>
        `;
    }
}
// showActions();

function showAll() {
    let color = manager.balance >= 0 ? "success" : "danger";
    document.getElementById("container").innerHTML = `
    <div class="row">
            <h1 class="display-1 text-">
                MY <i class="fa-solid fa-chart-pie"></i> ACCOUNT
            </h1>
        </div>
        <div class="row">
        <div class="alert alert-secondary text-primary fs-1" id="balance">Balance : 
        <span class="text-${color}">
        ${manager.calcBalance()}
        </span>
        </div>
        </div>
        <div class="row">
            <div class="col-md-4 mt-5">
                <!-- form -->
            <select class="form-select" id="type" aria-label="Default select example">
                <option selected value="income">Income</option>
                <option value="expense">Expense</option>
                <!-- <option value="2">Two</option>
                <option value="3">Three</option> -->
        </select>
            <div class="form-floating my-3 mt-3">
        <input type="text" class="form-control" id="description" placeholder="Description">
        <label for="amount">Description</label>
        </div>
        <div class="form-floating">
        <input type="number" class="form-control" id="amount" placeholder="0">
        <label for="floatingPassword">Amount</label>
        </div>
        <button class="btn btn-dark w-100 mt-4" onclick="addNewAction()" >ADD</button>
            </div>
            <div class="col-md-8">
                <!-- table -->
                <table class="table table-striped">
                    <thead>
                        <th class="col-5">Description</th>
                        <th class="col-5">Amount</th>
                        <th class="col-1"></th>
                        <th class="col-1"></th>
                    </thead>
                    <tbody id="tbody"></tbody>
                </table>
            </div>
        </div>

    `;
    showActions();
}
showAll();

window.deleteAction = function deleteAction(id) {
    if (confirm("Are you sure you want to delete?")) manager.deleteAction(id);
    showActions();
    showAll();
};

window.updateAction = function updateAction(id) {
    let promptFromUser = prompt("Add a new amount");
    if (promptFromUser && promptFromUser > 0) {
        manager.updateAction(id, promptFromUser);
    }
    showActions();
    showAll();
};
