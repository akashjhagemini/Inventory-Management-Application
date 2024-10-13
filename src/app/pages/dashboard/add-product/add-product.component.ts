import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../models/product.model';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, FormsModule, MatInputModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  product:Product;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>) {
    // console.log(data);
    this.product = {
      name:"",
      category:"",
      price:"$0",
      quantity:0,
      value:"$0"
    }
  }
  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.position={bottom:'3rem'};
    this.dialogRef.updatePosition(matDialogConfig.position);

  }

  

  doAction(){
    this.dialogRef.close({event:'Add',data:this.product});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  calculateValue(){
    const idx=(this.product.price?.charAt(0)=='$')?1:0;
    this.product.value="$"+(this.product.quantity??0*parseInt(this.product.price?.substring(idx)??"0"))?.toString();
  }
}
