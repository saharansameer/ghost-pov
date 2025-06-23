import {
  FeedbackDocument,
  FeedbackAggregate,
  FeedbackCategory,
} from "@/models/feedback.model";
import { EchoDocument, EchoAggregate } from "@/models/echo.model";
import { Types, AggregatePaginateResult } from "mongoose";

declare global {
  // API Response Types
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

  // Data Types from API Response
  interface EchoObject {
    _id: Types.ObjectId;
    publicId: string;
    title: string;
    isAcceptingFeedback: boolean;
    feedbackCount: number;
    createdAt: Date;
  }

  interface FeedbackObject {
    _id: Typed.ObjectId;
    category: FeedbackCategory;
    message: string;
    flagged: boolean;
    createdAt: Date;
  }

  // Paginated Response Types
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

  // Next Request Params Types
  type RequestParams = {
    params: Promise<{
      echoId?: string;
      echoPublicId?: string;
    }>;
  };
}

export {};
