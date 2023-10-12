/**
 * @author wheesunglee
 * @create date 2023-09-20 10:19:28
 * @modify date 2023-10-12 11:32:16
 */

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setData(res.data))
      .catch((error) => {
        if (error.response) {
          const errorResponse = error.response.data;
          console.log(errorResponse);
        }
      });
  }, []);

  return (
    <div>
      <h1>ProductController의 showAllProducts()</h1>
      <button onClick={() => setShowAvailable(!showAvailable)}>
        {showAvailable ? "전체 상품 보기" : "거래 가능한 상품 보기"}
      </button>
      <ul>
        {data.map((product, index) => {
          if (showAvailable && product.status === "SOLD") {
            return null; // 거래 가능한 상품만 보여주지 않음
          }
          return (
            <li key={index}>
              {product.id}/{product.name}
              <br />
              {product.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.filepath}
                    width={200}
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
              <Link to={`/products/${product.id}`}>ProductDetails</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ProductList;
