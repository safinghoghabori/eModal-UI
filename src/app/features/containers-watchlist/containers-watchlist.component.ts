import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddContainerComponent } from '../add-container/add-container.component';

@Component({
  selector: 'app-containers-watchlist',
  standalone: true,
  imports: [CommonModule, AddContainerComponent],
  templateUrl: './containers-watchlist.component.html',
  styleUrl: './containers-watchlist.component.css',
})
export class ContainersWatchlistComponent {
  containers: any[] = []; // Array to hold containers
  showModal: boolean = false; // Track modal visibility
  selectedContainer: any = null; // Track container being added

  openAddContainerDialog() {
    this.showModal = true; // Show the modal
  }

  closeAddContainerDialog() {
    this.showModal = false; // Hide the modal
  }

  handleContainerAdded(container: any) {
    if (container) {
      this.containers.push(container); // Add container to table
    }
    this.closeAddContainerDialog();
  }
}
