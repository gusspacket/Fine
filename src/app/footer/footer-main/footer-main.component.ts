import { Component, Input, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/settings.model';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrls: ['./footer-main.component.css']
})
export class FooterMainComponent  {

@Input()
settings: Settings;




}






