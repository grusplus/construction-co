(function (Game) {

    let p = {
        budget: 500000,
        cash: 500000,
        days: 30,
        currentDay: 0,
        currentWorkerType: 'pro',
        currentWorkerAmount: 0,
        progress: {
            percentage: 0,
            materials: {
                brick: 0,
                wood: 0
            }
        },
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
                brick: 0.89,
                wood: 0.89
            }
        },
        workers: {
            pro:{
                max: 10,
                cost: 10,
                speed: {
                    brick: 10,
                    wood: 20
                }
            },
            cheap:{
                max: 5,
                cost: 5,
                speed: {
                    brick: 8,
                    wood: 18
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

    builder.doTransaction = function(material, amount, price){
        p.transactions.push({material: material, amount: amount, price: price, day: Game.Builder.getCurrentDay()});
        p.materials.inventory[material] = p.materials.inventory[material] + Number(amount);
        // console.debug(amount * price);
        // console.debug(Math.round(amount * price * 100));
        // console.debug(Math.round(amount * price * 100)/100)
        p.cash = Math.round( (p.cash - (amount * price)) * 100) / 100;
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
        for($i = 0; $i < 26; $i++){
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
        console.log("\nIt's week " + p.currentDay);
        builder.showStatus();
        builder.buy();
        builder.hireWorkers();
        builder.build();

        return true;
    };

    builder.build = function() {
        p.progress.materials.forEach(function(progressAmount, material){
            let materialsLeft = p.materials.inventory[material];
            let used = p.workers[p.currentWorkerType].speed[material];
            let materialsUsed = Math.min(materialsLeft, used * p.currentWorkerAmount);
            p.materials.inventory[material] -= materialsUsed;
            p.progress.materials[material] += materialsUsed;
        });

        builder.updateProgress();
    };

    builder.updateProgress = function() {
        let count = Object.keys(p.progress.materials).length;
        p.progress.materials.forEach(function(progressAmount, material){
            let materialPercentage = progressAmount / p.materials.needs[material];
            p.progress.percentage += (materialPercentage * 1/count);
        });
    };

    builder.hireWorkers = function() {
        let workers = ['Professionals', 'Labourers'];
        let workerKeys = ['pro', 'cheap'];
        let workerTypeIndex = readline.keyInSelect(workers, 'Which type of workers would you like today?');
        p.currentWorkerType = workerKeys[workerTypeIndex];
        let number = builder.askQuestion("How many " + workers[workerTypeIndex] + " do you want to hire?");
        p.currentWorkerAmount = number;

        let cost = Math.round( ((number * p.workers[p.currentWorkerType].cost)) * 100) / 100;
        console.log(p.cash);
        p.cash = p.cash - cost;
        console.log("Today's worker cost: $" + cost);
        console.log(p.cash);
    };

    builder.showStatus = function(){
        console.log("\nBUDGET");
        console.log("$" + p.cash + " of $" + p.budget);
        console.log("\nPROGRESS");
        console.log("" + Math.round(p.progress.percentage * 100) + "%");
        console.log("Brick: " + p.progress.materials.brick + " of " + p.materials.needs.brick);
        console.log("Wood: " + p.progress.materials.wood + " of " + p.materials.needs.wood);
        console.log("\nINVENTORY");
        console.log("Brick: " + p.materials.inventory.brick);
        console.log("Wood: " + p.materials.inventory.wood);
    };

    builder.buy = function(){
        console.log("\nMARKETPLACE");

        p.materials.needs.forEach(function(needsAmount, material){
            // console.debug(material);
            let price = builder.getThisWeeksPrice(material);
            let amount = builder.askQuestion(price.prefix + "How many " + material + " would you like for $" + price.price + "? ");
            if(amount > 0){
                builder.doTransaction(material, amount, price);
            }
        });
    };

    builder.getThisWeeksPrice = function(material){
        let price = p.materials.costs[material];
        let multiplier = (Math.random() * (1.3 - 0.7) + 0.7).toFixed(4);

        let result = (price * multiplier).toFixed(2);
        return {
            price: result,
            prefix: result < price ? "SALE! " : ""
        };
    };

    builder.askQuestion = function(question){
        return readline.question(question);
    };

    Game.Builder = builder;

})(Game);
