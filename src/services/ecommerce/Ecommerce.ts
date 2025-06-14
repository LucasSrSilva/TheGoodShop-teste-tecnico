import { api } from "../api";

export const getDbTeste = async () => {
    const response = await api().get("http://localhost:3001/products");
    return response;
};