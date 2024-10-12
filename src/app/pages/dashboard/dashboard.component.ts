import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product.model';
import { InventoryDataService } from '../../services/inventory-data.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from './edit-product/edit-product.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, MatTableModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  inventoryData!: MatTableDataSource<Product>;
  columnsToDisplay: string[];
  totalProduct!: number;
  totalStoreValue!: number;
  outOfStock!: number;
  totalCategories!: number;
  disabledProducts: Product[]
  isAdmin:boolean;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;


  constructor(private inventoryDataService: InventoryDataService, public dialog: MatDialog) {
    this.columnsToDisplay = ['name', 'category', 'price', 'quantity', 'value', 'action'];
    this.outOfStock = 0;
    this.totalStoreValue = 0;
    this.disabledProducts = [];
    this.isAdmin=true;
  }

  ngOnInit(): void {
    // debugger
    this.inventoryData = new MatTableDataSource<Product>();
    this.inventoryDataService.getInventoryData().subscribe((data) => {
      this.inventoryData = new MatTableDataSource<Product>(data);
      this.totalProduct = data.length;
      data.forEach(product => {
        const idx = (product.value[0] == "$" ? 1 : 0);
        this.totalStoreValue += parseInt(product.value.substring(idx));
        this.outOfStock += (product.quantity == 0 ? 1 : 0);
      })
      this.totalCategories = new Set(data.map(product => product.category)).size;
    })
  }

  disable(product: Product) {
    console.log("disabling:", product.name);
    const idx = this.inventoryData.data.indexOf(product);
    if (this.inventoryData.data[idx].disabled == null || this.inventoryData.data[idx].disabled == false) {
      this.inventoryData.data[idx].disabled = true;
      this.totalProduct--;
      const idx1 = (product.value[0] == "$" ? 1 : 0);
      this.totalStoreValue -= parseInt(product.value.substring(idx1));
      this.outOfStock -= (product.quantity == 0 ? 1 : 0);
    } else {
      this.inventoryData.data[idx].disabled = false;
      this.totalProduct++;
      const idx1 = (product.value[0] == "$" ? 1 : 0);
      this.totalStoreValue += parseInt(product.value.substring(idx1));
      this.outOfStock += (product.quantity == 0 ? 1 : 0);
    }
    this.totalCategories = new Set(this.inventoryData.data.filter(p => p.disabled == null || p.disabled == false).map(product => product.category)).size;
  }

  delete(product: Product) {
    console.log("deleting: ", product.name);
    const idx = this.inventoryData.data.indexOf(product);
    if (this.inventoryData.data[idx].disabled == null || this.inventoryData.data[idx].disabled == false) {
      this.totalProduct--;
      const idx1 = (product.value[0] == "$" ? 1 : 0);
      this.totalStoreValue -= parseInt(product.value.substring(idx1));
      this.outOfStock -= (product.quantity == 0 ? 1 : 0);
    }
    this.inventoryData.data.splice(idx, 1);
    console.log(this.inventoryData.data);
    this.totalCategories = new Set(this.inventoryData.data.filter(p => p.disabled == null || p.disabled == false).map(product => product.category)).size;
    this.table.renderRows();
  }

  openDialog(product: Product) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '500px',
      height: '350px',
      data: product
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.event=='Cancel'){
        return;
      }
      console.log("updating product", result.data);

      const idx = this.inventoryData.data.indexOf(product);
      console.log(idx);
      const idx1 = (product.value[0] == "$" ? 1 : 0);
      const idx2 = (result.data.value[0] == "$" ? 1 : 0);
      this.totalStoreValue += parseInt(result.data.value.substring(idx2))-parseInt(product.value.substring(idx1));
      this.outOfStock += (result.data.quantity == 0 ? 1 : 0)-(product.quantity == 0 ? 1 : 0);
      this.inventoryData.data[idx] = result.data;
      this.totalCategories = new Set(this.inventoryData.data.filter(p => p.disabled == null || p.disabled == false).map(product => product.category)).size;
      this.table.renderRows();
    });
  }

  toggleRole(isAdmin:boolean){
    this.isAdmin=isAdmin;
  }
}
