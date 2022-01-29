import axios from "axios";

export const getImages = async (query) => {
  return await axios.get("https://pixabay.com/api/", { params: query });
};
