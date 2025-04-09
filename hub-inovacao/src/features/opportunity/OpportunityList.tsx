import React, { useEffect, useState } from 'react';
import OpportunityCard from './OpportunityCard';
import { Opportunity } from './opportunity.interface';
import { searchOpportunities } from './opportunity.service'; 

const OpportunityList: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true); 
      setError('');  

      try {
        const response = await searchOpportunities({}, 0, 10); 
        if (response.data && Array.isArray(response.data.content)) {
          setOpportunities(response.data.content);  
        } else {
          setError('Resposta da API não contém um array válido de oportunidades');
        }
      } catch (err) {
        setError('Erro ao buscar oportunidades');
        console.error(err);
      } finally {
        setLoading(false);  
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Oportunidades</h1>
      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(opportunities) && opportunities.length > 0 ? (
          opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))
        ) : (
          <p className="text-center">Nenhuma oportunidade encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default OpportunityList;