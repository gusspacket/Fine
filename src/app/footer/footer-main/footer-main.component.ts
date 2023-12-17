import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/servise/settings.service';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrls: ['./footer-main.component.css']
})
export class FooterMainComponent implements OnInit {

settings: Settings;


constructor(private settingsService: SettingsService) {

}

  ngOnInit() {


    this.settingsService.getAllSettings().subscribe(settings => {
      this.settings = settings
    })
  }



}
