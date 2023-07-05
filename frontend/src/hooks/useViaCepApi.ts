import axios, { AxiosPromise } from "axios";
import { IViaCepApi } from "../interfaces/IViaCepApi";
import { useQuery } from "@tanstack/react-query";

const fetchViaCepApi = async (cep: string): AxiosPromise<IViaCepApi[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_VIA_CEP_URL}/${cep}/${
      import.meta.env.VITE_API_VIA_CEP_URL_FORMAT
    }`
  );

  return response;
};

export function useViaCepApi(cep: string) {
  const query = useQuery({
    queryFn: () => fetchViaCepApi(cep),
    queryKey: ["query-via-cep-api"],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
