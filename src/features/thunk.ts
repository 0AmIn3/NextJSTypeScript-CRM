import axios from "axios";
import { createAsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";

interface ThunkIF {
  data?: any
  userKey?: any
}
export const getCompanyAPI : any = createAsyncThunk("/getCompanyAPI", async () => {
  const res = await axios.get(
    "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin.json"
  );
  return {
    data: Object.values(res.data),
    userKey: res.data,
  };
});
export const postCompanyAPI = createAsyncThunk(
  "/postCompanyAPI",
  async (data) => {
    const res = await axios.post(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin.json",
      data
    );

    return res.data;
  }
);
export const deleteCompanyAPI : any = createAsyncThunk(
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


export const getClientsAPI: any = createAsyncThunk(
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

export const postClientsAPI: any = createAsyncThunk(
  "clients/postClientsAPI",
  async (data) => {
    const res = await axios.post(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients.json",
      data
    );

    return res.data;
  }
);

export const pathClientsAPI: any = createAsyncThunk<any,any,any>(
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

export const putClientsAPI: any = createAsyncThunk(
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


export const getHotelsAPI: any = createAsyncThunk(
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

export const postHotelsAPI: any = createAsyncThunk(
  "hotels/postHotelsAPI",
  async (data) => {
    const res = await axios.post(
      "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels.json",
      data
    );

    return res.data;
  }
);

export const pathHotelsAPI: any = createAsyncThunk <any,any,any>(
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

export const putHotelsAPI: any = createAsyncThunk(
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


export const getFilialsAPI: any = createAsyncThunk(
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

export const postFilialsAPI: any = createAsyncThunk(
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

export const putFilialsAPI: any = createAsyncThunk(
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