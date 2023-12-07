import axios from "axios";

export const getObject = async (url: string) => {
  let object = null;

  try {
    const res = await axios.get(url);
    object = res.data;
  } catch (error) {
    console.log(error);
  }

  return object;
};

export const getObjects = async (url: string) => {
  let objects = [];
  try {
    const res = await axios.get(url);
    if (!Array.isArray(res.data)) throw "incoming data is not a list";
    objects = res.data;
  } catch (error) {
    console.log(error);
  }
  return objects;
};
