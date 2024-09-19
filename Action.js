class Action{
    constructor(type, description, amount){
        this.type = type;
        this.description = description;
        this.amount = type == "income" ? amount : -amount;
        this.id = Math.floor(Math.random() * 1001);
    } 
}

export default Action;