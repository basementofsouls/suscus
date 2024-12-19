import { Link } from "react-router-dom";
import "../css/GallryList.css";
import { Publication } from "../models/response/Publicatinos.response";

interface GalleryListProps {
  publications: Publication[];
}

const GalleryList: React.FC<GalleryListProps> = ({ publications }) => {
  return (
    <div className="gallery-list">
      {publications
        ? publications.map((e: Publication) => {
            return (
              <div key={e.id} className="gallery-item">
                <Link to={`/publication/${e.id}`}>
                  <img className="gallery-image" src={e.image_url} />
                  <p className="gallery-item-title">{e.title}</p>
                  {/*
                    <p>{e.artist_id}</p>
                    <p>{e.category_id}</p>
                    <p>{e.created_at}</p>
                    <p>{e.description}</p>
                    <p>{e.id}</p>
                    <p>{e.updated_at}</p>
                   */}
                </Link>
              </div>
            );
          })
        : ""}
    </div>
  );
};
export default GalleryList;
