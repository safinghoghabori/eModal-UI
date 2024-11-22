import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddContainerComponent } from '../add-container/add-container.component';
import { ContainerData } from '../add-container/models/add-container.model';

@Component({
  selector: 'app-containers-watchlist',
  standalone: true,
  imports: [CommonModule, AddContainerComponent],
  templateUrl: './containers-watchlist.component.html',
  styleUrl: './containers-watchlist.component.css',
})
export class ContainersWatchlistComponent {
  containers: ContainerData[] = []; // Array to hold containers
  showModal: boolean = false; // Track modal visibility
  selectedContainer: any = null; // Track container being added

  openAddContainerDialog() {
    this.showModal = true; // Show the modal
  }

  closeAddContainerDialog() {
    this.showModal = false; // Hide the modal
  }

  handleContainerAdded(container: ContainerData) {
    if (container) {
      this.containers.push(container); // Add container to table
    }
    this.closeAddContainerDialog();
  }
}
