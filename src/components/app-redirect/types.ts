export type CarouselPost = {
  name: string;
  tokenId: number;
  blurhash: string;
  category: string;
  fullUriMd: string;
  extention: string;
  hoursRemaining: number;
  filledSticks: number;
};

export interface ImageInfo {
  name: string;
  ipfsCid: string;
  category: string;
  mimeType: string;
  blurhash: string;
  width: number;
  height: number;
}

export interface RodeoPost {
  id: string;
  mintEndDatetime: string;
  image: ImageInfo;
  tokenId: number;
}
