
const wrapPromise = () => {

const promise = (source) => {
    return new Promise(resolve  => {
      setTimeout(() =>{  
       const img = new Image();
       img.src = source;
       img.onload = resolve;
       },300)
    })
};



  let status = "pending";
  let result = "";
  let suspender = (source) => { 
      return promise(source).then(
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
    read(source) {
      if (status === "pending") {
        throw suspender(source);
      } else if (status === "error") {
        throw result;
      }

      return result;
    }
  };
};


export const createImageResource = () => {
  return {
     image: wrapPromise(),
  };
};
