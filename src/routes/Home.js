import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Bweet from "components/Bweet";
import BweetFactory from "components/BweetFactory";

const Home = ({ userObj }) => {
  const [bweets, setBweets] = useState([]);
  const bweetObj = {
    id: Date.now(),
    text: "이상한거 올리면 지울거임",
    createdAt: Date.now(),
    attachmentUrl:
      "https://cdn.ppomppu.co.kr/zboard/data3/2016/1127/m_1480256512_0JoauJI8sI.png",
  };

  useEffect(() => {
    dbService.collection("bweets").onSnapshot((snapshot) => {
      const bweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBweets(bweetArray);
    });
  }, []);

  return (
    <div>
      <BweetFactory userObj={userObj} />
      <div>
        <Bweet
          bweetObj={bweetObj}
          isOwner={false}
          isNoti={true}
          username={"- GOD -"}
        />
        {bweets.map((bweet) => (
          <Bweet
            key={bweet.id}
            bweetObj={bweet}
            isOwner={userObj && bweet.creatorId === userObj.uid}
            isNoti={false}
            username={userObj.displayName}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
