"use client";

import { useState } from "react";
import Link from "next/link";
import "./SubmitFeedback.css";

export default function FeedbackForm() {
    const [formData, setFormData] = useState({
        year: "",
        instituteName: "",
        studentName: "",
        feedbackText: "",
        technicalRating: 0,
        deliveryRating: 0,
        overallRating: 0,
    });

    const [hoveredStar, setHoveredStar] = useState<{
        field: string;
        value: number;
    } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) =>
        (currentYear - i).toString()
    );

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleStarClick = (field: string, value: number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (
            !formData.year ||
            !formData.instituteName.trim() ||
            !formData.studentName.trim() ||
            !formData.feedbackText.trim()
        ) {
            setError("Please fill in all required fields.");
            return;
        }
        if (
            formData.technicalRating === 0 ||
            formData.deliveryRating === 0 ||
            formData.overallRating === 0
        ) {
            setError("Please provide all star ratings.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Submission failed");
            }

            setSubmitted(true);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (
        field: string,
        currentValue: number,
        label: string
    ) => {
        const isHoveringThisField = hoveredStar?.field === field;
        const displayValue = isHoveringThisField
            ? hoveredStar!.value
            : currentValue;

        return (
            <div className="star-rating-group">
                <label className="star-rating-label">{label}</label>
                <div className="star-rating-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={`star-btn ${star <= displayValue ? "active" : ""} ${star <= displayValue && isHoveringThisField ? "hover-glow" : ""
                                }`}
                            onClick={() => handleStarClick(field, star)}
                            onMouseEnter={() => setHoveredStar({ field, value: star })}
                            onMouseLeave={() => setHoveredStar(null)}
                            aria-label={`Rate ${label} ${star} stars`}
                        >
                            <i className={`fa${star <= displayValue ? "s" : "r"} fa-star`}></i>
                        </button>
                    ))}
                    <span className="star-count">
                        {currentValue > 0 ? `${currentValue}/5` : ""}
                    </span>
                </div>
            </div>
        );
    };

    if (submitted) {
        return (
            <div className="submit-feedback-wrapper">
                <div className="submit-feedback-container">
                    <div className="success-card">
                        <div className="success-icon-wrap">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h1 className="success-title">Thank You!</h1>
                        <p className="success-text">
                            Your feedback has been submitted successfully. It will be reviewed
                            and added to the feedback records.
                        </p>
                        <div className="success-details">
                            <div className="detail-row">
                                <span className="detail-label">Name</span>
                                <span className="detail-value">{formData.studentName}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Institute</span>
                                <span className="detail-value">{formData.instituteName}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Year</span>
                                <span className="detail-value">{formData.year}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Overall Rating</span>
                                <span className="detail-value stars-display">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <i
                                            key={s}
                                            className={`fa${s <= formData.overallRating ? "s" : "r"
                                                } fa-star`}
                                        ></i>
                                    ))}
                                </span>
                            </div>
                        </div>
                        <div className="success-actions">
                            <Link href="/trainings/feedbacks" className="btn-back-home">
                                <i className="fas fa-arrow-left"></i> View All Feedbacks
                            </Link>
                            <button
                                className="btn-submit-another"
                                onClick={() => {
                                    setSubmitted(false);
                                    setFormData({
                                        year: "",
                                        instituteName: "",
                                        studentName: "",
                                        feedbackText: "",
                                        technicalRating: 0,
                                        deliveryRating: 0,
                                        overallRating: 0,
                                    });
                                }}
                            >
                                <i className="fas fa-plus"></i> Submit Another
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="submit-feedback-wrapper">
            <div className="submit-feedback-container">
                {/* Breadcrumbs */}
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link href="/trainings/feedbacks">Trainings</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="current-page">Submit Feedback</span>
                </div>

                {/* Header */}
                <div className="form-header">
                    <div className="form-header-icon">
                        <i className="fas fa-comment-dots"></i>
                    </div>
                    <h1 className="form-title">Share Your Feedback</h1>
                    <p className="form-subtitle">
                        We value your input! Rate your training experience.
                    </p>
                </div>

                {/* Form Card */}
                <form className="feedback-form-card" onSubmit={handleSubmit}>
                    {error && (
                        <div className="form-error">
                            <i className="fas fa-exclamation-triangle"></i>
                            {error}
                        </div>
                    )}

                    <div className="form-grid">
                        {/* Year */}
                        <div className="form-group">
                            <label htmlFor="year" className="form-label">
                                <i className="fas fa-calendar-alt"></i> Training Year{" "}
                                <span className="required">*</span>
                            </label>
                            <select
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="">Select Year</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Institute Name */}
                        <div className="form-group">
                            <label htmlFor="instituteName" className="form-label">
                                <i className="fas fa-university"></i> Institute / Organization{" "}
                                <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="instituteName"
                                name="instituteName"
                                value={formData.instituteName}
                                onChange={handleChange}
                                placeholder="e.g., Maharaja Institute of Technology"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    {/* Student Name */}
                    <div className="form-group full-width">
                        <label htmlFor="studentName" className="form-label">
                            <i className="fas fa-user"></i> Your Name{" "}
                            <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="form-input"
                            required
                        />
                    </div>

                    {/* Star Ratings */}
                    <div className="ratings-section">
                        <h3 className="ratings-heading">
                            <i className="fas fa-star"></i> Rate Your Experience
                        </h3>
                        <div className="ratings-row">
                            {renderStars("technicalRating", formData.technicalRating, "Technical Depth")}
                            {renderStars("deliveryRating", formData.deliveryRating, "Practical Delivery")}
                            {renderStars("overallRating", formData.overallRating, "Overall Experience")}
                        </div>
                    </div>

                    {/* Feedback Text */}
                    <div className="form-group full-width">
                        <label htmlFor="feedbackText" className="form-label">
                            <i className="fas fa-pen-fancy"></i> Your Feedback{" "}
                            <span className="required">*</span>
                        </label>
                        <textarea
                            id="feedbackText"
                            name="feedbackText"
                            value={formData.feedbackText}
                            onChange={handleChange}
                            placeholder="Share your experience about the training sessions, what you learned, and how it helped you..."
                            className="form-textarea"
                            rows={6}
                            required
                        />
                        <span className="char-count">
                            {formData.feedbackText.length} / 1000
                        </span>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className={`form-submit-btn ${isSubmitting ? "submitting" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span> Submitting...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-paper-plane"></i> Submit Feedback
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
