// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/netList');
                }
            });
        }

        //location.innerHTML = string3;
        //let title = document.title;
        //console.log(title);
        //hook_header(title);
        ///navigate(title);

    }
///////////////////////////////////////////////////
//the rest of the functions that the engine uses
//////////////////////////////////////////////////////

//sets up the header and what not
function hook_header(goto){
    let navLinks = document.getElementsByTagName("a");
    //console.log(navLinks);
   
    for(const link of navLinks){
        //console.log(link);
        if(link.id){
            link.addEventListener("click", (event)=>{
                event.preventDefault();
                let id = link.getAttribute("id");
                navigate(id);
            })
        }
    }        
}

    function navigate(goto){
        console.log(goto);
        switch(goto)
        {
            case "Home":
                //window.history.pushState("", "", "/");
//console.log("at the home switch");
                loadHome(goto);
                break;
            case "About":
                //window.history.pushState("", "", goto);
                window.location.assign("/About");
                loadHome(goto);
                break;
            case "Projects":
                //window.history.pushState("", "", "/");
                loadHome(goto);
                break;
            case "Services":
                //window.history.pushState("", "", "/");
                loadHome(goto);
                break;
            case "Contact":
                //window.history.pushState("", "", "/");
                loadHome(goto);
                break;
            //case "showNetwork":
                //window.history.pushState("", "", "/network");
                //loadHome(goto);
                //this should be a redirect
                //window.location.replace("http://localhost:3000/network");
               // break;
            default:
                break;
        }
    }
    function loadHome(goto)
    {
        let data = "/partials/" + goto + ".ejs";
        console.log(data);

        let XHR = new XMLHttpRequest();
        XHR.open("GET", data, true);
        XHR.send();
        XHR.addEventListener("readystatechange", function(){
            let html = document.getElementsByTagName("main")[0];
            html.innerHTML = XHR.responseText;
        });
    }

    window.addEventListener("load", Start);

})();