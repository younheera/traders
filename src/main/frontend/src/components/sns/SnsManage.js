/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-10-20 11:17:23
 * @modify date 2023-10-25 18:17:14
 * @desc [snsList와 snsDetails를 감싸고 있음]
 */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import TokenRefresher from '../member/TokenRefresher';
import SnsDetails from './SnsDetails';
import SnsImagePreview from "./SnsImagePreview";
import SnsList from './SnsList';

const SnsManage = ({ campaigns }) => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedEntire, setSelectedEntire] = useState(null);

  const [snsData, setSnsData] = useState({
    content: "",
    tags: "",
  });
  const form = new FormData();
  const [files, setFiles] = useState([]);

  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const currentDate = new Date();

  const changeInput = (evt) => {
    const { name, value, type } = evt.target;

    if (type === "file") {
      const selectedFiles = Array.from(evt.target.files);

      setFiles([...files, ...selectedFiles]);
    } else {
      setSnsData({
        ...snsData,
        [name]: value,
      });
    }
  };

  const deleteFile = (indexToDelete) => {
    const updatedFiles = files.filter((_, index) => index !== indexToDelete);
    setFiles(updatedFiles);
  };

  const submitData = () => {
    files.forEach((file) => {
      form.append("files", file);
    });
    form.append(
      "data",
      new Blob([JSON.stringify(snsData)], { type: "application/json" })
    );
    try {
      TokenRefresher.post("/sns/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        console.log(res.data);
        // 데이터 제출 완료 후 input 내용 초기화
        setSnsData({
          content: "",
          tags: "",
        });
        setFiles([]);

        // Update posts data
        fetchPostsData();
      });
    } catch (error) {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    }
    // history.push("/");
  };

  // useEffect(() => {
  //   // 데이터 가져오는 API 요청
  //   TokenRefresher
  //     .get("/sns/list")
  //     .then((res) => setPosts(res.data))
  //     .catch((error) => {
  //       if (error.response) {
  //         const errorResponse = error.response.data;
  //         console.log(errorResponse);
  //       }
  //     });
  // }, []);

  const fetchPostsData = () => {
    // Fetch new posts data and update the state
    TokenRefresher.get("/sns/list")
      .then((res) => setPosts(res.data))
      .catch((error) => {
        if (error.response) {
          const errorResponse = error.response.data;
          console.log(errorResponse);
        }
      });
  };

  useEffect(() => {
    // Fetch posts data on initial render
    fetchPostsData();
  }, []);

  const handleImageClick = (image) => {
    //사진 클릭할 시 상세보기
    setSelectedImage(image);
  };

  const handleListClick = () => {
    setSelectedImage(null);
  };

  const handleTagButtonClick = (tag) => {
    setSelectedTag(tag);

    // 추가로 이미지와 태그를 비교하여 필요하다면 selectedImage를 null로 설정
    if (selectedImage && selectedImage.tags !== tag) {
      setSelectedImage(null);
    }
  };

  return (
    <Container style={{ maxWidth: "1040px" }}>
      <div>
        <div>
          <ButtonGroup aria-label="Basic example">
            <Button
              className="cancelButton-1"
              variant="secondary"
              onClick={() => {
                setSelectedTag(null);
                setSelectedEntire("전체");
              }}
            >
              전체
            </Button>
            {campaigns &&
              campaigns.map((campaign) => {
                //console.log('캠페인 태그: '+ campaign.tags); // campaign의 tags를 console.log에 출력
                return (
                  <Button
                    className="cancelButton-1"
                    variant="secondary"
                    key={campaign.id}
                    onClick={() => {
                      handleTagButtonClick(campaign.tags);
                      setSelectedEntire(null);
                    }}
                  >
                    {`${campaign.tags}`}
                  </Button>
                );
              })}
          </ButtonGroup>
          {/* <Link to={`/sns/snsRegistration`}>
            <button style={{ float: 'right' }} className="saveButton">글쓰기</button>
          </Link> */}
          <button
            className="saveButton"
            onClick={() => setShowModal(true)} // 인증 버튼을 누르면 모달 열도록 설정
            style={{ float: "right" }}
          >
            글쓰기
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <SnsList
              posts={posts}
              onImageClick={handleImageClick}
              selectedTag={selectedTag}
            />
          </div>
          <div style={{ flex: 1 }}>
            <br />
            <SnsDetails
              selectedImage={selectedImage}
              selectedTag={selectedTag}
              selectedEntire={selectedEntire}
            />
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>SNS 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showSubmitForm && (
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>글쓰기</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content"
                  value={snsData.content}
                  onChange={changeInput}
                  maxLength={254}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>태그</Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  value={snsData.tags}
                  onChange={changeInput}
                />
              </Form.Group> */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlSelect1"
              >
                <Form.Label>태그</Form.Label>
                <Form.Control
                  as="select"
                  name="tags"
                  value={snsData.tags}
                  onChange={changeInput}
                >
                  <option value="" disabled>
                    태그 선택
                  </option>
                  {campaigns.map((campaign) => (
                    <option
                      key={campaign.id}
                      value={campaign.tags}
                      disabled={new Date(campaign.dueDate) < currentDate}
                    >
                      {campaign.tags}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          )}

          {showSubmitForm && (
            <div>
              <label htmlFor="files">
                <div
                  className="btn-upload"
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
              {/* <Button variant="secondary" size="lg">사진 등록</Button> */}
              <input
                name="files"
                id="files"
                type="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={changeInput}
                style={{ display: "none" }}
              />
              <br />
              <br />
              <br />
              <SnsImagePreview files={files} deleteFile={deleteFile} />
            </div>
          )}

          {showConfirmationMessage && (
            <div
              className="confirmation-message"
              style={{ textAlign: "center" }}
            >
              <br />
              <p>sns 등록이 완료되었습니다</p>
              <Button
                variant="success"
                onClick={() => {
                  setShowConfirmationMessage(false);
                  setShowModal(false);
                  setShowSubmitForm(true); // 다시 제출 폼을 표시
                }}
              >
                확인
              </Button>
            </div>
          )}

          {showAlert && (
            <div className="alert alert-danger" style={{ marginTop: "10px" }}>
              모든 필드를 입력하세요.
            </div>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
          {showSubmitForm && (
            <Button variant="success" onClick={() => {
              submitData();
              setShowSubmitForm(false); // 제출 폼을 숨깁니다.
              setShowConfirmationMessage(true); // 완료 메시지를 표시
            }}>
              확인
            </Button>
          )}
        </Modal.Footer> */}

        <Modal.Footer>
          {showSubmitForm && (
            <Button
              variant="success"
              onClick={() => {
                if (snsData.content && snsData.tags && files.length > 0) {
                  // 모든 필드가 입력되었을 때만 데이터 제출
                  submitData();
                  setShowSubmitForm(false); // 제출 폼을 숨깁니다.
                  setShowConfirmationMessage(true); // 완료 메시지를 표시
                } else {
                  // 모든 필드가 입력되지 않은 경우 경고 메시지 표시
                  setShowAlert(true);

                  // Automatically hide the alert after 5 seconds
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 1000);
                }
              }}
            >
              확인
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SnsManage;
