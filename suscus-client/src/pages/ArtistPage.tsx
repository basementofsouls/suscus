import { useEffect, useState } from "react";
import "../css/ProfilePage.css";
import PublicationService from "../services/publication.service";
import { Publication } from "../models/response/Publicatinos.response";
import { observer } from "mobx-react-lite";
import GalleryList from "../components/GalleryList";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import OrderForm from "../components/orderForm";

const ArtistPage = () => {
  const { id } = useParams();

  const [publications, setPublications] = useState<Array<Publication>>(
    [] as Array<Publication>
  );

  const [artist, setArtist] = useState();

  const handlerGetMyPublicationsClick = async () => {
    const resp = await PublicationService.searchPublications(1, {
      artist_id: id,
    });
    setPublications(resp.data);
  };

  const handlerGetUser = async () => {
    const resp = await UserService.getUser(id);
    setArtist(resp.data);
  };

  useEffect(() => {
    handlerGetUser();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-page-block">
        <div className="profile-header">
          <h2>Artist Page </h2>
        </div>
        <div className="profile-page-content">
          <div className="profile-top-block">
            {artist?.avatar ? (
              <img
                className="profile-avatar"
                src={artist.avatar}
                alt="avatar"
              />
            ) : (
              ""
            )}
            {artist?.username ? artist.username : "no data"}

            <div>
              <button onClick={handlerGetMyPublicationsClick}>Portfolio</button>
            </div>
          </div>

          <div className="profile-gallery-block">
            {publications ? <GalleryList publications={publications} /> : ""}
            <OrderForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ArtistPage);
