import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit{




  constructor() { }

  ngOnInit(): void {

  }

  

  phoneFormControl = new FormControl('+7', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(12)
  ]);

  orderPay() {
    alert('ЗАКАЗ ВЫПОЛЕН')
  }
}
