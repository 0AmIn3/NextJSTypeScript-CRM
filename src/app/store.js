import { configureStore } from "@reduxjs/toolkit";
import CompanySlice from "../features/CompanySlice";
import ClientsSlice from "../features/clients/ClientsSlice";
import HotelsSlice from "../features/hotels/HotelsSlice";
import FilialsSlice from "../features/filials/FilialsSlice";

export const store = configureStore({
  reducer: {
    company: CompanySlice,
    clients: ClientsSlice,
    hotels:HotelsSlice,
    filials:FilialsSlice,
  },
});
