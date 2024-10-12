import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../models/product.model';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, FormsModule, MatInputModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  product:Product;

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product) {
    // console.log(data);
    this.product = {...data};
  }
  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.position={bottom:'3rem'};
    this.dialogRef.updatePosition(matDialogConfig.position);

  }

  

  doAction(){
    this.dialogRef.close({event:'Edit',data:this.product});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  calculateValue(){
    const idx=(this.product.price?.charAt(0)=='$')?1:0;
    this.product.value="$"+(this.product.quantity*parseInt(this.product.price.substring(idx))).toString();
  }
}
