
//SELECT MOVIE NAME FROM FORM

const container = document.querySelector(".card-container");
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = form.querySelector('.form-control').value;
    //SEND HTTP REQUEST
    // console.log(movieName)
    const XML = new XMLHttpRequest();
    XML.open('GET', `http://omdbapi.com/?s=${movieName}&apikey=f9d0a962`);
    XML.send();
    XML.onload = () => {
        return new Promise((resolve, reject) => {


            const movie = JSON.parse(XML.response);
            const movies = movie.Search;
            // console.log(movie);
            if (movie.Response === 'False')
                reject(new Error("Whoops!!"))
            let template = ``;
            movies.forEach(element => {
                template += ` 
                <div class="card">
    
                <div class="img-card">
                    <img
                        src="${element.Poster}"
                        alt="No Poster Available"
                        srcset=""
                    />
                </div>
                
                <div class="card-body">
                    <div class="rating"></div>
                    <p>${element.Title}</p>

                </div>
                <div class="more-info">
                    
                </div> 
                </div>
                `
                container.innerHTML = template;
            });
            // console.log(movies);
            resolve(movies);


        }).then((movies) => {
            let XML1 = [];
            let ch = container.children;
            for (let i = 0; i < 10; i++) {
                XML1[i] = new XMLHttpRequest();
                XML1[i].open('GET', `http://omdbapi.com/?i=${movies[i].imdbID}&apikey=f9d0a962`);
                XML1[i].send();
                XML1[i].onload = () => {
                    // console.log(JSON.parse(XML1[i].response));
                    ch[i].querySelector('.rating').textContent = JSON.parse(XML1[i].response).imdbRating;
                }
            }
            // resolve(movies)
        }).catch(() => {
            alert(`SORRY!! Could not search`);
        })

    }

})



















 // XML.open('GET',`http://omdbapi.com/?i=${movies.Search[0].imdbID}&apikey=f9d0a962`)
        // XML.send();
        // XML.onload=()=>{
        //     console.log(JSON.parse(XML.response))
        //     console.log(XML.response.Title);
        //     // const rating=XML.response
        // }