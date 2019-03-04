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
        builder.hireWorkers();
        builder.build();

        return true;
    };

    builder.build = function() {
        p.progress.materials.forEach(function(progressAmount, material){
            let materialsLeft = p.materials.inventory[material];
            let used = p.workers[p.currentWorkerType].speed;
            let materialsUsed = Math.min(materialsLeft, used * p.currentWorkerAmount);

            p.materials.inventory[material] -= materialsUsed;
            p.progress.materials[material] += materialsUsed;
        });

        builder.updateProgress();
    };

    builder.updateProgress = function() {
        let count = Object.keys(p.progress.materials).length;
        p.progress.materials.forEach(function(progressAmount, material){
            console.debug(progressAmount);
            console.debug(material);
            let materialPercentage = progressAmount / p.materials.needs[material];
            console.debug(materialPercentage);
            p.progress.percentage += (materialPercentage * 1/count);
            console.debug((materialPercentage * 1/count));
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
        p.cash = p.cash - cost;
        console.log("Today's worker cost: $" + cost);
    };

    builder.showStatus = function(){
        console.log("\nBUDGET");
        console.log("$" + p.cash + " of $" + p.budget);
        console.log("\nPROGRESS");
        console.log("" + p.progress.percentage + "%");
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
            let price = p.materials.costs[material].mid;
            let amount = builder.askQuestion("How many " + material + " would you like for $" + price  + "? ");
            if(amount > 0){
                builder.doTransaction(material, amount, price);
            }
        });
    };

    builder.askQuestion = function(question){
        return readline.question(question);
    };

    Game.Builder = builder;

})(Game);
