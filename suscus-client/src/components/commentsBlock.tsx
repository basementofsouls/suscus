import { useContext, useEffect, useState } from "react";
import "../css/CommentsBlock.css";
import CommentsService from "../services/comment.service";
import { Context } from "../main";

const CommentsBlock = ({ publicationId }) => {
  const { store } = useContext(Context);
  const [comments, setComments] = useState<Array<any>>([]);
  const [newComment, setNewComment] = useState({
    publicationId: publicationId,
    text: "",
  });
  const [changeComment, setChangeComment] = useState("");
  const [changeCommentId, setChangeCommentId] = useState(-1);

  const handleChangeComment = (id) => {
    setChangeComment(comments.filter((e) => e.id == id)[0]);
    setChangeCommentId(id);
  };

  const handlerUpdateComment = async () => {
    const { data } = await CommentsService.updateComment(changeComment);
    const newComments = comments;
    newComments[comments.findIndex((e) => e.id == changeCommentId)] = data;
    setComments(newComments);
    setChangeCommentId(-1);
  };

  const handlerCreateComment = async () => {
    const { data } = await CommentsService.createComment(newComment);
    setComments([...comments, data]);
  };

  const handleDeleteComment = async (id: any) => {
    const { data } = await CommentsService.deleteComment(id);
    setComments(comments.filter((e) => e.id != data.id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await CommentsService.getPublicationComments(
        publicationId
      );
      setComments(data);
    };

    fetchData();
  }, []);

  return (
    <div className="CommentsBlock">
      <div className="create-comment-block">
        <input
          type="text"
          placeholder="comment"
          onChange={(e) => {
            setNewComment({ ...newComment, text: e.target.value });
          }}
        ></input>
        <div onClick={handlerCreateComment}>Create</div>
      </div>
      <div className="comments-block-list">
        {comments.length > 0
          ? comments.map((e: any) => {
              return (
                <div key={e.id} className="comments-block-comment">
                  <div className="comments-block-comment-row">
                    <p>id:{e.user_id}</p>
                    {e.user_id == store.user.id ||
                    store.user.role == "moderator" ? (
                      <div className="buttons-row">
                        {store.user.id == e.user_id &&
                        changeCommentId != e.id ? (
                          <div
                            onClick={() => {
                              handleChangeComment(e.id);
                            }}
                          >
                            change
                          </div>
                        ) : (
                          ""
                        )}
                        <p
                          onClick={() => {
                            handleDeleteComment(e.id);
                          }}
                        >
                          X
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {changeCommentId == e.id ? (
                    <div>
                      <input
                        onChange={(e) => {
                          setChangeComment({
                            ...changeComment,
                            content: e.target.value,
                          });
                        }}
                        value={`${changeComment?.content}`}
                      ></input>
                      <div onClick={handlerUpdateComment}>Save</div>
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
