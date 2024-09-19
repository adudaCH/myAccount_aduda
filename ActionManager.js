class ActionManager {
    constructor() {
        this.actions = this.getlocalStorge();
        this.balance = 0;
        this.totalIncome = 0;
        this.totalExpense = 0;
    }


    addAction(action) {
        this.actions.push(action);
        this.calcBalance();
        this.setlocalStorge();
    }


    deleteAction(id) {
        this.actions = this.actions.filter(action => action.id !== id);
        this.calcBalance();
        this.setlocalStorge();
    }


    updateAction(id, newAmount) {
        let indexUpdate = this.actions.findIndex(action => action.id == id);
        this.actions[indexUpdate].amount = newAmount;
        this.calcBalance();
        this.setlocalStorge();
    }


    setlocalStorge() {
        localStorage.setItem("actions", JSON.stringify(this.actions));
    }


    getlocalStorge() {
        let storedActions = localStorage.getItem("actions");
        return storedActions ? JSON.parse(storedActions) : [];
    }

    calcBalance() {
        this.totalIncome = 0;
        this.totalExpense = 0;

        for (let action of this.actions) {
            if (action.type === "income") {
                this.totalIncome += action.amount;
            } else if (action.type === "expense") {
                this.totalExpense -= action.amount;
            }
        }
        this.balance = this.totalIncome - this.totalExpense;

        return this.balance;
    }
}

export default ActionManager;
