import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {
  private baseUrl = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory';
  constructor(private http:HttpClient) { }

  getInventoryData(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }

}
