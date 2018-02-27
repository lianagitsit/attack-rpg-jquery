$(document).ready(function(){
    console.log("ready!");
    var isGameOn = false;
    var inBattle = false;
    var charSelection, detachedCharDiv, remainingCharacters, enemies, defenderSelection, detachedDefDiv;

    function Character(name, health, attack, counterAttack){
        this.name = name;
        this.healthPoints = health;
        this.attackPower = attack;
        this.counterAttackPower = counterAttack;

        var baseAttackPower = this.attackPower;

        // can probably get this all done in the constructor rather than in a method?
        this.create = function create(){
            var charDiv = $("<div>");
            $(charDiv).addClass("character");
            $(charDiv).attr("id", this.name);

            var nameSpan = $("<span>");
            $(nameSpan).addClass("character-name");
            $(nameSpan).text(this.name);
            $(charDiv).append(nameSpan);

            var charImage = $("<img>");
            var src = "assets/images/" + this.name + ".jpeg";
            $(charImage).addClass("character-img img-responsive center-block");
            $(charImage).attr("src", src);
            $(charDiv).append(charImage);

            var hpSpan = $("<span>");
            $(hpSpan).addClass("health-points");
            $(hpSpan).text(this.healthPoints);
            $(charDiv).append(hpSpan);

            $(".char-selection-area").append(charDiv);
        };

        this.attack = function attack(){
            console.log(this.name + " attacks and deals " + this.attackPower + " damage!");
            // opponent's HP reduced by player's attack power
            switch(defenderSelection) {
                case "baby":
                    baby.healthPoints -= this.attackPower;
                    $("#baby").children("span.health-points").text(baby.healthPoints);
                    break;
                case "bunny":
                    bunny.healthPoints -= this.attackPower;
                    $("#bunny").children("span.health-points").text(bunny.healthPoints);
                    break;
                case "puppy":
                    puppy.healthPoints -= this.attackPower;
                    $("#puppy").children("span.health-points").text(puppy.healthPoints);
                    break;
                case "sloth":
                    sloth.healthPoints -= this.attackPower;
                    $("#sloth").children("span.health-points").text(sloth.healthPoints);
                    break;
            }
            // player's attack power increase
            this.attackPower += baseAttackPower;

        };

        this.counterAttack = function(){
            console.log(this.name + " counter-attacks and deals " + this.counterAttackPower + " damage!");
            // player's HP reduced by opponent's counter-attack power
            switch(charSelection) {
                case "baby":
                    baby.healthPoints -= this.counterAttackPower;
                    $("#baby").children("span.health-points").text(baby.healthPoints);
                    break;
                case "bunny":
                    bunny.healthPoints -= this.counterAttackPower;
                    $("#bunny").children("span.health-points").text(bunny.healthPoints);
                    break;
                case "puppy":
                    puppy.healthPoints -= this.counterAttackPower;
                    $("#puppy").children("span.health-points").text(puppy.healthPoints);
                    break;
                case "sloth":
                    sloth.healthPoints -= this.counterAttackPower;
                    $("#sloth").children("span.health-points").text(sloth.healthPoints);
                    break;
            }

        }

        this.create();
    }

    var baby = new Character("baby", 100, 6, 5);
    var bunny = new Character("bunny", 120, 8, 7);
    var puppy = new Character("puppy", 140, 10, 9);
    var sloth = new Character("sloth", 200, 12, 11);

    function startGame(event){
        // console.log(event.currentTarget.id);
        var target = event.currentTarget;

        // Select character and define enemies at beginning of game
        if (!isGameOn){
            isGameOn = true;
            charSelection = event.currentTarget.id;
            detachedCharDiv = $(target).detach();
            $(".user-character").append(detachedCharDiv);

            remainingCharacters = $(".char-selection-area").children();
            enemies = $(remainingCharacters).detach();
            $(".enemies").append(enemies);
        } else {
        // Select a defender from the available enemies
            if( $(target).parent(".enemies").length && !inBattle){
                console.log("clicked an enemy");
                defenderSelection = event.currentTarget.id;
                detachedDefDiv = $(target).detach();
                $(".defender").append(detachedDefDiv);
                inBattle = true;
            }
        }
    }

    function assignAttack(){
        if (inBattle){
            console.log("I am in battle!");
            switch(charSelection) {
                case "baby":
                    baby.attack();
                    break;
                case "bunny":
                    bunny.attack();
                    break;
                case "puppy":
                    puppy.attack();
                    break;
                case "sloth":
                    sloth.attack();
                    break;
            }

            switch(defenderSelection) {
                case "baby":
                    baby.counterAttack();
                    break;
                case "bunny":
                    bunny.counterAttack();
                    break;
                case "puppy":
                    puppy.counterAttack();
                    break;
                case "sloth":
                    sloth.counterAttack();
                    break;
            }
        }
    }

    $(".character").on("click", startGame);
    $("#attack-btn").on("click", assignAttack);
})