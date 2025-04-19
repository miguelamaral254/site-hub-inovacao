import {
    RiMailLine,
    RiMailFill,
    RiFolderUploadLine,
    RiFolderUploadFill,
  } from "react-icons/ri";
  
  type MenuItem = {
    roles: string[];
    label: string;
    icon?: React.ReactNode;
    hoverIcon?: React.ReactNode;
    page: string;
  };
  
  export const menuItems: MenuItem[] = [
    {
      roles: ["PROFESSOR", "STUDENT"],
      label: "Caixa de Entrada",
      icon: <RiMailLine className="text-xl block group-hover:hidden" />,
      hoverIcon: <RiMailFill className="text-xl hidden group-hover:block text-blue-900" />,
      page: "page1",
    },
    {
      roles: ["PROFESSOR", "STUDENT"],
      label: "Submeter Projeto",
      icon: <RiFolderUploadLine className="text-xl block group-hover:hidden" />,
      hoverIcon: <RiFolderUploadFill className="text-xl hidden group-hover:block text-blue-900" />,
      page: "page2",
    },
    {
      roles: ["MANAGER"],
      label: "Meus tickets atribuidos",
      page: "page3",
    },
    {
      roles: ["MANAGER"],
      label: "Gerenciar tickets",
      page: "page4",
    },
    {
      roles: ["MANAGER"],
      label: "Gerenciar Editais",
      page: "page5",
    },
    {
      roles: ["ENTERPRISE"],
      label: "Gerenciar Oportunidades",
      page: "page6",
    },
    {
      roles: ["ENTERPRISE"],
      label: "Submeter Oportunidades",
      page: "page7",
    },
  ];
  