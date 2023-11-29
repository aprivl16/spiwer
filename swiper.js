"use strict"

const swiper = document.querySelector(".swiper");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const images = document.getElementsByTagName("img")
const img = images[0];

let imgsPerSwiper = 3;

let swiperСf = 0;

let startLeftGapOfSwiper = null;
let startClickPos = null;

let allowDragging = false;

let swiperAlignValue = parseInt(getComputedStyle(swiper).width) / imgsPerSwiper;


swiper.style.left = 0;

nextBtn.addEventListener("click", function() {
    if (Math.abs(swiperСf) === (images.length - imgsPerSwiper)) {
        swiperСf =  1;
    }
    this.classList.add("click-right")
    this.style.pointerEvents = "none"
    this.addEventListener("animationend", function(){
        this.classList.remove("click-right")
        this.style.pointerEvents = ""
    })
    
    swiper.style.left = --swiperСf * swiperAlignValue + "px";
})


prevBtn.addEventListener("click", function() {
    if (Math.abs(swiperСf) === 0) {
        swiperСf = -(images.length - imgsPerSwiper) -1;
    }
    this.classList.add("click-left")
    this.style.pointerEvents = "none"
    this.addEventListener("animationend", function(){
        this.classList.remove("click-left")
        this.style.pointerEvents = ""
    })

    swiper.style.left =  ++swiperСf *  swiperAlignValue + "px";
})



swiper.addEventListener("mousedown", function(event){
    allowDragging = true;
    swiper.classList.add("dragable")
    startLeftGapOfSwiper = parseInt(swiper.style.left) || parseInt(getComputedStyle(swiper).left);
    startClickPos = event.pageX;
    
    
})

swiper.addEventListener("mousemove", function(event){
    if(!allowDragging) return;
    let mouseMoving = event.pageX;
    swiper.style.transition = "0s";
    swiper.style.left = startLeftGapOfSwiper - (startClickPos - mouseMoving) + "px";
    if(parseInt(swiper.style.left) > 0){
        swiper.style.left  = "0px"
    }
    if(Math.abs(parseInt(swiper.style.left)) > (swiper.scrollWidth - swiper.clientWidth)){
        swiper.style.left  = "-" + (swiper.scrollWidth - swiper.clientWidth) + "px";
    }
})

document.addEventListener("mouseup", function(){
    allowDragging = false;
    swiper.style.transition = "";



    let currentLeftSwiperPos = Math.abs(parseInt(swiper.style.left));
    let move = Math.abs(startLeftGapOfSwiper) - currentLeftSwiperPos;

    if(Math.abs(move) >= (img.clientWidth / 3) && move < 0){   
        swiper.style.left = "-" + Math.ceil(currentLeftSwiperPos / swiperAlignValue) * swiperAlignValue + "px"
        swiperСf = parseInt(swiper.style.left) / swiperAlignValue
    }
    else if(Math.abs(move) >= (img.clientWidth / 3) && move > 0){
        swiper.style.left = "-" + Math.floor(currentLeftSwiperPos / swiperAlignValue) * swiperAlignValue + "px"
        swiperСf = parseInt(swiper.style.left) / swiperAlignValue
        
    }
    else{
        swiper.style.left = "-" + Math.round(currentLeftSwiperPos / swiperAlignValue) * swiperAlignValue + "px"
        swiperСf = parseInt(swiper.style.left) / swiperAlignValue
        
    } 

    swiper.classList.remove("dragable")
})