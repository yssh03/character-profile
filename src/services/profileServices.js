import axios from "axios";

let API_URL = "https://rickandmortyapi.com/api/character/";

export const getProfiles = (page) => {
  return axios.get(API_URL + `?page=${page}`);
};

export const getProfile = (id) => {
  return axios.get(API_URL + `${id}`);
};

export const getFilteredData = (data) => {
  return axios.get(
    API_URL +
      `?name=${data.name}&status=${data.status}&species=${data.species}&gender=${data.gender}&type=${data.type}`
  );
};
