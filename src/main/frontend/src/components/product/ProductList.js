/**
 * @author wheesunglee
 * @create date 2023-09-20 10:19:28
 * @modify date 2023-09-26 16:14:35
 */

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>ProductController의 showAllProducts()</h1>
      <ul>
        {data.map((product, index) => (
          <li key={index}>
            {product.id}/{product.name}
            <br />
            <Link to={`/products/${product.id}`}>ProductDetails</Link>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
