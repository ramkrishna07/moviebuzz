const setupScrolling = () => {
    const container=[...document.querySelectorAll('.movie-container')];
    const nxtBtn=[...document.querySelectorAll('.nxt-btn')];
    const preBtn=[...document.querySelectorAll('.pre-btn')];

    container.forEach((item,i) => {
        let containerDimensions=item.getBoundingClientRect();
        let containerWidth=containerDimensions.width;

        nxtBtn[i].addEventListener('click',() => {
            item.scrollLeft+=containerWidth;
        })
        preBtn[i].addEventListener('click',() => {
            item.scrollLeft-=containerWidth;
        })


    })
}

var button = document.getElementById('nxt-btn');
button.onclick = function () {
    setTimeout(() => {
        var container = document.getElementById('container');
        let containerDimensions=container.getBoundingClientRect();
        let containerWidth=containerDimensions.width;
        container.scrollLeft+=containerWidth;
    }, 100);
};
var back = document.getElementById('pre-btn');
back.onclick = function () {
    setTimeout(() => {
        var container = document.getElementById('container');
        let containerDimensions=container.getBoundingClientRect();
        let containerWidth=containerDimensions.width;
        container.scrollLeft-=containerWidth;
    }, 100);
    
};


// var button = document.getElementById('nxt-btn');
// button.onclick = function () {
//     var container = document.getElementById('container');
//     sideScroll(container,'right',25,300,10);
// };

// var back = document.getElementById('pre-btn');
// back.onclick = function () {
//     var container = document.getElementById('container');
//     sideScroll(container,'left',25,300,10);
// };

// function sideScroll(element,direction,speed,distance,step){
//     scrollAmount = 0;
//     var slideTimer = setInterval(function(){
//         if(direction == 'left'){
//             element.scrollLeft -= step;
//         } else {
//             element.scrollLeft += step;
//         }
//         scrollAmount += step;
//         if(scrollAmount >= distance){
//             window.clearInterval(slideTimer);
//         }
//     }, speed);
// }
