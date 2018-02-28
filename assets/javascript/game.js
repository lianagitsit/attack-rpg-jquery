$(document).ready(function () {
    var player, defender, detachedDiv;
    var isGameOn = false;
    var isBattleOn = false;

    // Instantiate the game characters
    var baby = new Character("baby", "assets/images/baby.jpeg", 100, 6, 5);
    var bunny = new Character("bunny", "assets/images/bunny.jpeg", 120, 8, 7);
    var puppy = new Character("puppy", "assets/images/puppy.jpeg", 140, 10, 9);
    var sloth = new Character("sloth", "assets/images/sloth.jpeg", 500, 12, 99);

    // TODO: on refresh, get a new selection of characters to play
    function Character(name, imagePathStr, healthPoints, attackPower, counterAttackPower) {
        this.name = name;
        this.imagePathStr = imagePathStr;
        this.healthPoints = healthPoints;
        this.attackPower = attackPower;
        this.counterAttackPower = counterAttackPower;

        this.attack = function () {
            console.log(this.name + " attacks and does " + this.attackPower + " damage!");
        }

        // Build character element in DOM
        $("#char-selection-area").append("<div class='character' id=" + this.name + ">");
        $("#" + this.name).append("<span class='character-name'>" + this.name + "</span>");
        $("#" + this.name).append("<img class='character-img img-responsive center-block' src=" + this.imagePathStr + " />");
        $("#" + this.name).append("<span class='health-points>" + this.healthPoints + "</span>");

    }

    function startGame(event) {
        var target = event.currentTarget;

        // Player selects a character to start the game
        if (!isGameOn) {
            isGameOn = true;

            // Assign the player's character selection
            switch (target.id) {
                case "baby":
                    player = baby;
                    break;
                case "bunny":
                    player = bunny;
                    break;
                case "puppy":
                    player = puppy;
                    break;
                case "sloth":
                    player = sloth;
                    break;
            }

            // Move the player character to the Your Character area
            detachedDiv = $(target).detach();
            $("#user-character").append(detachedDiv);

            // Move remaining characters to the Available Enemies area
            detachedDiv = $("#char-selection-area").children().detach();
            $("#enemies").append(detachedDiv);

            player.attack();
        } else {
            // After a player selection is made, player selects a defender
            if (!isBattleOn) {
                isBattleOn = true;

                // Assign the defender selection
                switch (target.id) {
                    case "baby":
                        defender = baby;
                        break;
                    case "bunny":
                        defender = bunny;
                        break;
                    case "puppy":
                        defender = puppy;
                        break;
                    case "sloth":
                        defender = sloth;
                        break;
                }

                // Move the defender to the Defender Area
                detachedDiv = $(target).detach();
                $("#defender").append(detachedDiv);
            }
        }
    }

    // Player chooses a character
    $(".character").on("click", startGame);


    // console.log("ready!");
    // var isGameOn = false;
    // var inBattle = false;
    // var charSelection, detachedCharDiv, remainingCharacters, enemies, defenderSelection, detachedDefDiv, restartDetachedDiv, battleLoser;

    // // TODO: on refresh, get a new random selection of characters to play
    // function Character(name, health, attack, counterAttack) {
    //     this.name = name;
    //     this.healthPoints = health;
    //     this.attackPower = attack;
    //     this.counterAttackPower = counterAttack;

    //     var baseAttackPower = this.attackPower;
    //     var wonBattle = null;

    //     this.create = function create() {
    //         var charDiv = $("<div>");
    //         $(charDiv).addClass("character");
    //         $(charDiv).attr("id", this.name);

    //         var nameSpan = $("<span>");
    //         $(nameSpan).addClass("character-name");
    //         $(nameSpan).text(this.name);
    //         $(charDiv).append(nameSpan);

    //         var charImage = $("<img>");
    //         var src = "assets/images/" + this.name + ".jpeg";
    //         $(charImage).addClass("character-img img-responsive center-block");
    //         $(charImage).attr("src", src);
    //         $(charDiv).append(charImage);

    //         var hpSpan = $("<span>");
    //         $(hpSpan).addClass("health-points");
    //         $(hpSpan).text(this.healthPoints);
    //         $(charDiv).append(hpSpan);

    //         $(".char-selection-area").append(charDiv);
    //     };

    //     this.attack = function attack() {
    //         console.log(this.name + " attacks and deals " + this.attackPower + " damage!");

    //         // opponent's HP reduced by player's attack power
    //         switch (defenderSelection) {
    //             case "baby":
    //                 baby.healthPoints -= this.attackPower;
    //                 if (baby.healthPoints <= 0) {
    //                     wonBattle = true;
    //                     battleLoser = $("#baby").detach();
    //                     this.displayWinOrLose("baby");
    //                 } else {
    //                     $("#baby").children("span.health-points").text(baby.healthPoints);
    //                 }
    //                 break;
    //             case "bunny":
    //                 bunny.healthPoints -= this.attackPower;
    //                 if (bunny.healthPoints <= 0) {
    //                     wonBattle = true;
    //                     battleLoser = $("#bunny").detach();
    //                     this.displayWinOrLose("bunny");
    //                 } else {
    //                     $("#bunny").children("span.health-points").text(bunny.healthPoints);
    //                 }
    //                 break;
    //             case "puppy":
    //                 puppy.healthPoints -= this.attackPower;
    //                 if (puppy.healthPoints <= 0) {
    //                     wonBattle = true;
    //                     battleLoser = $("#puppy").detach();
    //                     this.displayWinOrLose("puppy");
    //                 } else {
    //                     $("#puppy").children("span.health-points").text(puppy.healthPoints);
    //                 }
    //                 break;
    //             case "sloth":
    //                 sloth.healthPoints -= this.attackPower;
    //                 if (sloth.healthPoints <= 0) {
    //                     wonBattle = true;
    //                     battleLoser = $("#sloth").detach();
    //                     this.displayWinOrLose("sloth");
    //                 } else {
    //                     $("#sloth").children("span.health-points").text(sloth.healthPoints);
    //                 }
    //                 break;
    //         }

    //         this.attackPower += baseAttackPower;

    //     };

    //     this.counterAttack = function () {
    //         console.log(this.name + " counter-attacks and deals " + this.counterAttackPower + " damage!");

    //         // player's HP reduced by opponent's counter-attack power
    //         switch (charSelection) {
    //             case "baby":
    //                 baby.healthPoints -= this.counterAttackPower;
    //                 if (baby.healthPoints <= 0) {
    //                     wonBattle = false;
    //                     this.displayWinOrLose(this.name);
    //                 } else {
    //                     $("#baby").children("span.health-points").text(baby.healthPoints);
    //                 }
    //                 break;
    //             case "bunny":
    //                 bunny.healthPoints -= this.counterAttackPower;
    //                 if (bunny.healthPoints <= 0) {
    //                     wonBattle = false;
    //                     this.displayWinOrLose(this.name);
    //                 } else {
    //                     $("#bunny").children("span.health-points").text(bunny.healthPoints);
    //                 }
    //                 break;
    //             case "puppy":
    //                 puppy.healthPoints -= this.counterAttackPower;
    //                 if (puppy.healthPoints <= 0) {
    //                     wonBattle = false;
    //                     this.displayWinOrLose(this.name);
    //                 } else {
    //                     $("#puppy").children("span.health-points").text(puppy.healthPoints);
    //                 }
    //                 break;
    //             case "sloth":
    //                 sloth.healthPoints -= this.counterAttackPower;
    //                 if (sloth.healthPoints <= 0) {
    //                     wonBattle = false;
    //                     this.displayWinOrLose(this.name);
    //                 } else {
    //                     $("#sloth").children("span.health-points").text(sloth.healthPoints);
    //                 }
    //                 break;
    //         }

    //     }

    //     this.displayWinOrLose = function displayWinOrLose(defender) {
    //         if (wonBattle) {
    //             $("#message").text("You defeated " + defender + "! You can choose to fight another enemy.")
    //         } else {
    //             $("#message").text("You were defeated by " + defender + "!");
    //         }
    //         //TODO: toggle display of message div after restart
    //         // $(".message-box").toggle();
    //     }

    //     this.create();
    // }

    // var baby = new Character("baby", 100, 6, 5);
    // var bunny = new Character("bunny", 120, 8, 7);
    // var puppy = new Character("puppy", 140, 10, 9);
    // var sloth = new Character("sloth", 500, 12, 99);

    // function startGame(event) {
    //     // console.log(event.currentTarget.id);
    //     var target = event.currentTarget;

    //     // Select character and define enemies at beginning of game
    //     if (!isGameOn) {
    //         isGameOn = true;
    //         charSelection = event.currentTarget.id;
    //         detachedCharDiv = $(target).detach();
    //         $(".user-character").append(detachedCharDiv);

    //         remainingCharacters = $(".char-selection-area").children();
    //         enemies = $(remainingCharacters).detach();
    //         $(".enemies").append(enemies);
    //     } else {
    //         // Select a defender from the available enemies
    //         if ($(target).parent(".enemies").length && !inBattle) {
    //             console.log("event:");
    //             console.log(event);
    //             defenderSelection = event.currentTarget.id;
    //             detachedDefDiv = $(target).detach();
    //             console.log("clicked an enemy: " + detachedDefDiv.html());
    //             // BUG: selects span, not whole div element, make defender not move back to char selection at restart
    //             $(".defender").append(detachedDefDiv);
    //             inBattle = true;
    //         }
    //     }
    // }

    // function assignAttack() {
    //     if (inBattle) {
    //         console.log("I am in battle!");
    //         switch (charSelection) {
    //             case "baby":
    //                 baby.attack();
    //                 break;
    //             case "bunny":
    //                 bunny.attack();
    //                 break;
    //             case "puppy":
    //                 puppy.attack();
    //                 break;
    //             case "sloth":
    //                 sloth.attack();
    //                 break;
    //         }

    //         switch (defenderSelection) {
    //             case "baby":
    //                 baby.counterAttack();
    //                 break;
    //             case "bunny":
    //                 bunny.counterAttack();
    //                 break;
    //             case "puppy":
    //                 puppy.counterAttack();
    //                 break;
    //             case "sloth":
    //                 sloth.counterAttack();
    //                 break;
    //         }
    //     }
    // }

    // function restart(){
    //     var charArray = ["baby", "bunny", "puppy", "sloth"];

    //     for (var i = 0; i < charArray.length; i++){
    //         var x = $("#" + charArray[i]).detach();
    //         $(".char-selection-area").append(x);
    //     }
    //     $(".char-selection-area").append(battleLoser);

    //     // console.log($(".char-selection-area"));
    // }

    // $(".character").on("click", startGame);
    // $("#attack-btn").on("click", assignAttack);
    // $("#restart-btn").on("click", restart);
})