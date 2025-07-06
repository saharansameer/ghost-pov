import { BaseResponse } from "@/types";
import {
  FeedbackDocument,
  FeedbackAggregate,
  FeedbackCategory,
} from "@/models/feedback.model";
import { AggregatePaginateResult } from "mongoose";

export interface FeedbackResponse extends BaseResponse {
  data: FeedbackDocument | AggregatePaginateResult<FeedbackAggregate>;
  echo: {
    _id: string;
    title: string;
    description: string;
    owner: {
      plan: string;
      credits: number;
    };
    summaries: { _id: string; createdAt: Date; content: string }[];
    hasSummaries: boolean;
  };
}

export interface FeedbackObject {
  _id: Typed.ObjectId;
  category: FeedbackCategory;
  feedbackMessage: string;
  flagged: boolean;
  createdAt: Date;
}
