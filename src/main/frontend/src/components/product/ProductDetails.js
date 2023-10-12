/**
 * @author wheesunglee
 * @create date 2023-09-20 10:21:07
 * @modify date 2023-10-12 10:25:28
**/
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({});

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
  }, []);

  const { name, price, description, category, latitude, longitude, images } =
    data;
  console.log(images);
  console.log(Array.isArray(images));

  return (
    <div>
      <h1> 조건문 달아서 사용자가 작성자와 일치할 때만 링크 보이게</h1>
      <button
        onClick={() => {
          history.push(`/products/update/${id}`, { data });
        }}
      >
        수정하기
      </button>

      <h1>ProductController의 getProduct()</h1>
      <h2>이름 - {name}</h2>
      <hr />
      <h3> 가격 - {price}</h3>
      <h3> 상세설명 - {description}</h3>
      <h3> 카테고리 - {category}</h3>
      <h3> {latitude}</h3>
      <h3> {longitude}</h3>
      <h3>
        <h3>
          {images && images.length > 0
            ? images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.filepath}
                    width={200}
                    alt={`Image ${index}`}
                  />
                </div>
              ))
            : null}
        </h3>
      </h3>
    </div>
  );
};

export default ProductDetails;
