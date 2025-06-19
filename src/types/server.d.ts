import { FeedbackDocument, FeedbackAggregate } from "@/models/feedback.model";
import { EchoDocument, EchoAggregate } from "@/models/echo.model";
import { AggregatePaginateResult } from "mongoose";

declare global {
  interface BaseResponse {
    success: boolean;
    message: string;
  }

  interface FeedbackResponse extends BaseResponse {
    data: FeedbackDocument | AggregatePaginateResult<FeedbackAggregate>;
  }

  interface EchoResponse extends BaseResponse {
    data: EchoDocument | AggregatePaginateResult<EchoAggregate>;
  }

  interface EchoObject {
    publicId: string;
    title: string;
    isAcceptingFeedback: boolean;
    createdAt: Date;
  }

  interface PaginationInfo {
    currPage: number;
    totalPages: number;
    prevPage: number | null;
    nextPage: number | null;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  }

  type PaginatedDataOnly =
    | AggregatePaginateResult<EchoAggregate>
    | AggregatePaginateResult<FeedbackAggregate>;
}

export {};
