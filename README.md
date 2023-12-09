
# 🍃 Traders
자바핀테크양성과정 파이널 프로젝트

스프링부트 + REACT + JSP 중고거래플랫폼 사이트

## ✨ 프로젝트 소개
### New Earth, New Us, Traders
- TRADERS는 인근 지역 사람들 간의 직거래 활성화를 유도하는 **중고거래플랫폼** 사이트입니다.
- 유저 간 **실시간 채팅**을 통해 자원순환형 환경친화적 거래 'ECO-TRADE'를 선도합니다.
- 온라인 거래 특성 상 발생하는 택배거래에 수반되는 **불필요한 자원 낭비**를 **지양**하는 것을 목적으로 합니다.
<br/>

## ⏰ 개발 기간
2023년 9월 20일 ~ 2023년 10월 31일
<br/>
<br/>
## 🛠 기능 요약
웹 사이트 유저는 자신의 현재 위치를 기반, 인근에 있는 중고물품검색하여 실시간 채팅을 통한 거래 가능
<br/>
<br/>
## 📚 기술 스택
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![ElasticSearch](https://img.shields.io/badge/-ElasticSearch-005571?style=for-the-badge&logo=elasticsearch)

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

<br/>
<br/>

## 🛠️ 기술적 의사결정(아키텍쳐 도입 배경)

<br/>
<br/>

## 🖥️ 핵심기능
### 📌 회원가입/로그인
- Spring Security + JWT 토큰을 이용한 회원가입 / 로그인
- SMTP API를 이용 이메일 인증번호 발송
- HS512 양방향(대칭키) 해싱 알고리즘을 이용한 토큰 암호화
- react hook form 이용 유효성 검사
- interceptors 이용 자동 토큰만료상태 검사 및 Refresh 토큰 재발급
### 📌 실시간 채팅
- Springboot를 사용해 Restful API 엔드포인트 구현
- SSE 서버로 DB와 클라이언트 연결 관리 + React로 실시간 채팅 메시지 동적으로 구현
- MongoDB로 사용자 정보와 채팅 메시지 저장
### 📌 통합검색
- Logstash를 이용하여 Oracle DB와 연
### 📌 Redis Repository 구축
- Refresh Token 저장
- 상품 찜 기능
### 📌 물품 조회/등록/수정/삭제
### 📌 JPA repository를 이용한 crud 구현
### 📌 마이페이지
- 그린페이 충전
- 계좌 환급(송금)
- 찜 조회
- 등록한 물품 조회
- 출석체크 이벤트
  
<br/>
<br/>

## 👩‍💻 멤버 구성
| 이름       | 담당 역할                  |
| ---------- | -------------------------- | 
| 이휘성(팀장)| 물품 CRUD / 통합검색 / 실시간 알림 / 찜 기능 / 출석체크 이벤트 / 전체 백엔드 연결 / 예외처리|
| 강현슬| 실시간 채팅 / 출석체크 이벤트 / 카카오 지도 API 이용 맵 구현 / 웹 사이트 전체 및 상세 FE + CSS 담당|
| 윤희라| 회원가입 및 로그인 / 마이페이지 / 랜덤 포인트 이벤트/ 웹 사이트 전체 및 상세 FE + CSS 담당|
| 이아라| 금융결제원 API 이용 목서버 구현 결제|
| 정예림| 캠페인|



    
