import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    console.log('OnInit :' + new Date());
  }

  ngOnDestroy(): void {
    console.log('OnDestroy :' + new Date());
  }
}
