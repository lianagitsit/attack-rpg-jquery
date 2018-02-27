$(document).ready(function () {

    console.log("ready!");
    var isGameOn = false;
    var inBattle = false;
    var charSelection, detachedCharDiv, remainingCharacters, enemies, defenderSelection, detachedDefDiv;

    function Character(name, health, attack, counterAttack) {
        this.name = name;
        this.healthPoints = health;
        this.attackPower = attack;
        this.counterAttackPower = counterAttack;

        var baseAttackPower = this.attackPower;
        var wonBattle = null;

        this.create = function create() {
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

        this.attack = function attack() {
            console.log(this.name + " attacks and deals " + this.attackPower + " damage!");

            // opponent's HP reduced by player's attack power
            switch (defenderSelection) {
                case "baby":
                    baby.healthPoints -= this.attackPower;
                    if (baby.healthPoints <= 0) {
                        wonBattle = true;
                        $("#baby").detach();
                        this.displayWinOrLose("baby");
                    } else {
                        $("#baby").children("span.health-points").text(baby.healthPoints);
                    }
                    break;
                case "bunny":
                    bunny.healthPoints -= this.attackPower;
                    if (bunny.healthPoints <= 0) {
                        wonBattle = true;
                        $("#bunny").detach();
                        this.displayWinOrLose("bunny");
                    } else {
                        $("#bunny").children("span.health-points").text(bunny.healthPoints);
                    }
                    break;
                case "puppy":
                    puppy.healthPoints -= this.attackPower;
                    if (puppy.healthPoints <= 0) {
                        wonBattle = true;
                        $("#puppy").detach();
                        this.displayWinOrLose("puppy");
                    } else {
                        $("#puppy").children("span.health-points").text(puppy.healthPoints);
                    }
                    break;
                case "sloth":
                    sloth.healthPoints -= this.attackPower;
                    if (sloth.healthPoints <= 0) {
                        wonBattle = true;
                        $("#sloth").detach();
                        this.displayWinOrLose("sloth");
                    } else {
                        $("#sloth").children("span.health-points").text(sloth.healthPoints);
                    }
                    break;
            }

            this.attackPower += baseAttackPower;

        };

        this.counterAttack = function () {
            console.log(this.name + " counter-attacks and deals " + this.counterAttackPower + " damage!");

            // player's HP reduced by opponent's counter-attack power
            switch (charSelection) {
                case "baby":
                    baby.healthPoints -= this.counterAttackPower;
                    if (baby.healthPoints <= 0) {
                        wonBattle = false;
                        this.displayWinOrLose(this.name);
                    } else {
                        $("#baby").children("span.health-points").text(baby.healthPoints);
                    }
                    break;
                case "bunny":
                    bunny.healthPoints -= this.counterAttackPower;
                    if (bunny.healthPoints <= 0) {
                        wonBattle = false;
                        this.displayWinOrLose(this.name);
                    } else {
                        $("#bunny").children("span.health-points").text(bunny.healthPoints);
                    }
                    break;
                case "puppy":
                    puppy.healthPoints -= this.counterAttackPower;
                    if (puppy.healthPoints <= 0) {
                        wonBattle = false;
                        this.displayWinOrLose(this.name);
                    } else {
                        $("#puppy").children("span.health-points").text(puppy.healthPoints);
                    }
                    break;
                case "sloth":
                    sloth.healthPoints -= this.counterAttackPower;
                    if (sloth.healthPoints <= 0) {
                        wonBattle = false;
                        this.displayWinOrLose(this.name);
                    } else {
                        $("#sloth").children("span.health-points").text(sloth.healthPoints);
                    }
                    break;
            }

        }

        // Rethink this - probably shouldn't create a new div/button every time...
        this.displayWinOrLose = function displayWinOrLose(defender) {
            var message = $("<div>");
            if (wonBattle) {
                $(message).text("You defeated " + defender + "! You can choose to fight another enemy.")
            } else {
                $(message).text("You were defeated by " + defender + "!");
                var restart = $("<button>");
                $(restart).text("Restart");
                $(message).append(restart);
            }
            $(".defender").append(message);
        }

        this.create();
    }

    var baby = new Character("baby", 100, 6, 5);
    var bunny = new Character("bunny", 120, 8, 7);
    var puppy = new Character("puppy", 140, 10, 9);
    var sloth = new Character("sloth", 500, 12, 11);

    function startGame(event) {
        // console.log(event.currentTarget.id);
        var target = event.currentTarget;

        // Select character and define enemies at beginning of game
        if (!isGameOn) {
            isGameOn = true;
            charSelection = event.currentTarget.id;
            detachedCharDiv = $(target).detach();
            $(".user-character").append(detachedCharDiv);

            remainingCharacters = $(".char-selection-area").children();
            enemies = $(remainingCharacters).detach();
            $(".enemies").append(enemies);
        } else {
            // Select a defender from the available enemies
            if ($(target).parent(".enemies").length && !inBattle) {
                console.log("clicked an enemy");
                defenderSelection = event.currentTarget.id;
                detachedDefDiv = $(target).detach();
                $(".defender").append(detachedDefDiv);
                inBattle = true;
            }
        }
    }

    function assignAttack() {
        if (inBattle) {
            console.log("I am in battle!");
            switch (charSelection) {
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

            switch (defenderSelection) {
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