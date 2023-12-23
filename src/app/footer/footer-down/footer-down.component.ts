import { Component, Input, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/servise/settings.service';

@Component({
  selector: 'app-footer-down',
  templateUrl: './footer-down.component.html',
  styleUrls: ['./footer-down.component.css']
})
export class FooterDownComponent {

  @Input()
  settings: Settings;




}
