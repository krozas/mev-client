interface PersonaDTO {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;
  usuario: string;
  password: string;
  rol: string;
  createdAt: string;
  updatedAt: string;
}

interface FiltrosPersona {
  nombres?: string;
  apellidos?: string;
  cuit?: string;
}

interface InputPersona  {
  id?: number;
  nombres: string;
  apellidos: string;
  nroDoc?: string;
  email?: string;
  telefono?: string;
  direccion: string;
  fechaNacimiento?: string; 
  porcentajeTitularidad?: number;
  cuit?: string; 
  idExpediente?: number;
  idPersona?: number;
}