import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Импорт useParams
import "../css/Publication/PublicationPage.css";
import PublicationService from "../services/publication.service";
import CommentsBlock from "../components/commentsBlock";
import { Context } from "../main";
import { Publication } from "../types/types";

const PublicationPage = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Получение параметра id из маршрута
  const [publication, setPublication] = useState<Publication>({} as Publication);
  const [changeDiscription, setChangeDiscription] = useState(false);

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
    </div>
  );
};

export default PublicationPage;
