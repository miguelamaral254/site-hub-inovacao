import Swal from "sweetalert2";
import { useCallback } from "react";

const useSwal = () => {
  
  const showSuccess = useCallback((title: string, text?: string) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text || "Operação realizada com sucesso!",
      confirmButtonText: "OK",
      
    });
    
  }, []);

  const showError = useCallback((title: string, text?: string) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text || "Ocorreu um erro. Tente novamente.",
      confirmButtonText: "OK",
    });
  }, []);

  const showWarning = useCallback((title: string, text?: string) => {
    Swal.fire({
      icon: "warning",
      title: title,
      text: text || "Atenção!",
      confirmButtonText: "OK",
    });
  }, []);

  const showConfirmation = useCallback(
    async (title: string, text?: string) => {
      const result = await Swal.fire({
        icon: "question",
        title: title,
        text: text || "Tem certeza?",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
      });

      return result.isConfirmed;
    },
    []
  );

  const showInfo = useCallback((title: string, text?: string) => {
    Swal.fire({
      icon: "info",
      title: title,
      text: text || "",
      confirmButtonText: "OK",
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });
  }, []);

  const showCustom = useCallback(
    (icon: "success" | "error" | "warning" | "info", title: string, text?: string) => {
      Swal.fire({
        icon,
        title: title,
        text: text || "",
        confirmButtonText: "OK",
      });
    },
    []
  );

  return {
    showSuccess,
    showError,
    showWarning,
    showConfirmation,
    showInfo,
    showCustom,
  };
};

export default useSwal;