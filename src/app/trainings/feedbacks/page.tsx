import Link from "next/link";
import { getHierarchicalFeedbacks } from "@/lib/db";
import "./Feedbacks.css";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Training Feedbacks | Archive",
    description: "Browse training feedback records by year.",
};

export default function FeedbacksPage() {
    const feedbackData = getHierarchicalFeedbacks();

    return (
        <div className="feedbacks-list-wrapper">
            <div className="feedbacks-container">
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="current-page">Trainings</span>
                </div>

                <div className="feedbacks-header">
                    <h1 className="feedbacks-title">Training Feedbacks</h1>
                    <p className="feedbacks-subtitle">Select a year to view feedback records</p>
                    <Link href="/trainings/feedbacks/submit" className="submit-feedback-cta">
                        <i className="fas fa-pen-fancy"></i> Submit Your Feedback
                    </Link>
                </div>

                <div className="feedbacks-grid">
                    {feedbackData.length > 0 ? (
                        feedbackData.map((data) => (
                            <Link
                                key={data.year}
                                href={`/trainings/feedbacks/${data.year}`}
                                className="feedback-card"
                            >
                                <div className="card-icon">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                                <h2 className="card-title">{data.year} Series</h2>
                                <p className="card-info">{data.institutes.length} Institutions</p>
                            </Link>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#6b6b80', padding: '40px' }}>
                            No feedback records found yet. Be the first to submit!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
