$(document).ready(function () {
    var player, defender, detachedDiv;
    var isGameOn = false;
    var isBattleOn = false;
    var gameOver = false;
    var defeatedEnemies = [];
    var counter = 0;
    var audioOn;

    // Instantiate game characters
    // TODO: Algorithm for balance?
    var baby = new Character("baby", "assets/images/baby.jpeg", 100, 6, 5);
    var bunny = new Character("bunny", "assets/images/bunny.jpeg", 120, 8, 7);
    var puppy = new Character("puppy", "assets/images/puppy.jpeg", 140, 10, 9);
    var sloth = new Character("sloth", "assets/images/sloth.jpeg", 300, 12, 11);

    // TODO: on refresh, get a new selection of characters to play
    function Character(name, imagePathStr, healthPoints, attackPower, counterAttackPower) {
        this.name = name;
        this.imagePathStr = imagePathStr;
        this.healthPoints = healthPoints;
        this.baseAttackPower = attackPower;
        this.attackPower = attackPower;
        this.counterAttackPower = counterAttackPower;

        // Build character element in DOM
        $("#char-selection-area").append("<div class='character' id=" + this.name + ">");
        $("#" + this.name).append("<span class='character-name'>" + this.name + "</span>");
        $("#" + this.name).append("<img class='character-img img-responsive center-block' src=" + this.imagePathStr + " />");
        $("#" + this.name).append("<span class='health-points'>" + this.healthPoints + "</span>");

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

        } else {
            // After a player selection is made, player selects a defender
            if (!isBattleOn) {

                if (gameOver) {
                    return;
                }

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

                // Reset the message display
                if ($("#message").text()) {
                    $("#message").text("");
                }


            }
        }
    }

    function attack() {
        if (gameOver) {
            return;
        }

        if (isBattleOn) {
            // Player attack
            defender.healthPoints -= player.attackPower;

            // Add base to attack power only after the first attack
            counter++;
            if (counter > 1) {
                player.attackPower += player.baseAttackPower;
            }

            // Handle battle defeat or game win
            if (defender.healthPoints <= 0) {
                detachedDiv = $("#defender > h3").siblings().detach();
                defeatedEnemies.push(detachedDiv);
                isBattleOn = false;

                if (defeatedEnemies.length === 3) {
                    gameOver = true;
                    $("#message").text("GAME OVER! YOU HAVE CRUSHED THEM ALL!");
                    $("#restart-btn").show();
                } else {
                    $("#message").text("You defeated " + defender.name + "! You can choose another enemy.");
                }
            
            // Defender counter-attack
            } else {
                player.healthPoints -= defender.counterAttackPower;

                if (player.healthPoints <= 0) {
                    isBattleOn = false;
                    gameOver = true;
                    $("#message").text("GAME OVER! You were defeated by " + defender.name + "!");
                    $("#restart-btn").show();
                } else {
                    $("#message").html("you attack " + defender.name + " for " + player.attackPower + " damage!<br>" + defender.name + " counter-attacks and does " + defender.counterAttackPower + " damage!");
                }

            }
        } else {
            $("#message").text("No enemy here.");
        }

        $("#" + defender.name).children("span.health-points").text(defender.healthPoints);
        $("#" + player.name).children("span.health-points").text(player.healthPoints);

        console.log("ATTACK #" + counter);
        console.log(player.name + " attacks and does " + player.attackPower + " damage!");
        console.log(defender.name + "'s HP is now " + defender.healthPoints);
        console.log("But " + defender.name + " counter-attacks and does " + defender.counterAttackPower + " damage!");
        console.log(player.name + "'s HP is now " + player.healthPoints);

    }

    function restart() {
        location.reload();
    }


    // var lullaby = document.getElementById("lullaby-audio");
    // // lullaby.play();

    // // MORTAL KOMBAT
    // var fightMusic = document.getElementById("fight-audio");
    // var fightSource = document.getElementById("fight-source");
    // fightSource.setAttribute("src", "assets/sounds/fight.mp3");
    // fightMusic.load();
    // fightMusic.play();


    $(".character").on("click", startGame);
    $("#attack-btn").on("click", attack);
    $("#restart-btn").on("click", restart);

    //178 - 409

})