/**
 * @author wheesunglee
 * @create date 2023-09-20 10:19:28
 * @modify date 2023-09-20 14:01:52
 */


import axios from "axios";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("/api/product")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  return <div>ProductController의 showAllProducts() : {data}</div>;
};

export default ProductList;
