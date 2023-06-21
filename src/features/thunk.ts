import axios from "axios";
import { createAsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";

interface ThunkIF {
  data?: any
  userKey?: any
}
export const getCompanyAPI : any = createAsyncThunk<any,any,any>("/getCompanyAPI", async () => {
  const res = await axios.get(
    "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin.json"
  );
  return {
    data: Object.values(res.data),
    userKey: res.data,
  };
});
export const postCompanyAPI = createAsyncThunk<any,any,any>(
  "/postCompanyAPI",
  async (data) => {
    const res = await axios.post(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin.json",
      data
    );

    return res.data;
  }
);
export const deleteCompanyAPI : any = createAsyncThunk<any,any,any>(
  "/deleteCompanyAPI",
  async (data) => {
    await axios.delete(
      `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${data}.json`
    );
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin.json"
    );
    return res.data;
  }
);
export const pathCompanyAPI : any = createAsyncThunk<any,any,any>(
  "/pathCompanyAPI",
  async (data) => {
    await axios.patch(
      `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${data.key}.json`,
      data.obj
    );
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin.json"
    );

    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);


export const getClientsAPI: any = createAsyncThunk<any,any,any>(
  "clients/getClientsAPI",
  async () => {
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients.json"
    );
    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);

export const postClientsAPI: any = createAsyncThunk<any,any,any>(
  "clients/postClientsAPI",
  async (data) => {
    const res = await axios.post(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients.json",
      data
    );

    return res.data;
  }
);

export const pathClientsAPI: any = createAsyncThunk<ThunkIF, any, any>(
  "clients/pathClientsAPI",
  async (data) => {
    await axios.patch(
      `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients/${data.key}.json`,
      data.obj
    );
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients.json"
    );

    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);

export const putClientsAPI: any = createAsyncThunk<any,any,any>(
  "clients/putClientsAPI",
  async (dat) => {
    await axios.put(
      `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients.json`,
      dat
    );
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients.json"
    );

    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);


export const getHotelsAPI: any = createAsyncThunk<any,any,any>(
  "hotels/getHotelsAPI",
  async () => {
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels.json"
    );
    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);

export const postHotelsAPI: any = createAsyncThunk<any,any,any>(
  "hotels/postHotelsAPI",
  async (data) => {
    const res = await axios.post(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels.json",
      data
    );

    return res.data;
  }
);

export const pathHotelsAPI: any = createAsyncThunk<any,any,any>(
  "hotels/pathHotelsAPI",
  async (data) => {
    await axios.patch(
      `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels/${data.key}.json`,
      data.obj
    );
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels.json"
    );

    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);

export const putHotelsAPI: any = createAsyncThunk<any,any,any>(
  "hotels/putHotelsAPI",
  async (dat) => {
    await axios.put(
      `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels.json`,
      dat
    );
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels.json"
    );

    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);


export const getFilialsAPI: any = createAsyncThunk<any,any,any>(
  "filials/getFilialsAPI",
  async () => {
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/fillials.json"
    );
    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);

export const postFilialsAPI: any = createAsyncThunk<any,any,any>(
  "filials/postFilialsAPI",
  async (data) => {
    const res = await axios.post(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/fillials.json",
      data
    );

    return res.data;
  }
);

export const pathFilialsAPI : any = createAsyncThunk<any,any,any>(
  "filials/pathFilialsAPI",
  async (data) => {
    await axios.patch(
      `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/fillials/${data.key}.json`,
      data.obj
    );
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/fillials.json"
    );

    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);

export const putFilialsAPI: any = createAsyncThunk<any,any,any>(
  "filials/putFilialsAPI",
  async (dat) => {
    await axios.put(
      `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/fillials.json`,
      dat
    );
    const res = await axios.get(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/fillials.json"
    );

    return {
      data: Object.values(res.data),
      userKey: res.data,
    };
  }
);