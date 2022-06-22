import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MapMarkersService {
  url = 'https://raw.githubusercontent.com/do-community/angular-leaflet-example/master/src/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient, private popup: PopupService) {
  }

  static scaledRadius(val: number, maxVal: number): number {
    return 40 * (val / maxVal);
  }

  makeCapitalMarkers(map: L.map): void {
    this.http.get(this.url).subscribe((res: any) => {
      const maxPop = Math.max(...res.features.map(x => x.properties.population), 0);

      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon],{
          radius: MapMarkersService.scaledRadius(c.properties.population, maxPop)
        });

        circle.bindPopup(this.popup.makeCapitalPopup(c.properties));

        circle.addTo(map);
      }
    });
  }

}
