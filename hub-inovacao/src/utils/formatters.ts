export const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('pt-BR'); // Formato: dd/mm/aaaa
  };