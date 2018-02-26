$(document).ready(function(){
    console.log("ready!");
    var isGameOn = false;
    var inBattle = false;
    var charSelection, remainingCharacters, enemies, defenderSelection;

    function Character(health, attack, counter){

        function create(name){
            var charDiv = $("<div>");
            $(charDiv).addClass("character");
            $(charDiv).attr("id", name);

            var nameSpan = $("<span>");
            $(nameSpan).addClass("character-name");
            $(nameSpan).text(name);
            $(charDiv).append(nameSpan);

            var charImage = $("<img>");
            var src = "assets/images/" + name + ".jpeg";
            $(charImage).addClass("character-img img-responsive center-block");
            $(charImage).attr("src", src);
            $(charDiv).append(charImage);

            var hpSpan = $("<span>");
            $(hpSpan).addClass("hit-points");
            $(hpSpan).text(this.healthPoints);
            $(charDiv).append(hpSpan);

            $(".char-selection-area").append(charDiv);
        }

        this.healthPoints = health;
        this.attackPower = attack;
        this.counterAttackPower = counter;
        this.create = create;
    }

    var baby = new Character(100, 6, 5);
    baby.create("baby");

    var bunny = new Character(120, 8, 7);
    bunny.create("bunny");

    var puppy = new Character(140, 10, 9);
    puppy.create("puppy");

    var sloth = new Character(200, 12, 11);
    sloth.create("sloth");

    function startGame(event){
        // console.log(event.currentTarget.id);
        var target = event.currentTarget;

        // Select character and define enemies at beginning of game
        if (!isGameOn){
            isGameOn = true;
            charSelection = $(target).detach();
            $(".user-character").append(charSelection);

            remainingCharacters = $(".char-selection-area").children();
            enemies = $(remainingCharacters).detach();
            $(".enemies").append(enemies);
        } else {
        // Select a defender from the available enemies
            if( $(target).parent(".enemies").length && !inBattle){
                console.log("clicked an enemy");
                defenderSelection = $(target).detach();
                $(".defender").append(defenderSelection);
                inBattle = true;
            }
        }
    }

    function attack(){
        if (inBattle){
            console.log("attack!");
        }
    }

    $(".character").on("click", startGame);
    $("button").on("click", attack);
})