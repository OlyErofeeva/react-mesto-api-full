import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Spinner from "./Spinner";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  // const [userAuthData, setUserAuthData] = useState({
  //   email: "",
  //   _id: "", // пока не используется, но по возможности заполняется
  // });
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "#",
    email: "",
    _id: "",
  });
  const [cards, setCards] = useState([]);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  // Если закрывать поп-ап с картинкой через обнулление selectedCard, анимация закрытия будет не такой плавной: сначала из поп-апа пропадёт контент, останется "крестик" по центру экрана, потом крестик "растворится". Закрытие через isImagePopupOpen менее изящно и не так экономично (selectedCard остаётся в памяти), но нужно для визуально привычной анимации.
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [cardIdToDelete, setCardIdToDelete] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isTooltipSuccessful, setIsTooltipSuccessful] = useState(true);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsTooltipOpen(false);
  };

  const handleCardClick = ({ name, link }) => {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  };

  const handleCardLike = (cardLikes, cardId) => {
    const isLiked = cardLikes.some((like) => like._id === currentUser._id);
    const token = localStorage.getItem("token");
    api
      .changeLikeCardStatus(token, cardId, isLiked)
      .then((responseCard) => {
        const newCards = cards.map((item) =>
          item._id === cardId ? responseCard : item
        );
        setCards(newCards);
      })
      .catch((err) => alert(err));
  };

  const handleCardDelete = (cardId) => {
    setIsConfirmDeletePopupOpen(true);
    setCardIdToDelete(cardId);
  };

  const handleDeleteConfirmation = (cardId) => {
    const token = localStorage.getItem("token");
    api
      .deleteCard(token, cardId)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== cardId);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  };

  const handleUpdateUser = (newData) => {
    const token = localStorage.getItem("token");
    return api
      .editProfile(token, newData)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  };

  const handleUpdateAvatar = (newAvatarLink) => {
    const token = localStorage.getItem("token");
    return api
      .changeAvatar(token, newAvatarLink)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  };

  const handleAddPlace = (cardData) => {
    const token = localStorage.getItem("token");
    return api
      .saveCard(token, cardData)
      .then((response) => {
        const newCard = {
          _id: response._id,
          name: response.name,
          link: response.link,
          likes: response.likes,
          owner: response.owner,
        };
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  };

  const handleRegister = (email, password) => {
    auth
      .signUp(email, password)
      .then((response) => {
        setCurrentUser(response);
        setIsTooltipSuccessful(true);
        history.push("/sign-in");
      })
      .catch(() => setIsTooltipSuccessful(false))
      .finally(() => setIsTooltipOpen(true));
  };

  const handleLogin = (email, password) => {
    auth
      .signIn(email, password)
      .then((response) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          setCurrentUser({
            ...currentUser,
            email: email,
          });
          setLoggedIn(true);
        }
      })
      .catch((err) => alert(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setCurrentUser({
      name: "",
      about: "",
      avatar: "#",
      email: "",
      _id: "",
    });
    history.push("/sign-in");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .getUserInfo(token)
        .then((response) => {
          setCurrentUser(response);
          setLoggedIn(true);
        })
        .catch(() => {
          handleLogout();
          alert("Время сессии истекло. Пожалуйста, авторизуйтесь снова.");
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then((results) => {
          const userInfo = results[0];
          const initialCards = results[1];
          const items = initialCards.map((item) => ({
            _id: item._id,
            name: item.name,
            link: item.link,
            likes: item.likes,
            owner: item.owner,
          }));

          setCurrentUser(userInfo);
          setCards(items);
          setIsLoading(false);
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header userData={currentUser} handleLogout={handleLogout} />
          <Switch>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>

            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={isLoading ? Spinner : Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            ></ProtectedRoute>
          </Switch>

          {loggedIn && <Footer />}
        </div>

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isSuccessful={isTooltipSuccessful}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteConfirmation={handleDeleteConfirmation}
          cardId={cardIdToDelete}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          {...selectedCard}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
