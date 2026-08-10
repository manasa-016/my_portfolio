import { Metadata } from "next";
import FeedbackForm from "./FeedbackForm";

export const metadata: Metadata = {
    title: "Submit Training Feedback | Gokulakrishnan Portfolio",
    description:
        "Share your training experience and rate Gokulakrishnan Muthusamy's sessions. Your feedback helps us improve!",
};

export default function SubmitFeedbackPage() {
    return <FeedbackForm />;
}
