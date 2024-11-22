import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'add-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-container.component.html',
  styleUrl: './add-container.component.css',
})
export class AddContainerComponent {
  @Output() containerAdded = new EventEmitter<any>();

  containerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.containerForm = this.fb.group({
      containerNo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]{4}[0-9]{7}$/), // 4 letters followed by 7 digits
        ],
      ],
    });
  }

  addContainer() {
    console.log('add container called...');
  }

  close() {
    this.containerAdded.emit(null); // Notify parent to close modal
  }
}
