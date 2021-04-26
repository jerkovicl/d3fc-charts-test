/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeasurement } from '../components/chart/measurement.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ChartsService extends ApiService<IMeasurement> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'chart';
  }

  toServerModel(entity: IMeasurement): any {
    return {
      ...entity,
      // createDate: entity.createDate.getTime(),
    };
  }

  fromServerModel(json: any): IMeasurement {
    return {
      ...json,
      // createDate: new Date(json.createDate),
    };
  }
}
