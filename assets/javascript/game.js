$(document).ready(function(){
    console.log("ready!");
    var isGameOn = false;
    var inBattle = false;
    var charSelection, remainingCharacters, enemies, defenderSelection;


    function someFunction(event){
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

    $(".character").on("click", someFunction);
    $("button").on("click", attack);
})