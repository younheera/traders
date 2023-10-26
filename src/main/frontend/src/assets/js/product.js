/**
 * @author wheesunglee
 * @create date 2023-10-20 13:54:31
 * @modify date 2023-10-23 15:24:29
 */

import TokenRefresher from "../../components/util/TokenRefresher";

const fetchProduct = (id) => {
  return TokenRefresher.get(`http://localhost:8080/api/products/${id}`)
    .then((res) => {
      console.log("fetchproduct", res.data);
      return {
        data: res.data,
        images: res.data.images,
      };
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    });
};
const fetchLiked = (id) => {
  return TokenRefresher.get(`http://localhost:8080/api/redis/checkLiked/${id}`)
    .then((res) => {
      console.log("fetchliked", res.data);
      return { data: res.data };
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    });
};

const fetchLikes = (id) => {
  return TokenRefresher.get(`http://localhost:8080/api/redis/getLikes/${id}`)
    .then((res) => {
      console.log("fetchlikes", res.data);
      return { data: res.data };
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    });
};

const changeLikes = (id) => {
  return TokenRefresher.put(`http://localhost:8080/api/redis/changeLikes/${id}`)
    .then((res) => {
      console.log("fetchlikes", res.data);
      return { data: res.data };
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    });
};

export { changeLikes, fetchLiked, fetchLikes, fetchProduct };

