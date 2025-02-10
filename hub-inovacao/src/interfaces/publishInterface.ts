export interface PublishCreateDTO {
  title: string;
  description: string;
  acessLink: string;
  initialDate: string;
  finalDate: string;
  publishedDate: string;
}
  
  export interface PublishResponseDTO {
    id: number;
    title: string;
    description: string;
    acessLink: string;
    photoLink: string;
    initialDate: string;
    finalDate: string;
    publishedDate: string;
  }

  export interface UpdatePublishDetailsDTO {
     title: string,
     description: string,
     acessLink: string,
     photoLink:string,
     initialDate: string,
     finalDate : string
  }