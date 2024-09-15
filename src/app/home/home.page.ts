import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point'; // Impor Point

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private latitude: number | any;
  private longitude: number | any;

  constructor() {}

  public async ngOnInit() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    // Buat instance peta
    const map = new Map({
      basemap: "topo-vector"
    });

    const view = new MapView({
      container: "container",
      map: map,
      zoom: 14,
      center: [this.longitude, this.latitude] // Longitude, Latitude
    });

    // Gunakan class Point dari ArcGIS API
    const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });

    // Definisikan markerSymbol dengan bentuk seperti logo Google Maps
    const markerSymbol = {
      type: "simple-marker",
      path: "M8 0C3.58 0 0 3.58 0 8c0 4.42 8 15 8 15s8-10.58 8-15c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z", // SVG path data untuk logo lokasi
      color: [226, 119, 40], // Warna Oranye
      outline: {
        color: [255, 255, 255], // Warna Putih untuk outline
        width: 2
      },
      size: 24 // Ukuran marker
    };

    const pointGraphic = new Graphic({
      geometry: point,  // Menggunakan class Point sebagai geometri
      symbol: markerSymbol
    });

    // Tambahkan marker ke peta
    view.graphics.add(pointGraphic);
  }
}
