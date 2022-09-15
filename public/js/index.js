
var acc=document.getElementsByClassName("faq-btn");
var i;
for(i=0;i<acc.length;i++){
    acc[i].addEventListener("click",function(){
        this.classList.toggle("active");
        var panel=this.nextElementSibling;
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
        } else {
            panel.style.maxHeight=panel.scrollHeight + "px";
        }
    });
}

// const headingicon=document.querySelector(".heading_icon");
// headingicon.innerHTML+=`
      
// `;
// function watch(){
//     window.location.href('home.html');
// }