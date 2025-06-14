import { api } from "../api";

export const getDbTeste = async () => {
    const response = await api().get("/data/dbTeste.json");
    return response;
};