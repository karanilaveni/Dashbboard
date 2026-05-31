import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-card.component.html',
  styleUrl: './status-card.component.scss'
})
export class StatusCardComponent {
  @Input() activeCount = 0;
  @Input() inactiveCount = 0;
  @Input() pendingCount = 0;
  @Input() selectedStatus = 'All';

  @Output() statusSelected = new EventEmitter<string>();

  selectStatus(status: string): void {
    this.statusSelected.emit(status);
  }
}