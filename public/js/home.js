
const main=document.querySelector(".main");
fetch(genres_list_http+new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=> {
    data.genres.forEach(item => {
        fetchMovieSListByGenres(item.id,item.name);
    })
});

const fetchMovieSListByGenres=(id,genres) => {
    fetch(movie_genres_http+ new URLSearchParams({
        api_key:api_key,
        with_genres:id,
        page:Math.floor(Math.random()*3)+1
    }))
    .then(res=>res.json())
    .then(data=> {
        makeCategoryElement(`${genres}_movies`,data.results);
        
    })
    .catch(err => console.log(err));
}

const makeCategoryElement=(category,data) => {
    main.innerHTML+=`
    <div class="movie-list">

            <button class="pre-btn"><img src="img/pre.png" alt=""></button>
            <h1 class="movie-category">${category.split("_").join(" ")}</h1>
            <div class="movie-container" id="${category}">
               
            </div>
            <button class="nxt-btn"><img src="img/nxt.png" alt=""></button>
        </div>
    `;
    makeCards(category,data);
}

const makeCards=(id,data) => {
    const movieContainer=document.getElementById(id);
    data.forEach((item,i)=>{
        if(item.backdrop_path==null){
            item.backdrop_path=item.poster_path;
            if(item.backdrop_path==null){
                return;
            }
        }
        // console.log(item.id);
        movieContainer.innerHTML+=`
        <div class="movie" onclick="location.href='/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
       </div>
        `;

        if(i==data.length-1){
            setTimeout(()=>{
                setupScrolling();
            },100);
        }
    })
}

// ***************fetching serached movie********************

const submitBtn=document.getElementById('submitBtn');
const userInput=document.getElementById('userName');

var username,movie;
const getInfo=async(event)=>{
    let userVal=userInput.value;
    if(userVal===""){
        alert("write something to search");
    }else{
        try{
            fetch(search_movie_http+new URLSearchParams({
                        api_key:api_key,
                        query:userVal
                    }))
                    .then(res=>res.json())
                    .then(data=> {
                        movie=data.results[0];
                        location.href=`${movie.id}`
                    });
        }catch{
            alert("oops!! not find");
        }
    }
}
submitBtn.addEventListener('click',getInfo);


// *******************fetching trending movie***************************

fetch(trending_movie_http+new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=> {
    console.log(data.results[2]);
});
