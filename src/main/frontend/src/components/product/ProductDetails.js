/**
 * @author wheesunglee
 * @create date 2023-09-20 10:21:07
 * @modify date 2023-10-04 20:59:30
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const { name, price, description, category, latitude, longitude } = data;

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setData(res.data))
      .catch((error) => {
        if (error.response) {
          const errorResponse = error.response.data;
          console.log(errorResponse);
        }
      });
  }, [id]);

  return (
    <div>
      <h1>ProductController의 getProduct()</h1>
      <h2>이름 - {name}</h2>
      <hr />
      <h3> 가격 - {price}</h3>
      <h3> 상세설명 - {description}</h3>
      <h3> 카테고리 - {category}</h3>
      <h3> {latitude}</h3>
      <h3> {longitude}</h3>
    </div>
  );
};

export default ProductDetails;
