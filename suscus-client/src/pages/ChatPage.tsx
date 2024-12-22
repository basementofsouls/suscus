import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import ChatService from "../services/chat.service";
import { Chat, Message, User } from "../types/types";
import { Context } from "../main";

const socket = io(
  import.meta.env.VITE_CHAT_WEBSOCKET_URL || "http://localhost:3000"
);

const ChatPage = () => {
  const { store } = useContext(Context);
  const [chats, setChats] = useState<Chat[]>([]); // Список чатов
  const [currentChat, setCurrentChat] = useState<Chat>({} as Chat); // Текущий чат
  const [messages, setMessages] = useState<Message[]>([]); // Сообщения текущего чата
  const [text, setText] = useState("");
  const [user] = useState<User>(store.user); // Текущий пользователь

  const [newChat, setNewChat] = useState({ clientId: "", artistId: "" }); // Данные для создания нового чата

  useEffect(() => {
    ChatService.getChats().then((res) => {
      setChats(res.data);
    });

    // Обработка новых сообщений
    socket.on("newMessage", (message) => {
      if (currentChat && message.chat_id === currentChat.id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [currentChat]);

  const openChat = (chat: Chat) => {
    setCurrentChat(chat);

    // Загрузка истории сообщений
    ChatService.getChatHistory(chat.id).then((res) => {
      setMessages(res.data);
    });

    // Подключаемся к чату через WebSocket
    socket.emit("joinChat", {
      clientId: store.user.id,
      artistId: chat.artist_id,
    });
  };

  const createChat = async () => {
    if (!newChat.artistId) return;
    await ChatService.createChat({
      clientId: store.user.id,
      artistId: parseInt(newChat.artistId),
    }).then((res) => {
      setChats((prev) => [...prev, res.data]);
      setNewChat({ clientId: "", artistId: "" });
    });
  };

  const sendMessage = () => {
    if (currentChat) {
      socket.emit("sendMessage", {
        chatId: currentChat.id,
        senderId: user.id,
        text,
      });
      setText("");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Список чатов слева */}
      <div
        style={{ width: "30%", borderRight: "1px solid #ccc", padding: "10px" }}
      >
        <h3>Чаты</h3>
        <ul>
          {chats.map((chat: Chat) => (
            <li
              key={chat.id}
              style={{
                cursor: "pointer",
                backgroundColor:
                  currentChat?.id === chat.id ? "#f0f0f0" : "transparent",
              }}
              onClick={() => openChat(chat)}
            >
              Чат {chat.id} ({chat.client_id} ↔ {chat.artist_id})
            </li>
          ))}
        </ul>

        {/* Создание нового чата */}
        <div style={{ marginTop: "20px" }}>
          <h4>Создать чат</h4>
          <input
            type="number"
            placeholder="ID артиста"
            value={newChat.artistId}
            onChange={(e) =>
              setNewChat({ ...newChat, artistId: e.target.value })
            }
            style={{ width: "100%", marginBottom: "5px" }}
          />
          <button onClick={createChat} style={{ width: "100%" }}>
            Создать чат
          </button>
        </div>
      </div>

      {/* Окно чата */}
      <div style={{ width: "70%", padding: "10px" }}>
        {currentChat ? (
          <>
            <h3>Чат с ID {currentChat.id}</h3>
            <div
              style={{
                height: "70%",
                overflowY: "auto",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              {messages.map((msg: any, index) => (
                <div
                  key={index}
                  style={{
                    padding: "10px",
                  }}
                >
                  <p
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <p>
                      <strong>
                        {msg.sender_id === user.id ? "Вы" : "Другой"}
                      </strong>{" "}
                    </p>
                    <p
                      style={{
                        opacity: "0.5",
                      }}
                    >
                      {msg.created_at}
                    </p>
                  </p>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: "80%", marginRight: "10px" }}
              />
              <button
                onClick={sendMessage}
                className={`${text.length > 0 ? "" : "unactive"}`}
              >
                Отправить
              </button>
            </div>
          </>
        ) : (
          <p>Выберите чат слева</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
