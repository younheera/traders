/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-10-06 17:44:23
 * @modify date 2023-10-12 11:38:13
 * @desc [환경 관련 뉴스기사 출력]
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewsList() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    // 뉴스 데이터를 가져오는 요청
    axios.get('/api/sns/showNews')
      .then((response) => {
        setNewsList(response.data);
      })
      .catch((error) => {
        console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
      });
  }, []);

  return (
    <div>
      <h1>뉴스 목록</h1>
      <ul>
        {newsList.map((news, index) => (
          <li key={index}>
            <div>
              <img src={news.imageUrl} alt={news.articleTitle} />
            </div>
            <div>
              <h2>{news.articleTitle}</h2>
              <p>{news.summaryTitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsList;
