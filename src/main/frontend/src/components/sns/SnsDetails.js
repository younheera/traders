import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import user from '../../assets/img/Chatprofile.png';
import TokenRefresher from '../member/TokenRefresher';

const SnsDetails = ({ selectedImage, selectedTag, selectedEntire }) => {
  // if (!selectedImage) {
  //   // 선택한 이미지가 없을 때
  //   return <div></div>;
  // }

  // 선택한 이미지의 tags를 날짜 형식으로 변환
  // const createdDate = new Date(displayImage.createdDate);
  // const formattedDate = createdDate.toLocaleDateString(); // 형식화된 날짜 문자열을 가져옵니다.

  const [latestImage, setLatestImage] = useState(null);
  const fetchData = async () => {
    TokenRefresher
      .get('http://localhost:8080/api/sns/latestImage') // Axios로 API 호출
      .then((res) => {
        console.log(res.data);
        setLatestImage(res.data);
      })
      .catch((error) => {
        if (error.response) {
          const errorResponse = error.response.data;
          console.log(errorResponse);
        }
      });
  };

  const fetchDataByTag = async () => {
    if (selectedTag) {
      const encodedTag = encodeURIComponent(selectedTag); // 선택한 태그를 URL로 인코딩
      TokenRefresher
        .get(`http://localhost:8080/api/sns/latestTagImage?tag=${encodedTag}`)
        .then((res) => {
          console.log(res.data);
          setLatestImage(res.data);
          if (selectedImage) {
            // 선택한 이미지가 있으면 선택한 이미지를 null로 설정
            // 이렇게 하면 selectedTag에 변화가 생길 때마다 selectedImage가 null로 초기화됨
            // 따라서 가장 최신의 데이터가 표시됨
            selectedImage(null);
          }
        })
        .catch((error) => {
          if (error.response) {
            const errorResponse = error.response.data;
            console.log(errorResponse);
          }
        });
    }
  };


  useEffect(() => {
    // 컴포넌트가 마운트될 때 DB에서 가장 최근의 데이터를 가져오는 로직
    // const fetchData = async () => {
    //   try {
    //     const response = await TokenRefresher.get('/sns/latestImage'); // Axios로 API 호출
    //     if (response.status === 200) {
    //       const latestImageData = response.data;
    //       setLatestImage(latestImageData);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching latest image:', error);
    //   }
    //};

    if (!selectedImage) {
      // selectedImage가 없을 때만 데이터 가져오도록 설정
      fetchData();
    }
  }, [selectedImage]);

  useEffect(() => {


    fetchData();

  }, [selectedEntire]);

  useEffect(() => {
    // 선택한 태그가 변경될 때마다 데이터 다시 가져오도록 함
    fetchDataByTag();
    console.log('태그 변화 발생했을 때의 latestImage' + latestImage);
  }, [selectedTag]);


  const displayImage = selectedImage || latestImage;

  let formattedDate = '';
  if (displayImage && displayImage.createdDate) {
    const date = new Date(displayImage.createdDate);
    formattedDate = date.toISOString().split('T')[0];
  }

  console.log("displayImage: " + displayImage);
  console.log("selectedImage: " + selectedImage);
  console.log("latestImage: " + latestImage);

  return (
    <Container style={{ maxWidth: "1040px" }}>
      <Card style={{ width: '18rem', borderRadius: '100px' }}>
        {displayImage && displayImage.images && displayImage.images.map((image, index) => (
          <Card.Img
            variant="top"
            key={index}
            src={image.filepath}
            alt={`Image ${index}`}
            style={{ height: '30rem' }}
          />
        ))}
        {displayImage && (
          <Card.Body style={{ backgroundColor: '#cccccc', border: '10px solid #cccccc' }}>
            <Card.Title>

            </Card.Title>
            <Card.Text>
              {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
              <br/>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={user} alt="userAlt" style={{ width: '40px', height: '40px', marginLeft: '50px', marginRight: '20px'}} />
                <p>{displayImage.author.username}</p>
              </div>
              <br/>
              <p>{displayImage.content}</p>
              <p>{displayImage.tags}</p>
              <p>{formattedDate}</p>
            </Card.Text>
          </Card.Body>
        )}
      </Card>
    </Container>
  );


};

export default SnsDetails;