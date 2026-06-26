import { useCallback, useState } from "react";

type ErrorResult = string | null;
type DataResult<T> = T | null;
type QueryResult<T> = { loading: boolean; error: ErrorResult; data: DataResult<T> };

export function useQuery<T = any>(
  callback: (...params: any[]) => Promise<any>,
  options: { initLoading: boolean } = { initLoading: false }
): [(...params: any[]) => Promise<QueryResult<T>>, QueryResult<T>] {
  const { initLoading = false } = options;
  const [loading, setLoading] = useState<boolean>(initLoading);
  const [error, setError] = useState<ErrorResult>(null);
  const [data, setData] = useState<DataResult<T>>(null);

  const queryCall = useCallback(
    async (...params: any[]) => {
      let loadingAux = loading,
        errorAux = error,
        dataAux = data;
      loadingAux = true;
      setLoading(loadingAux);
      setError(null);
      setData(null);
      await callback(...params)
        .then((res) => {
          dataAux = res;
          setData(dataAux);
          setError(null);
        })
        .catch((e) => {
          console.error("[ERROR] || useQuery || e", e);
          if (e.message) {
            errorAux = e.message;
          } else {
            errorAux =
              "El servidor no pudo responder su solicitud. Intente nuevamente o comuníquese con soporte.";
          }
          setError(errorAux);
          throw new Error(e);
        })
        .finally(() => {
          loadingAux = false;
          setLoading(loadingAux);
        });

      return { loading: loadingAux, error: errorAux, data: dataAux };
    },
    [callback]
  );

  return [queryCall, { loading, error, data }];
}
