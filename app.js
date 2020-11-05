
var mystarter = function(){
    let searchbtn = document.getElementById('btn');

    searchbtn.addEventListener('click', function(element) {
        element.preventDefault();

        fetch("superheroes.php")
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    return Promise.reject('something went wrong!')
                }
            })
            .then(data => {
                
                alert(`Superheroes List \n ${data}`);
            })
            .catch(error => console.log('There was an error: ' + error));
    });
}

window.onload = mystarter;

