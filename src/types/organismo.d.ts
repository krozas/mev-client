interface OrganismoDTO {
  id: number;
  codigo: string;
  caratula: string;
  idCiudad: number;
  idFuero: number;
  nombre: string;
}

interface FiltrosOrganismo {
  codigo?: string;
  caratula?: string;  
}   

interface InputOrganismo {
  id: number;
   codigo: string;
  caratula: string;
  idCiudad: number;
  idFuero: number;
  nombre: string;
}