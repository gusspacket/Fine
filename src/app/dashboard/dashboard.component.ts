import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../servise/category.service';
import { Categories } from '../models/category.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor( ) {

  }
  ngOnInit(): void {

  }


}
