import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Импорт useParams
import "../css/PublicationPage.css";
import { Publication } from "../models/response/Publicatinos.response";
import PublicationService from "../services/publication.service";

const PublicationPage = () => {
  const { id } = useParams<{ id: string }>(); // Получение параметра id из маршрута
  const [publication, setPublication] = useState<Publication[]>(
    [] as Publication[]
  );

  useEffect(() => {
    const getPublication = async () => {
      if (id && !isNaN(Number(id))) {
        // Если id существует и это число
        const resp = await PublicationService.getPublicationById(Number(id));
        console.log(resp);
        setPublication(resp.data[0]);

        //подгрузка комментариев
      }
    };

    getPublication();
  }, [id]); // Добавлено id в зависимости useEffect

  return (
    <div className="main-page">
      <div>
        <p>{publication.title}</p>
      </div>
      <div className="main-page-block">
        {publication ? (
          <div>
            <img src={publication.image_url} alt={publication.title} />
            <div>
              <p>{publication.title}</p>
              <p>{publication.description}</p>
            </div>
          </div>
        ) : (
          "No publication found"
        )}
      </div>
    </div>
  );
};

export default PublicationPage;
