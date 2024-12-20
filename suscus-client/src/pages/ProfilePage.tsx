import { useContext, useEffect, useState } from "react";
import "../css/ProfilePage.css";
import { Context } from "../main";
import PublicationService from "../services/publication.service";
import { Publication } from "../models/response/Publicatinos.response";
import CreatePublicationForm from "../components/CreatePublicationForm";
import { observer } from "mobx-react-lite";
import GalleryList from "../components/GalleryList";

const ProfilePage = () => {
  const { store } = useContext(Context);

  const [user, setUser] = useState(store.user);

  useEffect(() => {
    setUser(store.user);
  }, [store.user]);

  const [publications, setPublications] = useState<Array<Publication>>(
    [] as Array<Publication>
  );

  const handlerGetMyPublicationsClick = async () => {
    const resp = await PublicationService.searchPublications(1, {
      artist_id: store.user.id,
    });
    setPublications(resp.data);
  };

  const handlerBeArtistClick = async () => {
    await store.update({ role: "artist" });
  };

  const handlerLogoutClick = async () => {
    await store.logout();
  };

  useEffect(() => {}, []);

  return (
    <div className="profile-page">
      <div className="profile-page-block">
        <div className="profile-header">
          <button onClick={handlerLogoutClick}>logout</button>
        </div>
        <div className="profile-page-content">
          <div>
            <div className="profile-top-block">
              {user?.avatar ? (
                <img
                  className="profile-avatar"
                  src={user.avatar}
                  alt="avatar"
                />
              ) : (
                ""
              )}

              <div className="profile-top-block-right-column">
                {user?.username ? user.username : "no data"}

                {user.role === "user" ? (
                  <button onClick={handlerBeArtistClick}>BeArtist</button>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="profile-page-buttons">
              <button onClick={handlerGetMyPublicationsClick}>
                MyPortfolio
              </button>

              {user.role != "user" ? (
                <button onClick={handlerBeArtistClick}>BeArtist</button>
              ) : (
                ""
              )}

              {user.role === "artist" ? <CreatePublicationForm /> : ""}
            </div>
          </div>

          <div className="profile-gallery-block">
            {publications ? <GalleryList publications={publications} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ProfilePage);
