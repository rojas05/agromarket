import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  public productos = [
    {
      id: '1',
      name: 'platano',
      img: "https://static.libertyprim.com/files/familles/banane-large.jpg?1569271725"
    },
    {
      id: '2',
      name: 'maiz',
      img:"https://s1.eestatic.com/2020/01/10/ciencia/nutricion/maiz-cereales-nutricion_458715971_142137584_1706x960.jpg"
    },
    {
      id: '1',
      name: 'platano',
      img: "https://static.libertyprim.com/files/familles/banane-large.jpg?1569271725"
    },
    {
      id: '2',
      name: 'maiz',
      img:"https://s1.eestatic.com/2020/01/10/ciencia/nutricion/maiz-cereales-nutricion_458715971_142137584_1706x960.jpg"
    }
    
  ];

  constructor() { }

  ngOnInit() {
  }

}
