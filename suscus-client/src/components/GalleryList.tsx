import { Link } from "react-router-dom";
import "../css/GallryList.css";
import { Publication } from "../types/types";
import { useState } from "react";


interface GalleryListProps {
  publications: Publication[];
  className?: string; // новый проп
}

const GalleryList: React.FC<GalleryListProps> = ({ publications, className }) => {
  return (
    <div className={`gallery-list ${className ?? ""}`}>
      {publications.map((e: Publication) => (
        <GalleryItem key={e.id} publication={e} />
      ))}
    </div>
  );
};


interface GalleryItemProps {
  publication: Publication;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ publication }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="gallery-item">
      <Link to={`/publication/${publication.id}`}>
        {!loaded && <div className="gallery-image-placeholder" />}
        <img
          className="gallery-image"
          src={publication.image_url}
          alt={publication.title}
          onLoad={() => setLoaded(true)}
          style={{ display: loaded ? "block" : "none" }}
        />
        <p className="gallery-item-title">{publication.title}</p>
      </Link>
    </div>
  );
};



export default GalleryList;