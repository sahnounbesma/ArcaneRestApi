export class User {
  constructor(
    public id: string,
    public pseudo: string,
    public password: string,
    public nom: string,
    public prenom: string,
    public date_naissance: string,
    public biens: string,
  ) { }
}