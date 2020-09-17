import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Bweet from "components/Bweet";

const Home = ({ userObj }) => {
  const [bweet, setBweet] = useState("");
  const [bweets, setBweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    dbService.collection("bweets").onSnapshot((snapshot) => {
      const bweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBweets(bweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${Date.now()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const bweetObj = {
      text: bweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("bweets").add(bweetObj);
    setBweet("");
    setAttachment("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setBweet(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={bweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Bweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {bweets.map((bweet) => (
          <Bweet
            key={bweet.id}
            bweetObj={bweet}
            isOwner={bweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
