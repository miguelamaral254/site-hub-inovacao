import React from 'react';
interface ProjetoCardProps {
    title: string;
    description: string;
    professor: string;
    status: string;
  }
  
  const ProjetoCard: React.FC<ProjetoCardProps> = ({ title, description, professor, status }) => {
    return (
      <div className="p-4 border border-gray-200 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-500">Orientador: {professor}</p>
        <p className={`text-sm font-semibold ${status === 'Aprovado' ? 'text-green-500' : 'text-red-500'}`}>Status: {status}</p>
      </div>
    );
  };
interface Projeto {
  id: number;
  title: string;
  description: string;
  professor: string;
  status: string;
}

const ProjetosAcademicos: React.FC = () => {
  const projetos: Projeto[] = [
    {
      id: 1,
      title: 'Pesquisa sobre Inteligência Artificial',
      description: 'Estudo sobre as aplicações de IA na educação.',
      professor: 'Dr. João Silva',
      status: 'Aprovado',
    },
    {
      id: 2,
      title: 'Desenvolvimento de um Aplicativo Móvel',
      description: 'Projeto de criação de um app para saúde.',
      professor: 'Profa. Maria Oliveira',
      status: 'Em Andamento',
    },
    {
      id: 3,
      title: 'Análise de Dados em Tempo Real',
      description: 'Pesquisa sobre big data e análise de dados em tempo real.',
      professor: 'Dr. Pedro Lima',
      status: 'Aprovado',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Projetos Acadêmicos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetos.map((projeto) => (
          <ProjetoCard
            key={projeto.id}
            title={projeto.title}
            description={projeto.description}
            professor={projeto.professor}
            status={projeto.status}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjetosAcademicos;