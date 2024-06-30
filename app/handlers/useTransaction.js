import axios from "axios";
import { toast } from "react-toastify";

export function useTransaction() {
  const createBenefitTransaction = async (values) => {
    try {
      const response = await axios.post("/api/transaction/benefit", values);
      setIsLoading(false);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const createExpenseTransaction = async (values) => {
    try {
      const response = await axios.post("/api/transaction/expense", values);
      setIsLoading(false);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const createInvestmentTransaction = async (values) => {
    try {
      const response = await axios.post("/api/transaction/investment", values);
      setIsLoading(false);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const getTransactionsByMonth = async (year, month, setIsLoading) => {
    try {
      const response = await axios.get("/api/transaction/search/" + year + "/" + month);
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const getTransactionByTypeAndId = async (type, id, setIsLoading) => {
    try {
      const response = await axios.get(`/api/transaction/${type}/${id}`);
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const updateTransaction = async (type, id, values) => {
    try {
      const response = await axios.put(
        `/api/transaction/${type}/${id}`,
        values
      );
      setIsLoading(false);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const deleteTransaction = async (type, id) => {
    try {
      const response = await axios.delete(`/api/transaction/${type}/${id}`);
      setIsLoading(false);
      toast.success(response.data.message);
      return id;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const getTransactionsByYear = async (year, setIsLoading) => {
    try {
      const response = await axios.get(`/api/transaction/search/${year}`);
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  }

  const getAllTransactions = async (setIsLoading) => {
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
