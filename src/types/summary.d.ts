import { BaseResponse } from "@/types/server";

export interface SummaryResponse extends BaseResponse {
  content?: string;
  summaryId?: Any;
}
