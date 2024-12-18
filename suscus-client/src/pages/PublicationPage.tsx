import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Импорт useParams
import "../css/PublicationPage.css";
import { Publication } from "../models/response/Publicatinos.response";
import PublicationService from "../services/publication.service";
import CommentsBlock from "../components/commentsBlock";
import { Context } from "../main";

const PublicationPage = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Получение параметра id из маршрута
  const [publication, setPublication] = useState<Publication>(
    {} as Publication
  );

  const handlerUpdatePublication = async () => {
    const { data } = PublicationService.updatePublication(publication);
    console.log(data);
  };
  const handlerDeletePublication = async () => {
    const { data } = PublicationService.deletePublication(id);
    if (data.id > 0) {
      navigate("/gallery");
    }
  };

  useEffect(() => {
    const getPublication = async () => {
      if (id && !isNaN(Number(id))) {
        // Если id существует и это число
        const resp = await PublicationService.getPublicationById(Number(id));
        setPublication(resp.data[0]);

        //подгрузка комментариев
      }
    };

    getPublication();
  }, [id]); // Добавлено id в зависимости useEffect

  return (
    <div className="main-page">
      {publication ? (
        <div>
          <div>
            <p>{publication.title}</p>
          </div>
          <div className="main-page-block">
            <div>
              <img src={publication.image_url} alt={publication.title} />
              {publication.artist_id || store.user.role == "moderator" ? (
                <p onClick={handlerDeletePublication}>Удалить</p>
              ) : (
                ""
              )}
              {publication.artist_id ? (
                <p onClick={handlerUpdatePublication}>Изменить</p>
              ) : (
                ""
              )}
              <div>
                <p>{publication.title}</p>
                <p>{publication.description}</p>
                <Link to={`${"/artist/" + publication.artist_id}`}>
                  Artist Profile
                </Link>
              </div>
              <CommentsBlock publicationId={id} />
            </div>
          </div>
        </div>
      ) : (
        "No publication found"
      )}
    </div>
  );
};

export default PublicationPage;
