import API from "./api";

export const globalSearch = async (query) => {
  const { data } = await API.get(
    `/admin/search?q=${query}`
  );

  return data;
};