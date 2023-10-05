/**
 * @author wheesunglee
 * @create date 2023-09-30 13:38:26
 * @modify date 2023-10-05 16:21:13
 */

import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import KakaoMapModal from "./KakaoMapModal";

const ProductRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    latitude: 0.0,
    longitude: 0.0,
  });

  const { name, price, description } = form;

  const changeInput = (evt) => {
    const { value, name } = evt.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleMapSubmit = (location) => {
    // 카카오 지도 모달에서 선택한 위치를 받아와서 폼에 업데이트
    setForm({
      ...form,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const history = useHistory();

  const submitForm = () => {
    try {
      console.log(form);
      axios
        .post("/api/products/register", form)
        .then((res) => console.log(res.data));
    } catch (error) {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    }
    history.push("/");
  };

  return (
    <div>
      <h1> 물품 등록 양식</h1>
      제목
      <input type="text" name="name" value={name} onChange={changeInput} />
      <br />
      가격
      <input type="text" name="price" value={price} onChange={changeInput} />
      <br />
      상세설명
      <textarea
        name="description"
        value={description}
        onChange={changeInput}
        rows={10}
      />
      <br />
      <input
        type="radio"
        name="category"
        value="furniture"
        onChange={changeInput}
      />
      가구
      <input type="radio" name="category" value="pet" onChange={changeInput} />
      반려동물 용품
      <input type="radio" name="category" value="etc" onChange={changeInput} />
      기타
      <br />
      거래장소 정하기
      <KakaoMapModal onMapSubmit={handleMapSubmit} />
      <br />
      <br />
      <button onClick={submitForm}>상품작성완료</button>
    </div>
  );
};

export default ProductRegistration;
