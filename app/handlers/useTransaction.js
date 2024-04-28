import axios from "axios";
import { toast } from "react-toastify";

export function useTransaction() {
  const createBenefitTransaction = async (values) => {
    try {
      const response = await axios.post("/api/transaction/benefit", values);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const createExpenseTransaction = async (values) => {
    try {
      const response = await axios.post("/api/transaction/expense", values);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const createInvestmentTransaction = async (values) => {
    try {
      const response = await axios.post("/api/transaction/investment", values);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return {
    createBenefitTransaction,
    createExpenseTransaction,
    createInvestmentTransaction,
  };
}
export default useTransaction;
