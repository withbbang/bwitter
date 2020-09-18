import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Bweet = ({ bweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newBweet, setNewBweet] = useState(bweetObj.text);

  const formatDate = (date) => {
    const _date = new Date(date);
    return (
      _date.getFullYear() +
      "-" +
      (_date.getMonth() + 1) +
      "-" +
      _date.getDate() +
      " " +
      _date.getHours() +
      ":" +
      _date.getMinutes()
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
            <div>{formatDate(bweetObj.createdAt)}</div>
            <div className="bweet__owner">{bweetObj.username}</div>
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
