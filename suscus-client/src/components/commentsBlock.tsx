import React, { useContext, useEffect, useState } from "react";
import "../css/Comments/CommentsBlock.css";
import CommentsService from "../services/comment.service";
import { Context } from "../main";
import { PulicationComment } from "../types/types";

type CommentsBlockType = {
  publicationId: string;
};

const CommentsBlock: React.FC<CommentsBlockType> = ({ publicationId }) => {
  const { store } = useContext(Context);
  const [comments, setComments] = useState<PulicationComment[]>([]);
  const [newComment, setNewComment] = useState({
    publicationId: publicationId,
    content: "",
  });
  const [changeComment, setChangeComment] = useState<PulicationComment>(
    {} as PulicationComment
  );
  const [changeCommentId, setChangeCommentId] = useState(-1);

  const handleChangeComment = (id: number) => {
    setChangeComment(comments.filter((e) => e.id == id)[0]);
    setChangeCommentId(id);
  };

  const handlerUpdateComment = async () => {
    if (changeComment?.content?.length == 0) {
      alert("Комментарий должен соджержать символы");
    } else {
      const { data } = await CommentsService.updateComment(changeComment);
      const newComments = comments;
      newComments[
        comments.findIndex((e: PulicationComment) => e.id == changeCommentId)
      ] = data;
      setComments(newComments);
      setChangeCommentId(-1);
    }
  };

  const handlerCreateComment = async () => {
    if (newComment.content.length == 0) {
      alert("Комментарий должен соджержать символы");
    } else {
      const { data } = await CommentsService.createComment(newComment);
      newComment.content = "";
      setComments([data, ...comments]);
    }
  };

  const handleDeleteComment = async (id: string) => {
    const { data } = await CommentsService.deleteComment(id);
    setComments(comments.filter((e) => e.id != data.id));
  };

  function getTimeAgo(createdAt: Date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000); // разница в секундах
  
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);
    const months = Math.floor(diffInSeconds / 2592000); // среднее количество секунд в месяце
    const years = Math.floor(diffInSeconds / 31536000); // среднее количество секунд в году
  
    if (years > 0) {
      return `${years} г.`;
    }
    if (months > 0) {
      return `${months} мес.`;
    }
    if (days > 0) {
      return `${days} дн.`;
    }
    if (hours > 0) {
      return `${hours} ч.`;
    }
    if (minutes > 0) {
      return `${minutes} мин.`;
    }
    return `${diffInSeconds} с.`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await CommentsService.getPublicationComments(
        publicationId
      );
      setComments(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    };

    fetchData();
  }, []);

  return (
    <div className="CommentsBlock">
      <div className="create-comment-block">
        <input
          type="text"
          placeholder="Write your comment..."
          value={newComment.content}
          onChange={(e) => {
            setNewComment({
              ...newComment,
              content: e.target.value.slice(0, 200),
            });
          }}
        ></input>
        <div
          onClick={handlerCreateComment}
          className={`button-purple ${
            newComment.content.length == 0 ? "unactive" : ""
          }`}
        >
          Send
        </div>
      </div>
      <div className="comments-block-list">
        {comments.length > 0
          ? comments.map((e: PulicationComment) => {
              return (
                <div key={e.id} className="comments-block-comment">
  <div className="comments-block-comment-header">
    <div className="comments-block-comment-info">
      <p className="comments-block-username">{e.users?.username}</p>
      <p className="comments-block-creationdate">
        {e.created_at ? getTimeAgo(new Date(e.created_at)) : "Дата неизвестна"}
      </p>
    </div>
    {e.user_id == store.user.id || store.user.role == "manager" ? (
      <div className="buttons-row">
        {store.user.id == e.user_id && changeCommentId != e.id ? (
          <div onClick={() => handleChangeComment(e.id)}>Change</div>
        ) : (
          ""
        )}
        <p onClick={() => handleDeleteComment(`${e.id}`)}>X</p>
      </div>
    ) : (
      ""
    )}
  </div>

  {changeCommentId == e.id ? (
    <div className="update-comment-block">
      <input
        onChange={(e) => {
          setChangeComment({
            ...changeComment,
            content: e.target.value.slice(0, 200),
          });
        }}
        value={`${changeComment?.content}`}
      ></input>
      <button onClick={handlerUpdateComment} className="save-comment-button">
        Save
      </button>
    </div>
  ) : (
    <p className="comment-text">{e.content.slice(0, 200)}</p>
  )}
</div>

                
              );
            })
          : ""}
          
      </div>
    </div>
  );
};
export default CommentsBlock;
