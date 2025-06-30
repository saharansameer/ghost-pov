import { AggregatePaginateResult } from "mongoose";
import { EchoAggregate } from "@/models/echo.model";
import { FeedbackAggregate } from "@/models/feedback.model";

export interface BaseResponse {
  success: boolean;
  message: string;
}

export type RequestParams = {
  params: Promise<{
    echoId?: string;
    echoPublicId?: string;
    feedbackId?: string
  }>;
};

export interface PaginationInfo {
  currPage: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export type PaginatedDataOnly =
  | AggregatePaginateResult<EchoAggregate>
  | AggregatePaginateResult<FeedbackAggregate>;
