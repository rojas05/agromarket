import { Inject, Injectable, Renderer2 } from '@angular/core';
import { Ubicacion } from 'app/models/interfaceUser';
import { GooglemapsService } from './googlemaps.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor() {}

calcularRutaDistancia(puntoA: Ubicacion, puntoB: Ubicacion): Promise<{ distanciaKm: number; direcciones?: google.maps.DirectionsStep[] }> {
  
  return new Promise((resolve, reject) => {
    const directionsService = new google.maps.DirectionsService();

    const request: google.maps.DirectionsRequest = {
      origin: puntoA,
      destination: puntoB,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const distanciaEnKilometros = response.routes[0].legs[0].distance.value / 1000;

        resolve({ distanciaKm: distanciaEnKilometros});
      } else {
        reject(new Error(`Error al calcular la ruta: ${status}`));
      }
    });
  });

}


}
