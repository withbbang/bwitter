import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { defaultAuth } from "fbase";

const Bweet = ({ bweetObj, isOwner, isNoti }) => {
  const [editing, setEditing] = useState(false);
  const [newBweet, setNewBweet] = useState(bweetObj.text);
  const [username, setUsername] = useState('-')

  useEffect(() => {
    getCreator()
  }, [])

  const getCreator = async () => {
    if(bweetObj.creatorId){
      try{
        const creator = await defaultAuth.getUser(bweetObj.creatorId)
      }catch(e){
        console.log(e)
      }
      // setUsername(creator.displayName)
    }
  }

  const formatDate = (date) => {
    const _date = new Date(date);
    const minute =
      _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
    return (
      _date.getFullYear() +
      "-" +
      (_date.getMonth() + 1) +
      "-" +
      _date.getDate() +
      " " +
      _date.getHours() +
      ":" +
      minute
    );
  };

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
    <div className="bweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container bweetEdit">
            <input
              type="text"
              placeholder="Edit your bweet"
              value={newBweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Bweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          {" "}
          <h4>{bweetObj.text}</h4>
          <div className="bweet__info__box">
            <div>{isNoti ? "< Notice >" : formatDate(bweetObj.createdAt)}</div>
            <div className="bweet__owner">{bweetObj.creatorId ? !bweetObj.displayName ? bweetObj.displayName : "-" : "Administer"}</div>
          </div>
          {bweetObj.attachmentUrl && <img src={bweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="bweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Bweet;
