import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Bweet = ({ bweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newBweet, setNewBweet] = useState(bweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete thie bweet?");

    if (ok) {
      await dbService.doc(`bweets/${bweetObj.id}`).delete();
      await storageService.refFromURL(bweetObj.attachmentUrl).delete();
    } else {
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`bweets/${bweetObj.id}`).update({
      text: newBweet,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewBweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your bweet"
              value={newBweet}
              required
              onChange={onChange}
            />
            <button onClick={toggleEditing}>Cancel</button>
            <input type="submit" value="Update Bweet" />
          </form>
        </>
      ) : (
        <>
          {" "}
          <h4>{bweetObj.text}</h4>
          {bweetObj.attachmentUrl && (
            <img src={bweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Bweet</button>
              <button onClick={toggleEditing}>Edit Bweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Bweet;
