
import ProjectList from "./ProjectList";

const ProjectPage: React.FC = () => {
  const filters = {
    iduser: 1,
    status: "pendente",
    enabled: true
    
    
  };

  return (
    <div>
      <h1 className="text-3xl text-center mb-6">Lista de Projetos</h1>
      <ProjectList filters={filters} />
    </div>
  );
};

export default ProjectPage;