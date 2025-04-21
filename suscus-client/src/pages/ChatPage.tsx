import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import ChatService from "../services/chat.service";
import { Chat, Message, User } from "../types/types";
import { useLocation } from "react-router-dom";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "../css/Chat/ChatPage.css";

const socket = io(import.meta.env.VITE_CHAT_WEBSOCKET_URL || "http://localhost:3000");

const ChatPage = () => {
  const { store } = useContext(Context);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [user] = useState<User>(store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chatIdFromUrl = queryParams.get("chatId");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    ChatService.getChats()
      .then((res) => {
        setChats(res.data);

        if(res.data.length >= 1)
          openChat(res.data[0])
      })
      .catch((err) => console.error("Ошибка загрузки чатов:", err));

    
  }, []);
  

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      const isCurrentChat = message.chat_id === currentChat?.id;
    
      if (isCurrentChat) {
        // Добавляем новое сообщение в открытый чат
        setMessages((prev) => [...prev, message]);
    
        // Если сообщение от собеседника — сразу помечаем как прочитанное
        if (message.sender_id !== user.id) {
          const now = new Date().toISOString();
    
          // Отмечаем как прочитанное на сервере
          ChatService.markMessagesAsRead(message.chat_id, user.id).catch(console.error);
    
          // Обновляем read_at у текущего сообщения
          message.read_at = now;
        }
      }
    
      // Обновляем список чатов
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === message.chat_id) {
            const existingMessages = chat.messages || [];
    
            // Если сообщение уже прочитано (в текущем чате), применяем это и тут
            const updatedMessage = isCurrentChat && message.sender_id !== user.id
              ? { ...message, read_at: new Date().toISOString() }
              : message;
    
            return {
              ...chat,
              messages: [...existingMessages, updatedMessage],
            };
          }
          return chat;
        })
      );
    };
    
    socket.on("newMessage", handleNewMessage);
  
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [currentChat]);

  useEffect(() => {
    if (chatIdFromUrl) {
      const chatToOpen = chats.find((chat) => chat.id == chatIdFromUrl);
      if (chatToOpen && chatToOpen.id !== currentChat?.id) {
        openChat(chatToOpen);
      }
    }
  }, [chatIdFromUrl, chats]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);
  
  const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 20">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.5 2.5 0 0 0 0-1.39l7.02-4.11A2.994 2.994 0 1 0 14 5.91L7 10a3 3 0 0 0 0 4l7 4.09a3 3 0 1 0 1.05-1.64l-7.02-4.11a2.5 2.5 0 0 0 0-1.39l7.13-4.19A2.99 2.99 0 1 0 18 16.08z"/>
    </svg>
  );
  
  const openChat = (chat: Chat) => {
    if (currentChat?.id === chat.id) return;
  
    setCurrentChat(chat);
    navigate(`/chat?chatId=${chat.id}`);
  
    ChatService.getChatHistory(chat.id)
      .then((res) => {
        setMessages(res.data);
        
        // Улучшенная отметка сообщений как прочитанных
        if (res.data.some(msg => msg.sender_id !== user.id && !msg.read_at)) {
          ChatService.markMessagesAsRead(chat.id, user.id)
  .then(() => {
    const now = new Date().toISOString();

    // Обновляем messages в текущем чате
    setMessages(prev => prev.map(msg => 
      msg.sender_id !== user.id && !msg.read_at 
        ? { ...msg, read_at: now } 
        : msg
    ));

    // Обновляем сообщения в списке чатов
    setChats(prevChats =>
      prevChats.map(chatItem =>
        chatItem.id === chat.id
          ? {
              ...chatItem,
              messages: (chatItem.messages || []).map(msg =>
                msg.sender_id !== user.id && !msg.read_at
                  ? { ...msg, read_at: now }
                  : msg
              ),
            }
          : chatItem
      )
    );
  })
  .catch(err => console.error("Ошибка:", err));

        }
      })
      .catch((err) => console.error("Ошибка:", err));
  
    socket.emit("joinChat", { chatId: chat.id });
  };
  
  const parseStyledText = (text: string) => {
    const escapeHtml = (str: string) =>
      str.replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;");
  
    const escaped = escapeHtml(text);
  
    const withBold = escaped.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
    const withItalic = withBold.replace(/_(.*?)_/g, "<em>$1</em>");
    
    return withItalic;
  };
  
  
  const renderMessageText = (text: string) => {
    const isShare = text.startsWith("::share::");
    const cleanedText = isShare ? text.replace("::share::", "") : text;
  
    const publicationRegex = /https?:\/\/[^ ]*\/publication\/(\d+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
  
    while ((match = publicationRegex.exec(cleanedText)) !== null) {
      const [url, id] = match;
      const start = match.index;
  
      if (start > lastIndex) {
        const styled = parseStyledText(cleanedText.slice(lastIndex, start));
        parts.push(<span key={lastIndex} dangerouslySetInnerHTML={{ __html: styled }} />);
      }
  
      parts.push(
        <Link key={start} to={`/publication/${id}`} className="message-link">
          {ShareIcon()} {url}
        </Link>
      );
  
      lastIndex = start + url.length;
    }
  
    if (lastIndex < cleanedText.length) {
      const styled = parseStyledText(cleanedText.slice(lastIndex));
      parts.push(<span key={lastIndex} dangerouslySetInnerHTML={{ __html: styled }} />);
    }
  
    const content = parts.map((part, i) => <span key={i}>{part}<br /></span>);
  
    return isShare ? (
      <div className="shared-container">
        <strong>🔗 Поделились публикацией:</strong>
        <div className="shared-body">{content}</div>
      </div>
    ) : content;
  };
  
  
  
  const sendMessage = () => {
    if (currentChat && text.trim()) {
      const newMessage: Message = {
        id: Date.now(), 
        chat_id: currentChat.id,
        sender_id: user.id,
        text,
        created_at: new Date().toISOString(),
        read_at: null,
      };
  
      // socket.emit без локального добавления в messages — ждём сервер
      socket.emit("sendMessage", {
        chatId: currentChat.id,
        senderId: user.id,
        text,
      });
  
      // Обновим отображение последнего сообщения в списке чатов
      setChats(prevChats =>
        prevChats.map(chat => {
          if (chat.id === currentChat.id) {
            const updatedMessages = [...(chat.messages || []), newMessage];
            return { ...chat, messages: updatedMessages };
          }
          return chat;
        })
      );
  
      setText("");
    }
  };
  


  return (
    <div className="chat-page">
      <div className="chat-list">
        <h3>Чаты</h3>
        <ul>
          {chats?.length > 0 ? (
            [...chats]
            .sort((a, b) => {
              const lastA = a.messages?.[a.messages.length - 1]?.created_at;
              const lastB = b.messages?.[b.messages.length - 1]?.created_at;
              return new Date(lastB || 0).getTime() - new Date(lastA || 0).getTime();
            })
            .map((chat) => {
              const unread = chat.messages?.some(
                (msg) => msg.sender_id !== user.id && !msg.read_at
              );
              const unreadCount = chat.messages?.filter(
                (msg) => msg.sender_id !== user.id && !msg.read_at
              ).length || 0;
              const isClient = chat.client_id === user.id;
              const interlocutor = isClient ? chat.artist : chat.client;
              const lastMessage = chat.messages?.length > 0 ? chat.messages[chat.messages.length - 1] : null;

              return (
                <li 
                  key={chat.id} 
                  onClick={() => openChat(chat)} 
                  className={`${currentChat?.id === chat.id ? "active" : ""} ${unread ? "unread" : ""}`}
                >
                  <div className="chat-item">
                  {interlocutor?.avatar ? (
                      <img src={interlocutor.avatar} alt="Аватар" className="chat-avatar" />
                    ) : (
                      <div className="chat-avatar placeholder"></div>
                    )}
                    <div className="chat-info">
                      <span className="chat-name">
                        {interlocutor?.username}
                        {unreadCount > 0 && (
                          <span className="unread-badge">{unreadCount}</span>
                        )}
                      </span>
                      {lastMessage && (
                        <span className="chat-last-message">
                        {lastMessage.text.length > 25 ? `${lastMessage.text.slice(0, 25)}...` : lastMessage.text}
                      </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Чатов пока нет</p>
          )}
        </ul>
      </div>

      <div className="chat-window">
        {currentChat ? (
          <>
            <h3>{currentChat.client_id === user.id ? currentChat.artist.username : currentChat.client.username}</h3>
            <div className="messages">
              {messages?.length > 0 ? (
                messages.map((msg: Message, index) => (
                  <div key={index} className={`message ${msg.sender_id === user.id ? "sent" : "received"}`}>
                    <div className="message-info">
                      <strong>
                        {msg.sender_id === user.id ? "Вы" : currentChat?.client_id === user.id ? currentChat?.artist?.username : currentChat?.client?.username}
                      </strong>
                      <span>
                        {msg.created_at ? new Date(msg.created_at).toLocaleString() : "Дата неизвестна"}
                      </span>
                    </div>
                    <div className="message-text">
                            {renderMessageText(msg.text)}
                          </div>

                  </div>
                ))
              ) : (
                <p>Нет сообщений</p>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="message-input">
            <input
              type="text"
              value={text}
              maxLength={250}    
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            />
              <button onClick={sendMessage} disabled={!text.trim()}>
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
