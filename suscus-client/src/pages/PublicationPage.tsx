import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Импорт useParams
import "../css/Publication/PublicationPage.css";
import { io } from "socket.io-client";
import PublicationService from "../services/publication.service";
import ChatService from "../services/chat.service";
import CommentsBlock from "../components/commentsBlock";
import { Context } from "../main";
import { Publication } from "../types/types";
import { Chat, Message, User } from "../types/types";

const PublicationPage = () => {
  const socket = io(import.meta.env.VITE_CHAT_WEBSOCKET_URL || "http://localhost:3000");

  const { store } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Получение параметра id из маршрута
  const [publication, setPublication] = useState<Publication>({} as Publication);
  const [changeDiscription, setChangeDiscription] = useState(false);

  const [showChatSelect, setShowChatSelect] = useState(false);
const [userChats, setUserChats] = useState<Chat[]>([]);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 20">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.5 2.5 0 0 0 0-1.39l7.02-4.11A2.994 2.994 0 1 0 14 5.91L7 10a3 3 0 0 0 0 4l7 4.09a3 3 0 1 0 1.05-1.64l-7.02-4.11a2.5 2.5 0 0 0 0-1.39l7.13-4.19A2.99 2.99 0 1 0 18 16.08z"/>
  </svg>
);

useEffect(() => {
  if (showChatSelect) {
    ChatService.getChats()
      .then((res) => setUserChats(res.data))
      .catch((err) => console.error("Ошибка загрузки чатов:", err));
  }
}, [showChatSelect]);

const handleShare = (chatId: number) => {
  const messageText = `🖼️*${publication.title}* — _Author:_ ${publication.users?.username}`;
  const publicationLink = `${window.location.origin}/publication/${publication.id}`;
  const publicationDesc = `_${publication.description}_`

  const shareMessage = `::share::${messageText}\n${publicationLink}\n${publicationDesc}`;

  socket.emit("sendMessage", {
    chatId,
    senderId: store.user.id,
    text: shareMessage,
  });

  setShowChatSelect(false);
};



  const handlerUpdatePublication = async () => {
    await PublicationService.updatePublication(publication);
    setChangeDiscription(false);
  };
  
  const handlerDeletePublication = async () => {
    if (id) await PublicationService.deletePublication(id);
    navigate("/gallery");
  };

  useEffect(() => {
    const getPublication = async () => {
      if (id && !isNaN(Number(id))) {
        // Если id существует и это число
        const resp = await PublicationService.getPublicationById(Number(id));
        setPublication(resp.data[0]);
      }
    };

    getPublication();
  }, [id]); // Добавлено id в зависимости useEffect

  return (
    <div className="publication-page">
      {publication ? (
        <>
          <div className="publication-page-header">
            <p className="publication-title">{publication.title}</p>
            {store.user.id && (
                <button className="share-btn"  onClick={() => setShowChatSelect(true)}>
                {ShareIcon()}
                <span>Поделиться</span>
              </button>
)}
          </div>
          <div className="publication-page-block">
            <div className="publication-page-column">
              <img
                src={publication.image_url}
                alt={publication.title}
                className="publication-page-image"
              />
            </div>
            <div className="publication-page-column">
              <div className="publication-page-comments">
                {id ? <CommentsBlock publicationId={id} /> : ""}
              </div>
            </div>
          </div>
          <div>
            <div className="publication-page-footer">
              <div className="publication-page-footer-row">
                <Link to={`${"/artist/" + publication.artist_id}`} className="publication-artist-link">
                  {publication.users?.username} 
                </Link>
                {publication.artist_id == store.user.id ? (
                  <div
                    className="publication-edit-button"
                    onClick={() => {
                      setChangeDiscription(true);
                    }}
                  >
                    Изменить
                  </div>
                ) : (
                  ""
                )}
                {changeDiscription ? (
                  <p className="publication-save-button" onClick={handlerUpdatePublication}>Сохранить</p>
                ) : (
                  ""
                )}

                {publication.artist_id == store.user.id || store.user.role == "manager" ? (
                  <p className="publication-delete-button" onClick={handlerDeletePublication}>Удалить</p>
                ) : (
                  ""
                )}
              </div>
              {changeDiscription ? (
                <textarea
                  className="publication-edit-description"
                  value={publication.description}
                  onChange={(e) => {
                    setPublication({
                      ...publication,
                      description: e.target.value.slice(0, 200),
                    });
                  }}
                />
              ) : (
                <p className="publication-page-description">
                  {publication?.description?.slice(0, 200) || "Описание недоступно"}
                </p>
              )}
              <p></p>
            </div>
          </div>
        </>
      ) : (
        <p className="no-publication-found">No publication found</p>
      )}
      {showChatSelect && (
  <div className="modal-overlay" onClick={() => setShowChatSelect(false)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h3>Выберите чат</h3>
      <ul className="chat-select-list">
        {userChats.map((chat) => {
          const isClient = chat.client_id === store.user.id;
          const interlocutor = isClient ? chat.artist : chat.client;

          return (
            <li key={chat.id} onClick={() => handleShare(chat.id)}>
              {interlocutor?.username}
            </li>
          );
        })}
      </ul>
    </div>
  </div>
)}

    </div>
  );
};

export default PublicationPage;
