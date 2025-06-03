import { FeedbackDocument } from "@/models/feedback.model";

declare global {
  interface BaseResponse {
    success: boolean;
    message: string;
  }

  interface FeedbackResponse extends BaseResponse {
    isAcceptingFeedback?: boolean;
    feedbacks?: Array<FeedbackDocument>;
  }
}

export {};
