import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  private players: any[] = []; // Replace 'any' with your actual player type

  createPlayer(player: any): any {
    // Replace 'any' with your actual player type
    this.players.push(player);
    return player;
  }

  getAllPlayers(): any[] {
    // Replace 'any' with your actual player type
    return this.players;
  }

  getPlayerById(id: number): any | undefined {
    // Replace 'any' with your actual player type
    return this.players.find((player) => player.id === id);
  }

  updatePlayer(id: number, updatedPlayer: Partial<any>): any | undefined {
    // Replace 'any' with your actual player type
    const playerIndex = this.players.findIndex((player) => player.id === id);
    if (playerIndex === -1) return undefined;

    this.players[playerIndex] = {
      ...this.players[playerIndex],
      ...updatedPlayer,
    };
    return this.players[playerIndex];
  }

  deletePlayer(id: number): boolean {
    const playerIndex = this.players.findIndex(
      (player) => Number(player.id) === id,
    );
    if (playerIndex === -1) return false;

    this.players.splice(playerIndex, 1);
    return true;
  }
}
