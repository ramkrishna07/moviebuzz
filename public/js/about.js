let movie_id=location.pathname;
// fetching movie details
fetch(`${movie_detail_http}${movie_id}?`+new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    console.log(data);
   setupMovieInfo(data);
})

const setupMovieInfo= (data) =>{
    const backdrop=document.querySelector('.movie-info');

    backdrop.innerHTML+=`
    <img src="${original_img_url}${data.backdrop_path}" alt="" class="background-img">
    <div class="movie-details">
      <h1 class="movie-name"></h1>
      <p class="genres"></p>
      <p class="des"></p>
      <p class="starring"><span>starring:</span></p>
    </div>
    `
    const movieName=document.querySelector('.movie-name');
    const genres=document.querySelector('.genres');
    const des=document.querySelector('.des');
    const title=document.querySelector('title');

    title.innerHTML=movieName.innerHTML=data.title;
    genres.innerHTML=`${data.release_date.split('-')[0]} | `;
    for(let i=0;i<data.genres.length;i++){
        genres.innerHTML+=data.genres[i].name+formatString(i,data.genres.length);
    }

    if(data.adult==true){
        genres.innerHTML+=' | +18';
    }

    if(data.backdrop_path==null){
        data.backdrop_path=data.poster_path;
    }
    des.innerHTML=data.overview.substring(0,200)+'...';
    backdrop.innerHTML+=`
    
    `
    // backdrop.style.backgroundImage=`url(${original_img_url}${data.backdrop_path})`;
}

const formatString=(currentIndex,maxIndex)=>{
    return (currentIndex==maxIndex-1)? '' : ',';
}

// *********************fetching cast information**********************

fetch(`${movie_detail_http}${movie_id}/credits?`+new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    const cast=document.querySelector('.starring');
    for(let i=0;i<5;i++){
        cast.innerHTML+=data.cast[i].name+formatString(i,5);
    }
})

// ********************fetching images******************

fetch(`${movie_detail_http}${movie_id}/images?`+ new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    console.log(data.backdrops);
    makeCards(data)
})
const makeCards=(data)=>{
    const imageContainer=document.querySelector(".movie-img-container");
    for(let i=0;i<40;i++){
        imageContainer.innerHTML+=`
        <div class="movie-img">
        <img src="${original_img_url}${data.backdrops[i].file_path}" alt="">
            </div>
        `;
    }
}



// ******************fetching video clips*********************

fetch(`${movie_detail_http}${movie_id}/videos?` + new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    let trailerContainer=document.querySelector('.trailer-container');
    // let maxClips=(data.results.length<4) ? 4 : data.results.length;
    for(let i=0;i<4;i++){
        trailerContainer.innerHTML+=`
        <iframe src="https://www.youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }
})

// *******************fetch recommendations*******************

fetch(`${movie_detail_http}${movie_id}/recommendations?` + new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    let container=document.querySelector('.recommendation-container');
    for(let i=0;i<16;i++){
        if(data.results[i].backdrop_path==null){
            i++;
        }
        container.innerHTML+=`
        <div class="movie" onclick="location.href='/${data.results[i].id}'">
           <img src="${img_url}${data.results[i].backdrop_path}" alt="">
           <p class="movie-title">${data.results[i].title}</p>
        </div>
        `;
    }
})

/* try some new */

fetch(`${trending_video_http}/day?`+new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    // console.log(data);
})

// ***************fetching serached movie********************

const FormContainer=document.querySelector(".form-container");
const submitBtn=document.getElementById('submitBtn');
const userInput=document.getElementById('userName');

var username,movie;
const getInfo=async(event)=>{
    let userVal=userInput.value;
    if(userVal===""){
        alert("please write");
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
            alert("error");
        }
    }
}
submitBtn.addEventListener('click',getInfo);
