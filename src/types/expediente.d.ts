interface ExpedienteDTO {
  id: number;
  caratula: string;
  claveExpediente: string;
  codigoOrganismo?: string;
  idOrganismo: number;
  tipo: string;
  numero: number;
  anio: number;
  idCiudad: number;
}

interface FiltrosExpediente {
  codigoOrganismo?: string;
  idOrganismo?: number;
  tipo?: string;
  caratula?: string;
  numero?: number;
  anio?: number;
  idPersona?: number;
}

interface InputExpediente {
  caratula: string;
  idOrganismo: number;
  tipo: string;
  numero: number;
  anio: number;
  idCiudad: number;
  id: number;
}

interface PersonaExpedienteDTO {
  id: number;
  idPersona: number;
  idExpediente: number;
  idVinculo: number;
}