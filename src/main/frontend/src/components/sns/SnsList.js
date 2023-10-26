import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
//import './css/SnsList.css';
import '../../assets/css/SnsList.css'

const SnsList = ({ posts, onImageClick, selectedTag }) => {

  // const dividePosts = (posts) => {
  //   const arr = [...posts];
  //   const tmp = [];
  //   while (arr.length > 0) {
  //     tmp.push(arr.splice(0, 3)); // 한 번에 3개의 이미지를 행으로 추가
  //   }
  //   return tmp;
  // };

  const [sortedPosts, setSortedPosts] = useState([]);

  const handleMouseOver = (event) => {
    const imageOverlay = event.currentTarget.querySelector('.image-overlay');
    const banner = event.currentTarget.querySelector('.banner');

    if (imageOverlay && banner) {
      imageOverlay.style.display = 'block';
      banner.style.filter = 'blur(3px)'; // 이미지에 블러 효과 추가
    }
  };

  const handleMouseOut = (event) => {
    const imageOverlay = event.currentTarget.querySelector('.image-overlay');
    const banner = event.currentTarget.querySelector('.banner');

    if (imageOverlay && banner) {
      imageOverlay.style.display = 'none';
      banner.style.filter = 'none'; // 블러 효과 제거
    }
  };

  const filterImagesByTag = (posts, tag) => {
    if (!tag) {
      return posts; // 모든 포스트를 반환
    }

    return posts.filter((post) => post.tags === tag);
  };

  useEffect(() => {
    // 게시물을 createdDate 기준으로 최신 순으로 정렬
    const newSortedPosts = posts.slice().sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);
      return dateB - dateA; // 내림차순 정렬 (최신 순)
    });
    setSortedPosts(newSortedPosts);

    // 확인을 위한 로그
    console.log("useEffect in SnsList executed");
    console.log(posts);
  }, [posts]);

  const chunkSize = 3;
  const imageGroups = [];
  for (let i = 0; i < posts.length; i += chunkSize) {
    imageGroups.push(filterImagesByTag(sortedPosts, selectedTag).slice(i, i + chunkSize));
  }

  return (
    <Container style={{ maxWidth: "1040px" }}>
      <div>
        {imageGroups.map((group, groupIndex) => (
          <Row key={groupIndex} noGutters>
            {/* {filterImagesByTag(group, selectedTag).map((post, postIndex) => ( */}
            {group.map((post, postIndex) => (
              post.images.map((image, imageIndex) => (
                <Col xs={12} md={4} key={imageIndex} className="px-0">
                  <div
                    onClick={() => onImageClick(post)}
                    style={{
                      width: '100%',
                      paddingBottom: '100%',
                      position: 'relative',
                    }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <Image
                      className="banner"
                      src={image.filepath}
                      rounded
                      alt={`Image ${imageIndex}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                    <div className="image-overlay" style={{ display: 'none' }}>
                      <div className="banner-txt" style={{ fontSize: '14px' }}>{post.tags}</div>
                    </div>
                  </div>
                </Col>
              ))
            ))}
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default SnsList;
