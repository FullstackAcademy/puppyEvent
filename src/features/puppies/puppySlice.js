import api from "../../store/api";

// The query endpoints should provide the "Puppy" tag.
// The mutation endpoints should invalidate the "Puppy" tag.

// */

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => "players",
      puppyTag: ["Puppy"],
      transformResponse: (response) => response.data.players,
    }),
    getPuppy: build.query({
      query: (id) => `players/${id}`,
      providesTag: ["Puppy"],
    }),
    transformResponse: (response) => {
    const player = response?.data?.players?.[0];
    return player || null;},

    addPuppy: build.mutation({
      query: (newPuppy) => ({
        url: "players",
        method: "POST",
        body: newPuppy,
      }),
      invalidatesTags: [{ type: "Puppy", id: "LIST" }],
      transformResponse: (response) => response.data.players,
    }),
    deletePuppy: build.mutation({
      query: (id) => ({
        url: `players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Puppy" }],
      transformErrorResponse: (error) => error.data,
      transformResponse: (response) => {
        console.log("API Response:", response); 
        return response.data;
        
      },
    }),
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;
export default puppyApi;
