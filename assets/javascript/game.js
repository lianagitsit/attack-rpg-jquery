$(document).ready(function(){
    console.log("ready!");
    var charSelection;
    var isGameOn = false;

    function someFunction(event){
        console.log(event.currentTarget.id);
        if (!isGameOn){
            isGameOn = true;
            charSelection = $(event.currentTarget).detach();
            $(".user-character").append(charSelected);
                
        }
    }

    $(".character").on("click", someFunction);
})