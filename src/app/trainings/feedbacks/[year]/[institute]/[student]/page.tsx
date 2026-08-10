import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllFeedbacks, getHierarchicalFeedbacks } from "@/lib/db";
import "./Feedback.css";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    year: string;
    institute: string;
    student: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, institute, student } = await params;
  const feedbackData = getHierarchicalFeedbacks();
  const yearData = feedbackData.find((d) => d.year === year);
  const instData = yearData?.institutes.find((i) => i.slug === institute);
  const studentData = instData?.students.find((s) => s.slug === student);

  const studentName = studentData?.name || student;
  return {
    title: `Feedback: ${studentName} | ${instData?.name || institute} ${year}`,
    description: `Training feedback for ${studentName} from ${instData?.name || institute}, class of ${year}.`,
  };
}

export default async function FeedbackPage({ params }: Props) {
  const { year, institute, student } = await params;

  const feedbackData = getHierarchicalFeedbacks();
  const yearData = feedbackData.find((d) => d.year === year);
  const instData = yearData?.institutes.find((i) => i.slug === institute);
  const studentData = instData?.students.find((s) => s.slug === student);

  if (!studentData) {
    notFound();
  }

  const allRaw = getAllFeedbacks();
  const feedback = allRaw.find(f => f.id === studentData.id);

  if (!feedback) {
    notFound();
  }

  return (
    <div className="feedback-page-wrapper">
      <div className="feedback-container">
        {/* Breadcrumbs */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/trainings/feedbacks">Trainings</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href={`/trainings/feedbacks/${year}`}>{year}</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href={`/trainings/feedbacks/${year}/${institute}`}>{instData?.slug.toUpperCase()}</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="current-page">{feedback.studentName}</span>
        </div>

        {/* Header Section */}
        <div className="feedback-header">
          <Link href="/" className="feedback-logo">&lt;Portfolio/&gt;</Link>
          <div className="header-meta">
            <span className="meta-tag">Training Feedback</span>
            <span className="meta-date">{year} Series</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="feedback-content-card">

          <div className="student-profile">
            <div className="profile-initials">{feedback.studentName.charAt(0)}</div>
            <div className="profile-info">
              <h1 className="student-name">{feedback.studentName}</h1>
              <p className="student-institute">{feedback.instituteName} • Batch of {year}</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="feedback-body">
            <h2 className="section-subtitle">Training Experience</h2>
            <p className="feedback-text">
              {feedback.feedbackText}
            </p>

            <div className="ratings-grid">
              <div className="rating-item">
                <span className="rating-label">Technical Depth</span>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(s => (
                    <i key={s} className={`fa${s <= feedback.technicalRating ? 's' : 'r'} fa-star`}></i>
                  ))}
                </div>
              </div>
              <div className="rating-item">
                <span className="rating-label">Practical Delivery</span>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(s => (
                    <i key={s} className={`fa${s <= feedback.deliveryRating ? 's' : 'r'} fa-star`}></i>
                  ))}
                </div>
              </div>
              <div className="rating-item">
                <span className="rating-label">Overall Experience</span>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(s => (
                    <i key={s} className={`fa${s <= feedback.overallRating ? 's' : 'r'} fa-star`}></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="back-link-wrapper">
          <Link href={`/trainings/feedbacks/${year}/${institute}`} className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Student List
          </Link>
        </div>
      </div>
    </div>
  );
}
