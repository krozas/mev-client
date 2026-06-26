import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  PersistQueryClientProvider,
  removeOldestQuery,
} from "@tanstack/react-query-persist-client";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import React from "react";
/*
  NOTA: por default todos los forms son verticales por la clase 'container-layout'
  para hacerlo horizontal se debe agregar la clase '!flexrow' en el form correspondiente
*/

const queryClientPersistance = new QueryClient();

// Create a client
// TODO: revisar performance de la serialización y deserialización
//TODO: analizar el uso de buster string
const queryClientPersister = createAsyncStoragePersister({
  storage: window.localStorage,
  throttleTime: Infinity, //Luego de una modificación, en 500ms se actualiza la información en el storage
  serialize: (data) => {
    
    return JSON.stringify(data);
  },
  
  retry: removeOldestQuery,
});

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ConfigProvider
      locale={esES}
      form={{ className: "custom-form container-layout" }}
      tabs={{ className: "custom-tabs" }}
      modal={{
        styles: { header: { marginBottom: "1rem" } },
        classNames: { body: "container-layout" },
      }}
      drawer={{ classNames: { body: "container-layout" } }}
      input={{ className: "custom-input-disabled" }}
      dropdown={{ className: "custom-dropdown-button" }}
      collapse={{ className: "custom-collapse" }}
      layout={{
        className: "custom-layout",
      }}
    >
      <PersistQueryClientProvider
        client={queryClientPersistance}
        persistOptions={{
          persister: queryClientPersister,
          dehydrateOptions: {
            shouldDehydrateQuery: (query) => Boolean(query.meta?.persist),
          },
        }}
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </PersistQueryClientProvider>
    </ConfigProvider>
  );
}
