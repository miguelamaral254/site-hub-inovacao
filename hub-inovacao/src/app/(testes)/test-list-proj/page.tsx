import ProjectList from "./ProjectList";

const ProjectPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl text-center mb-6">Lista de Projetos</h1>
      {/* Exemplo de filtro por status */}
      <ProjectList filterKey="status" filterValue="pendente" />
    </div>
  );
};

export default ProjectPage;