
$(function () { 


  var Area_PD1 = new Swiper('.Area_PD1', {
    
    //★5.2.1★小圓點-白點swiper-pagination-white, 黑點swiper-pagination-black
    pagination: {
      el: '.swiper-pagination',
      clickable: true, //觸擊切換
    },
    //左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black
    nextButton: '.swiper-button-next', 
    prevButton: '.swiper-button-prev',
    autoplay: {
      delay: 2500,
      disableOnInteraction: false, //觸擊後不再自動輪播
    },    
    
  });	



})
