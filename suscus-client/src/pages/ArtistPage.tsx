import { useContext, useEffect, useState } from "react";
import "../css/AtritstPage.css";
import PublicationService from "../services/publication.service";
import GalleryList from "../components/GalleryList";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/user.service";
import OrderForm from "../components/orderForm";
import { Context } from "../main";
import { Publication, User } from "../types/types";

const ArtistPage = () => {
  const { store } = useContext(Context);
  const { id } = useParams();
  const [artist, setArtist] = useState<User>({} as User);
  const navigate = useNavigate();

  const [publications, setPublications] = useState<Array<Publication>>(
    [] as Array<Publication>
  );

  const handlerGetMyPublicationsClick = async () => {
    if (id) {
      const resp = await PublicationService.searchPublications(1, {
        artist_id: parseInt(id),
      });
      setPublications(resp.data);
    }
  };

  const handlerGetUser = async () => {
    const resp = await UserService.getUser(id);
    setArtist(resp.data);
  };

  useEffect(() => {
    handlerGetUser();
    handlerGetMyPublicationsClick();
  }, []);

  useEffect(() => {
    if (id == store.user.id.toString()) {
      navigate("/profile");
    }
  }, [store, id]);

  return (
    <div className="artist-page">
      <div className="artist-page-block">
        <div className="artist-header">
          <h2>{artist?.username ? artist.username : "no data"}</h2>
        </div>
        <div className="artist-page-content">
          <div>
            <div className="artist-top-block">
              {artist?.avatar ? (
                <img
                  className="artist-avatar"
                  src={artist.avatar}
                  alt="avatar"
                />
              ) : (
                ""
              )}
              {artist?.username ? artist.username : "no data"}
            </div>

            <div className="artist-page-buttons">
              <OrderForm id={id} />
            </div>
          </div>

          <div className="artist-gallery-block">
            {publications ? <GalleryList publications={publications} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
