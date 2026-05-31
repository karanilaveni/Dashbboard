import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecordItem } from '../models/record-item.model';
import { StatusCardComponent } from '../status-card/status-card.component';
import { RECORDS } from '../data/records.data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  searchText = '';
  selectedStatus = 'All';

  sortColumn: keyof RecordItem = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';
  records: RecordItem[] = RECORDS;

  get activeCount(): number {
    return this.records.filter((record) => record.status === 'Active').length;
  }

  get inactiveCount(): number {
    return this.records.filter((record) => record.status === 'Inactive').length;
  }

  get pendingCount(): number {
    return this.records.filter((record) => record.status === 'Pending').length;
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
  }

  get filteredRecords(): RecordItem[] {
    let data = this.records.filter((record) => {
      const matchesSearch =
        record.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        record.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        record.role.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'All' || record.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });

    return data.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  sortBy(column: keyof RecordItem): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(column: keyof RecordItem): string {
    if (this.sortColumn !== column) {
      return '';
    }

    return this.sortDirection === 'asc' ? '▲' : '▼';
  }
}
