import { FeedbackDocument } from "@/models/feedback.model";
import { EchoDocument } from "@/models/echo.model";

declare global {
  interface BaseResponse {
    success: boolean;
    message: string;
  }

  interface FeedbackResponse extends BaseResponse {
    isAcceptingFeedback?: boolean;
    data: Array<FeedbackDocument>;
  }

  interface EchoResponse extends BaseResponse {
    data: EchoDocument;
  }

}

export {};