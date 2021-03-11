import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config, config } from './config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private httpClient: HttpClient) {}

  static factory(appLoadService: ConfigService) {
    return () => appLoadService.loadExternalConfig();
  }

  // this method gets external configuration calling /config endpoint and merges into config object
  loadExternalConfig(): Promise<any> {
    console.log("loading external Config");

    const promise = this.httpClient
      .get('assets/config.json')
      .toPromise()
      .then((settings) => {
        Object.keys(settings || {}).forEach((k) => {
          config[k] = settings[k];
          console.log("config key: "+k);
        });
        return settings;
      })
      .catch((error) => {
        return 'ok, no external configuration';
      });

    return promise;
  }

  getValues(): Config {
    return config;
  }
}
