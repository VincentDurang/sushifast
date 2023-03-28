import { IBoxs } from "./iBoxes";

export class Box implements IBoxs {

   constructor(
       public id: number,
       public nom: string,
       public pieces: number,
       public prix: number,
       public image: string,
       public aliments: {
         nom: string,
         quantite: number
       }[],
       public saveurs: string[]){

       }
    }
