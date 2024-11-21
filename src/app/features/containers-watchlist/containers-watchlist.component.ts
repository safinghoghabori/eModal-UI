import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-containers-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './containers-watchlist.component.html',
  styleUrl: './containers-watchlist.component.css',
})
export class ContainersWatchlistComponent {
  containers = [];
}
