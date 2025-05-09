export class CreateTeamDto {
  name: string;
  city: string;
  stadium: string;
  foundedYear: number;
  coach: string;
  shortName: string; // Added shortName property
  country: string;
  players?: any[]; // Add players property with an optional array type
}
