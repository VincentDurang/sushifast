export interface IBoxs {
    id: number;
    nom: string;
    pieces: number;
    prix: number;
    image: string;
    aliments: {
      nom: string;
      quantite: number;
    }[];
    saveurs: string[];
}