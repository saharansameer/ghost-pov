import { BaseResponse } from "@/types";
import { EchoDocument, EchoAggregate } from "@/models/echo.model";
import { Types, AggregatePaginateResult } from "mongoose";

export interface EchoResponse extends BaseResponse {
  data: EchoDocument | AggregatePaginateResult<EchoAggregate>;
}

export interface EchoObject {
  _id: Types.ObjectId;
  publicId: string;
  title: string;
  description: string;
  isAcceptingFeedback: boolean;
  feedbackCount: number;
  createdAt: Date;
}

export interface EchoActionState {
  success: boolean;
  message?: string;
  title?: string;
  description?: string;
  fieldError?: {
    title?: string;
    description?: string;
  };
}
