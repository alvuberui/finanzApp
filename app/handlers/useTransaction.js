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

  const getTransactionsByMonth = async (year, month) => {
    try {
      const response = await axios.get("/api/transaction/search/" + year + "/" + month);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getTransactionByTypeAndId = async (type, id) => {
    try {
      const response = await axios.get(`/api/transaction/${type}/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const updateTransaction = async (type, id, values) => {
    try {
      const response = await axios.put(
        `/api/transaction/${type}/${id}`,
        values
      );
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const deleteTransaction = async (type, id) => {
    try {
      const response = await axios.delete(`/api/transaction/${type}/${id}`);
      toast.success(response.data.message);
      return id;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getTransactionsByYear = async (year) => {
    try {
      const response = await axios.get(`/api/transaction/search/${year}`);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  const getAllTransactions = async () => {
    try {
      const response = await axios.get("/api/transaction");
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return {
    createBenefitTransaction,
    createExpenseTransaction,
    createInvestmentTransaction,
    getTransactionsByMonth,
    getTransactionByTypeAndId,
    updateTransaction,
    deleteTransaction,
    getTransactionsByYear,
    getAllTransactions,
  };
}
export default useTransaction;
