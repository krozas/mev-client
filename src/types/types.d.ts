//----- Server Common Types
interface ListResult<T> {
  totalElements: number;
  elements: Array<T>;
}

interface FueroDTO {
  id: number;
  codigo: string;
  descripcion: string;
  idFuero?: number;
}

interface CiudadDTO {
  id: number;
  codigo: string;
  descripcion: string;
  idFuero: number;
}

interface InputCiudad {
  id?: number;
  codigo: string;
  descripcion: string;
}

interface InputFuero {
  id?: number;
  codigo: string;
  descripcion: string;
}

interface TipoVinculoDTO {
  id: number;
  codigo: string;
  descripcion: string;
}