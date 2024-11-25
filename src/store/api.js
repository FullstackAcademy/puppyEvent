import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/";

// TODO: configure createApi to use API_URL as the base URL
// TODO: add "Puppy" as a tag type.
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  puppyTag: ["Puppy"],
  endpoints: (builder) => ({}),
});

export default api;
