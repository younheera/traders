/**
 * @author wheesunglee
 * @create date 2023-09-20 10:21:07
 * @modify date 2023-09-27 16:27:56
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <h1>ProductController의 getProduct()</h1>
      <ul>
        <li>
          {data.id}/{data.name}
        </li>
      </ul>
    </div>
  );
};

export default ProductDetails;
