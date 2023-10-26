/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-10-20 11:16:43
 * @modify date 2023-10-25 18:17:10
 * @desc [description]
 */
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TokenRefresher from "../member/TokenRefresher";

const CampaignDetails = ({ campaignId }) => {
  //const { id } = useParams();
  const id = campaignId;
  // const history = useHistory();

  // const [snsData, setSnsData] = useState({
  //   content: "",
  //   tags: "",
  // });
  // const form = new FormData();
  // const [files, setFiles] = useState([]);
  // const [showModal, setShowModal] = useState(false); // 모달 상태 추가

  // const changeInput = (evt) => {
  //   const { name, value, type } = evt.target;

  //   if (type === "file") {
  //     const selectedFiles = Array.from(evt.target.files);

  //     setFiles([...files, ...selectedFiles]);
  //   } else {
  //     setSnsData({
  //       ...snsData,
  //       [name]: value,
  //     });

  //   }

  // };

  // const deleteFile = (indexToDelete) => {
  //   const updatedFiles = files.filter((_, index) => index !== indexToDelete);
  //   setFiles(updatedFiles);
  // };

  // const submitData = () => {
  //   files.forEach((file) => {
  //     form.append("files", file);
  //   });
  //   form.append(
  //     "data",
  //     new Blob([JSON.stringify(snsData)], { type: "application/json" })
  //   );
  //   try {
  //     TokenRefresher
  //       .post("/sns/create", form, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((res) => console.log(res.data));
  //   } catch (error) {
  //     if (error.response) {
  //       const errorResponse = error.response.data;
  //       console.log(errorResponse);
  //     }
  //   }
  //   history.push("/");
  // };

  useEffect(() => {
    TokenRefresher.get(`/sns/showCampaign/${id}`)
      .then((res) => {
        setData(res.data);
        // 데이터를 가져온 후에 data.tags 값을 설정
        // setSnsData((prevSnsData) => ({
        //   ...prevSnsData,
        //   tags: res.data.tags,
        // }));
      })
      .catch((error) => {
        if (error.response) {
          const errorResponse = error.response.data;
          console.log(errorResponse);
        }
      });
  }, [id]);

  const [data, setData] = useState({});
  const {
    title,
    organizer,
    description,
    verificationMethod,
    tags,
    dueDate,
    createdDate,
  } = data;

  // 현재 시간
  const currentDate = new Date();

  // 캠페인 마감일
  const campaignDueDate = new Date(dueDate);

  // 남은 시간 계산 (밀리초로 계산)
  const timeRemaining = campaignDueDate - currentDate;

  // 만료 여부 확인
  const isExpired = timeRemaining <= 0;

  // 시간 형식으로 변환
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setTime({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timeRemaining]);

  // 원하는 날짜 형식으로 포맷
  const formattedDueDate = `${campaignDueDate.getFullYear()}-${(
    campaignDueDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${campaignDueDate
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  return (
    <Container style={{ maxWidth: "1040px" }}>
      <div>
        <br />
        <h1>
          <b>{title}</b>
        </h1>
        <hr />
        <h3> 주최자 : {organizer}</h3>
        <br />
        <Row>
          <Col xs={12} sm={12} md={6}>
            {data.images &&
              data.images.map((image, index) => (
                <img
                  key={index}
                  src={image.filepath}
                  alt={`Image ${index}`}
                  style={{ maxWidth: "700px", maxHeight: "700px" }}
                />
              ))}
          </Col>
        </Row>
        <br />
        <Row>
          <h3> 상세설명 : </h3>
          <h5>{description}</h5>
        </Row>

        <br />
        <h3> 인증 방법 : </h3>
        <h5>{verificationMethod}</h5>
        <br />
        <h3>
          {" "}
          태그 :{" "}
          <h4>
            <b>{tags}</b>
          </h4>
        </h3>
        <br />
        <h3>
          {isExpired ? (
            <button className="saveButton">만료된 캠페인</button>
          ) : (
            `남은 시간: ${time.days}일 ${time.hours}시간 ${time.minutes}분 ${time.seconds}초`
            // <div>
            //   <p>남은 시간: {time.days}일 {time.hours}시간 {time.minutes}분 {time.seconds}초</p>
            //   <ProgressBar now={percentRemaining} label={`${percentRemaining.toFixed(2)}%`} />
            // </div>
          )}
        </h3>
        {/* Conditionally render the button with data.tags as a parameter */}
        {/* {!isExpired && (
          // <Link to={`/sns/snsRegistration?tags=${data.tags}`}>
          // <Link to={{
          //   pathname: "/sns/snsRegistration",
          //   state: { tags } // 데이터를 보냅니다.
          // }}>
            <button className="saveButton">인증하기</button>
          // </Link>
        )} */}
      </div>
      <br />
      {/* {!isExpired && (
        <Button
          className="saveButton"
          onClick={() => setShowModal(true)} // 인증 버튼을 누르면 모달 열도록 설정
        >
          인증하기
        </Button>
      )} */}

      {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>SNS 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>글쓰기</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={snsData.content}
                onChange={changeInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>태그</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={data.tags}
                onChange={changeInput}
              />
            </Form.Group>

          </Form>
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
          <input
            name="files"
            id="files"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={changeInput}
            style={{ display: "none" }}
          />
          <br /><br /><br />
          <SnsImagePreview files={files} deleteFile={deleteFile} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { submitData(); setShowModal(false) }}>
            확인
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
};

export default CampaignDetails;
