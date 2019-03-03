(function (Game) {

    let p = {
        budget: 500000,
        cash: 500000,
        days: 30,
        currentDay: 0,
        materials: {
            needs: {
                brick: 1000,
                wood: 2000,
            },
            inventory: {
                brick: 0,
                wood: 0,
            },
            costs: {
                brick: {
                    low: 0.50,
                    mid: 0.89,
                    hight: 1.50
                },
                wood: {
                    low: 1.50,
                    mid: 1.89,
                    hight: 2.50
                }
            }
        },
        transactions: [
            {
                material: 'brick',
                amount: 10,
                price: 0.56,
                day: 2
            }
        ]
    }, builder = {}, templates = {};

    // builder.calculateInventory = function(){
    //     p.materials.inventory.brick = 0;
    //     p.materials.inventory.wood = 0;

    //     p.transactions.forEach(function(transaction){
    //         p.materials.inventory[transaction.material] += transaction.amount;
    //     });
    // }

    builder.doTransaction = function(material, amount, price){
        p.transactions.push({material: material, amount: amount, price: price, day: Game.Builder.getCurrentDay()})
        p.materials.inventory[material] = p.materials.inventory[material] + Number(amount);
        // console.debug(amount * price);
        // console.debug(Math.round(amount * price * 100));
        // console.debug(Math.round(amount * price * 100)/100)
        p.cash = Math.round( (p.cash - (amount * price)) * 100) / 100
    };

    builder.getCurrentDay = function(){
        return p.days;
    };

    builder.goToNextDay = function(){
        p.currentDay += 1;
    };

    builder.init = function(){
        builder.play();
    };

    builder.play = function() {
        console.log("Let's build a house!\n");

        // let name = builder.askQuestion("What's your name?")
        for($i = 0; $i < 30; $i++){
            let day = builder.doDay();
            if(!day){
                console.log("Game over!");
                break;
            }
        }
    };

    builder.doDay = function() {
        builder.goToNextDay();
        if(p.currentDay == 4){
            console.log("Time's up!");
            return false;
        }
        console.log("\n-------------------------");
        console.log("\nIt's day " + p.currentDay);
        builder.showStatus();
        builder.buy();
        builder.showStatus();
        return true;
    }

    builder.showStatus = function(){
        console.log("\nBUDGET");
        console.log("$" + p.cash + " of $" + p.budget);
        console.log("\nINVENTORY");
        console.log("Brick: " + p.materials.inventory.brick);
        console.log("Wood: " + p.materials.inventory.wood);
    }

    builder.buy = function(){
        console.log("\nMARKETPLACE");

        p.materials.needs.forEach(function(needsAmount, material){
            // console.debug(material);
            let price = p.materials.costs[material].mid;
            let amount = builder.askQuestion("How many " + material + " would you like for $" + price  + "? ");
            if(amount > 0){
                builder.doTransaction(material, amount, price);
            }
        });
    }

    builder.askQuestion = function(question){
        return readline.question(question);
    };

    Game.Builder = builder;

})(Game);
