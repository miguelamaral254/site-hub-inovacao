export interface Book {
    id?: number;
    enabled?: boolean;
    createdDate?: string;
    lastModifiedDate?: string;
    urlImage?: string;
    title?: string;
    description?: string;
    userId?: number;
    gender?: Gender;
    available?: boolean;
  }
  
  export enum Gender {
    FICCAO_CIENTIFICA = "FICCAO_CIENTIFICA",
    ROMANCE = "ROMANCE",
    MISTERIO_SUSPENSE = "MISTERIO_SUSPENSE",
    FANTASIA = "FANTASIA",
    TERROR = "TERROR",
    AVENTURA = "AVENTURA",
    TECNOLOGIA_INOVACAO = "TECNOLOGIA_INOVACAO",
    DESENVOLVIMENTO_SOFTWARE = "DESENVOLVIMENTO_SOFTWARE",
    SEGURANCA_INFORMACAO = "SEGURANCA_INFORMACAO",
    EMPREENDEDORISMO_TECNOLOGIA = "EMPREENDEDORISMO_TECNOLOGIA"
  }