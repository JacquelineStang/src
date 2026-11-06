export interface LinhaResumo {
  codigo: string;
  nome: string;
  categoria?: string;
  tarifa?: string;
}

export async function buscarLinhas(): Promise<LinhaResumo[]> {
  return [
    {
      codigo: "203",
      nome: "Santa Cândida",
      categoria: "Expressa",
      tarifa: "R$ 6,00",
    },
    {
      codigo: "505",
      nome: "Boqueirão",
      categoria: "Expressa",
      tarifa: "R$ 6,00",
    },
    {
      codigo: "550",
      nome: "Pinheirinho",
      categoria: "Estrutural",
      tarifa: "R$ 6,00",
    },
    {
      codigo: "607",
      nome: "Colombo",
      categoria: "Metropolitana",
      tarifa: "R$ 5,50",
    },
    {
      codigo: "666",
      nome: "Interbairros",
      categoria: "Interbairros",
      tarifa: "R$ 6,00",
    },
  ];
}