export type Report = {
  uuid: string;
  user_uuid: string;
  keyword_uuid: string;
  keyword: string;
  ads: number;
  links: number;
  total_result: number;
  precess_time: number;
  html: string;
  is_extracted: boolean;
};

export type UploadResponse = Report[];
