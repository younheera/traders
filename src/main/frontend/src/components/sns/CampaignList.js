/**
 * @author jeongyearim
 * @email [example@mail.com]
 * @create date 2023-10-20 11:16:53
 * @modify date 2023-10-27 11:33:01
 * @desc [CampaignDatails와 SnsManage의 상위 컴포넌트]
 */
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import TokenRefresher from "../util/TokenRefresher";
import CampaignDetails from "./CampaignDetails";
import SnsManage from "./SnsManage";
const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showExpired, setShowExpired] = useState(false);

  useEffect(() => {
    TokenRefresher.get("/sns/showCampaign")
      .then((response) => setCampaigns(response.data))
      .catch((error) => console.error("API Error:", error));
  }, []);

  // Filter campaigns based on the expiration date
  const currentDate = new Date();

  const expiredCampaigns = campaigns.filter((campaign) => {
    const dueDate = new Date(campaign.dueDate);
    return dueDate < currentDate;
  });

  const activeCampaigns = showExpired
    ? campaigns
    : campaigns.filter((campaign) => {
        const dueDate = new Date(campaign.dueDate);
        return dueDate >= currentDate;
      });

  // const { title, organizer, description, verificationMethod, tags, dueDate, createdDate } =
  //   campaigns;

  // // 캠페인 마감일
  // const campaignDueDate = new Date(dueDate);

  // // 남은 시간 계산 (밀리초로 계산)
  // const timeRemaining = campaignDueDate - currentDate;

  // // 만료 여부 확인
  // const isExpired = timeRemaining <= 0;

  return (
    <Container
      style={{
        width: "850px",
        marginTop: "180px",
        fontFamily: "Pretendard-Regular",
      }}
    >
      <div>
        <Button
          className="cancelButton-1"
          onClick={() => setShowExpired(!showExpired)}
        >
          {showExpired ? "진행 중인 캠페인" : "종료 캠페인 포함"}
        </Button>
        <Accordion defaultActiveKey="0">
          <ul style={{ listStyle: "none", padding: 0 }}>
            {activeCampaigns.map((campaign, index) => {
              const campaignDueDate = new Date(campaign.dueDate);
              const formattedDueDate = `${campaignDueDate.getFullYear()}-${(
                campaignDueDate.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${campaignDueDate
                .getDate()
                .toString()
                .padStart(2, "0")}`;

              // 남은 시간 계산 (밀리초로 계산)
              const timeRemaining = campaignDueDate - currentDate;

              // 만료 여부 확인
              const isExpired = timeRemaining <= 0;

              return (
                <li key={campaign.id}>
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>
                      <div style={{ flex: 1 }}>{campaign.title}</div>
                      {/* <div style={{ flex: 1, textAlign: 'right' }}>(기한: {formattedDueDate})</div> */}
                      {isExpired ? (
                        // <p>만료&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <Stack direction="horizontal" gap={2}>
                          <Badge bg="secondary">종료</Badge>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </Stack>
                      ) : (
                        <Stack direction="horizontal" gap={2}>
                          <Badge bg="secondary">진행 중</Badge>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </Stack>

                        // <p>진행 중&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        // `남은 시간: ${time.days}일 ${time.hours}시간 ${time.minutes}분 ${time.seconds}초`
                        // <div>
                        //   <p>남은 시간: {time.days}일 {time.hours}시간 {time.minutes}분 {time.seconds}초</p>
                        //   <ProgressBar now={percentRemaining} label={`${percentRemaining.toFixed(2)}%`} />
                        // </div>
                      )}
                      <br />
                    </Accordion.Header>
                    <Accordion.Body>
                      <CampaignDetails campaignId={campaign.id} />
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
              );
            })}
          </ul>
        </Accordion>
        <br />
        <SnsManage campaigns={campaigns} />
      </div>
    </Container>
  );
};

export default CampaignList;
