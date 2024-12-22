export type Category = {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
};

export type PulicationComment = {
  id: number;
  user_id: number;
  publication_id: number;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  publication?: Publication;
  user?: User;
};

export type Order = {
  id: number;
  user_id: number;
  artist_id: number;
  reference?: string;
  description?: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  user_order_artist?: User;
  user_order_client?: User;
};

export type Publication = {
  id: number;
  artist_id: number;
  title: string;
  image_url: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  comments?: Comment[];
  artist?: User;
  publication_categories?: PublicationCategory[];
};

export type PublicationCategory = {
  id: number;
  publication_id: number;
  category_id: number;
  created_at?: Date;
  updated_at?: Date;
  publication?: Publication;
  category?: Category;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
  comments?: Comment[];
  orders_as_artist?: Order[];
  orders_as_client?: Order[];
  publications?: Publication[];
  chats_as_client?: Chat[];
  chats_as_artist?: Chat[];
  messages?: Message[];
};

export type Chat = {
  id: number;
  client_id: number;
  artist_id: number;
  created_at?: Date;
  client?: User;
  artist?: User;
  messages?: Message[];
};

export type Message = {
  id: number;
  chat_id: number;
  sender_id: number;
  text: string;
  created_at?: Date;
  chat?: Chat;
  sender?: User;
};
