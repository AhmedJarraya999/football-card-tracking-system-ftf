import { Injectable } from '@nestjs/common';

@Injectable()
export class SuspensionService {
  // Example in-memory storage for suspensions
  private suspensions: any[] = [];

  // Create a new suspension
  createSuspension(suspension: any): any {
    const newSuspension = { id: Date.now(), ...suspension };
    this.suspensions.push(newSuspension);
    return newSuspension;
  }

  // Get all suspensions
  getAllSuspensions(): any[] {
    return this.suspensions;
  }

  // Get a suspension by ID
  getSuspensionById(id: number): any | undefined {
    return this.suspensions.find((s) => s.id === id);
  }

  // Update a suspension by ID
  updateSuspension(id: number, update: any): any | undefined {
    const index = this.suspensions.findIndex((s) => s.id === id);
    if (index === -1) return undefined;
    this.suspensions[index] = { ...this.suspensions[index], ...update };
    return this.suspensions[index];
  }

  // Delete a suspension by ID
  deleteSuspension(id: number): boolean {
    const index = this.suspensions.findIndex((s) => s.id === id);
    if (index === -1) return false;
    this.suspensions.splice(index, 1);
    return true;
  }
}
