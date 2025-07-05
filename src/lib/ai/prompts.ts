export function getPrompt({
  title,
  description,
  feedbacks,
}: {
  title: string;
  description: string;
  feedbacks: string;
}): string {
  return `Analyze categorized feedback messages for a project and provide comprehensive insights. The feedback is organized under General, Feature Request, Error Report, and Bug Report categories but may be miscategorized. Analyze all messages thoroughly and correct misplacements.

  Provide analysis covering user sentiment, common problems and pain points, requested features and improvements, frequently mentioned issues, and user experience patterns. Extract key themes across all categories regardless of their assigned category.

  Output Requirements: Pure HTML only using semantic elements (h1, h2, h3, p, ul, ol, li, div, section, strong, em). No anchor, img, or hr tags. Use HTML entity codes for special characters instead of direct punctuation marks.
  Maximum words: 500. Do not exceed 500 words limit.

  Structure your HTML with Executive Summary (2-3 sentences), User Sentiment Analysis, Key Issues and Problems, Feature Requests and Enhancements, and Recommendations and Next Steps. Ensure all insights are backed by provided feedback and use professional language suitable for stakeholders. Return only clean semantic HTML ready for direct webpage rendering.

  Context About the Product: It maybe a web app, mobile app, project, portfolio, resume, algorithm, package or anything. So get an idea from the title and description of it, what it is:
  Title: ${title}
  Description: ${description}

  Here are the Feedbacks:
  ${feedbacks}
`;
}
