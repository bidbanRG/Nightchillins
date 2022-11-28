
import { URL } from '../uri';
import axios from 'axios';
const mp = new Map();
const wrapPromise = () => {

const promise = (personId) => {
    return axios.post(URL + '/users/getbyId',personId).then(x => x.data[0]);
};



  let status = "pending";
  let result = "";
  let suspender = (personId) => { 
      return promise(personId).then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
}
  return {
    read(personId) {
       
       if(mp.has(personId._id))
          return mp.get(personId._id);

      if (status === "pending") {
        throw suspender(personId);
      } else if (status === "error") {
        throw result;
      }
       
      mp.set(personId._id,result); 
      return result;
    }
  };
};


export const createResource = () => {
  return {
    person: wrapPromise(),
  };
};
