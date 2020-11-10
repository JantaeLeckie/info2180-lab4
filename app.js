window.onload = mystarter;
function mystarter(){
    let searchbtn = document.getElementById('btn');
    var mynote;
    searchbtn.addEventListener('click', async function(element) {
        element.preventDefault();
        var myform = document.getElementById("superhero").value;
        var msg = document.getElementsByClassName("message")[0];
        var heroname = document.getElementsByClassName("heroname")[0]; 
        var alias = document.getElementsByClassName("alias")[0]; 
        var biography = document.getElementsByClassName("biography")[0];  

        console.log(typeof(heroname));
        console.log(typeof(alias));
        console.log(typeof(biography));
        if (myform === ''){
            //do
            console.log("This is 1");
            fetch("superheroes.php")
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    return Promise.reject('something went wrong!')
                }
            })
            .then(data => {
                msg.innerHTML = data;
                heroname.innerHTML = '' ;
                alias.innerHTML = '';
                biography.innerHTML = '';
                //alert(`Superheroes List \n ${data}`);
            })
            .catch(error => console.log('There was an error: ' + error));
        }else{
            //do
            console.log("This is 2");
            
            fetch("superheroes.php", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(myform)
            })
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    return Promise.reject('something went wrong!')
                }
            })
            .then(data => {
                console.log(data);
                var hero = handleJSON(data);
                if (typeof(hero) === "string"){
                    console.log("This is string");
                    console.log(typeof(hero));
                    msg.innerHTML = data ;
                    heroname.innerHTML = '' ;
                    alias.innerHTML = '';
                biography.innerHTML = '';
                } else if (typeof(hero) === "object"){
                    console.log(typeof(hero));
                    console.log("This is object");
                    var hname = hero["name"];
                    var aname = "A.K.A  " + hero["alias"];
                    var bio = hero["biography"];
                    console.log(hname);
                    console.log(aname);
                    console.log(bio);
                    msg.innerHTML = '';
                    heroname.innerHTML = hname ;
                    alias.innerHTML = aname;
                    biography.innerHTML = bio;
                }
            });
        }     
    });
}



function handleJSON(data){
    try{
        var hero = JSON.parse(data);
        
    }catch(err){
        return data
    }
    return hero
}



