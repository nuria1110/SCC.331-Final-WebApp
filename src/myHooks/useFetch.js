import { useState, useEffect } from "react";

function useFetch (url) {

  const [data, setData] = useState(null);  

  useEffect(() => {
    Promise.all([
      fetch(url, {credentials: 'include'})
      .then(res => {
        if(res.status === 200) {
          return res.json()
        } else if (res.status === 401){
          alert("You don't have permission.")
          window.location.replace('/')
        } else {
          alert("There has been an error, please try again later.")
          window.location.replace('/')
        }
      }),
    ])
    .then((data) => {
      console.log(data[0])
      setData(data[0])
    })
    .catch((err) => {
        console.log(err);
    });
  }, [url]);

  return [data];
};

export default useFetch;