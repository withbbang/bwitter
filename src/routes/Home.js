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
      "https://firebasestorage.googleapis.com/v0/b/bwitter-4a489.appspot.com/o/angry%20frog.jpg?alt=media&token=2c02adfd-1c2f-45c8-9009-058c6a8d912b",
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
