export class Bien {
  constructor(
    public id: string,
    public nom: string,
    public description: string,
    public type_bien: string,
    public ville: string,
    public pieces: number,
    public caracteristiques: string,
    public proprietaire: string,
  ) { }
}
