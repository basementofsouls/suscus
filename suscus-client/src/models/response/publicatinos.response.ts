export interface Publication {
  id: number;
  artist_id: number;
  title: string;
  image_url: string;
  description: string;
  category_id: number;
  created_at: string; // ISO-дата
  updated_at: string; // ISO-дата
}
