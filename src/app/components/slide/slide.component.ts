import { Component, OnInit, } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit{
  constructor() {}
  value = document.getElementById('mySlider')



  ngOnInit(): void {
    new Swiper( this.value!, {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }




}
