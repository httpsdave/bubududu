export interface Sticker {
  id: string;
  name: string;
  url: string;
  tags?: string[];
}

export interface StickerCollection {
  name: string;
  stickers: Sticker[];
}
