/**
 * @author wheesunglee
 * @create date 2023-10-08 22:08:34
 * @modify date 2023-10-11 14:40:24
 */

import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import ImagePreview from "./ImagePreview";
import KakaoMapModal from "./KakaoMapModal";

const ProductUpdate = () => {
  const location = useLocation();
  const history = useHistory();
  const form = new FormData();

  const [data, setData] = useState(location.state.data);
  const [newFiles, setNewFiles] = useState([]);
  const [removedFiles, setRemovedFiles] = useState([]);

  const {
    id,
    name,
    price,
    description,
    category,
    latitude,
    longitude,
    images,
  } = data;

  const changeInput = (evt) => {
    const { name, value, type } = evt.target;

    if (type === "file") {
      const selectedFiles = Array.from(evt.target.files);

      setNewFiles([...newFiles, ...selectedFiles]);
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleMapSubmit = (location) => {
    setData({
      ...data,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const deleteFile = (indexToUpdate) => {
    const updatedFiles = newFiles.filter((_, index) => index !== indexToUpdate);
    setNewFiles(updatedFiles);
  };

  const removeFile = (indexToDelete) => {
    const removedFile = images.splice(indexToDelete, 1);
    setRemovedFiles([...removedFiles, removedFile[0].id]);
  };

  const deleteProduct = () => {
    try {
      axios.delete(`/api/products/delete/${id}`);
    } catch (error) {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    }
    history.push("/");
  };

  const submitData = () => {
    newFiles.forEach((file) => {
      form.append("files", file);
    });
    form.append("removedFiles", removedFiles);
    form.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    try {
      axios
        .put(`/api/products/update/${id}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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
      <h1> 물품 수정 양식</h1>
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
      <label for="files">
        <div
          style={{
            border: "1px solid rgb(77,77,77)",
            width: "150px",
            height: "30px",
            borderRadius: "10px",
          }}
        >
          파일 업로드하기
        </div>
      </label>
      <input
        name="files"
        id="files"
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={changeInput}
        style={{ display: "none" }}
      />
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.filepath} width={200} alt={`Image ${index}`} />
          <button onClick={() => removeFile(index)}>삭제</button>
        </div>
      ))}
      <ImagePreview files={newFiles} deleteFile={deleteFile} />
      <br />
      <button onClick={submitData}>수정하기</button>
      <button onClick={deleteProduct}>삭제하기</button>
    </div>
  );
};

export default ProductUpdate;
