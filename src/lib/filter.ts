import { BaseResponse } from "@/types";

interface FilterResponse extends BaseResponse {
  flagged: boolean;
  scores?: {
    TOXICITY: number;
    SEVERE_TOXICITY: number;
    INSULT: number;
    PROFANITY: number;
    SPAM: number;
  };
  reason?: string[];
}

export async function filterFeedbackMessage(
  message: string
): Promise<FilterResponse> {
  try {
    // Call Perspective API to analyze the message
    const response = await fetch(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.PERSPECTIVE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: { text: message },
          languages: ["en"],
          requestedAttributes: {
            TOXICITY: {},
            SEVERE_TOXICITY: {},
            INSULT: {},
            PROFANITY: {},
            SPAM: {},
          },
        }),
      }
    );

    // Parse JSON response
    const data = await response.json();
    console.log(data)
    // Extract attribute scores from the response
    const scores = {
      TOXICITY: data.attributeScores.TOXICITY.summaryScore.value || 0,
      SEVERE_TOXICITY:
        data.attributeScores.SEVERE_TOXICITY.summaryScore.value || 0,
      INSULT: data.attributeScores.INSULT.summaryScore.value || 0,
      PROFANITY: data.attributeScores.PROFANITY.summaryScore.value || 0,
      SPAM: data.attributeScores.SPAM.summaryScore.value || 0,
    };

    // Find which attributes cross the abuse threshold (0.8)
    const flaggedAttributes = Object.entries(scores)
      .filter(([_key, value]) => value > 0.8)
      .map(([key]) => key);

    return {
      success: true,
      message: "Feedback message filtered Successfully",
      flagged: flaggedAttributes.length > 0,
      scores,
      reason: flaggedAttributes,
    };
  } catch (error){
    console.log(error)
    return {
      success: false,
      message: "Failed to filter Feedback Message",
      flagged: false,
    };
  }
}
