window.addEventListener('scroll',(e)=>{
  const nav = document.querySelector('.navbar');
  if(window.pageYOffset>0){
    nav.classList.add("scroll");
  }else{
    nav.classList.remove("scroll");
  }
});
