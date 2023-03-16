import { useState, useEffect, useRef } from "react";
const https = require('https')
const httpsAgent = new https.Agent({ keepAlive: true };

function useFetch (url) {

  const [data, setData] = useState(null);  
  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (!renderAfterCalled.current) {
        Promise.all([
            fetch(url, {credentials: 'include', httpsAgent})
            .then(res => {
                if(res.status === 200) {
                return res.json()
                } else if (res.status === 401){
                alert("You don't have permission.")
                window.location.replace('/')
                } else {
                alert("There has been an error fetching data, please try again later.")
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
    }
    renderAfterCalled.current = true;
  }, []);

  return [data];
};

export default useFetch;