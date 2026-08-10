import fs from "fs";
import path from "path";

export interface FeedbackEntry {
  id: string;
  year: string;
  instituteName: string;
  studentName: string;
  feedbackText: string;
  technicalRating: number;
  deliveryRating: number;
  overallRating: number;
  submittedAt: string;
}

export interface StudentFeedback {
  id: string;
  name: string;
  slug: string;
  feedbackText: string;
  technicalRating: number;
  deliveryRating: number;
  overallRating: number;
  submittedAt: string;
}

export interface InstituteFeedbacks {
  name: string;
  slug: string;
  students: StudentFeedback[];
}

export interface YearFeedbacks {
  year: string;
  institutes: InstituteFeedbacks[];
}

const FEEDBACKS_FILE = path.join(process.cwd(), "feedbacks.json");

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllFeedbacks(): FeedbackEntry[] {
  try {
    if (fs.existsSync(FEEDBACKS_FILE)) {
      const data = fs.readFileSync(FEEDBACKS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Return empty if file error
  }
  return [];
}

export function writeFeedbacks(feedbacks: FeedbackEntry[]) {
  fs.writeFileSync(FEEDBACKS_FILE, JSON.stringify(feedbacks, null, 2), "utf-8");
}

export function getHierarchicalFeedbacks(): YearFeedbacks[] {
  const feedbacks = getAllFeedbacks();
  const yearsMap: { [year: string]: { [inst: string]: StudentFeedback[] } } = {};

  feedbacks.forEach((entry) => {
    const year = entry.year;
    const inst = entry.instituteName;
    if (!yearsMap[year]) yearsMap[year] = {};
    if (!yearsMap[year][inst]) yearsMap[year][inst] = [];

    yearsMap[year][inst].push({
      id: entry.id,
      name: entry.studentName,
      slug: slugify(entry.studentName) + "-" + entry.id,
      feedbackText: entry.feedbackText,
      technicalRating: entry.technicalRating,
      deliveryRating: entry.deliveryRating,
      overallRating: entry.overallRating,
      submittedAt: entry.submittedAt,
    });
  });

  return Object.keys(yearsMap)
    .sort()
    .reverse()
    .map((year) => ({
      year,
      institutes: Object.keys(yearsMap[year]).map((instName) => ({
        name: instName,
        slug: slugify(instName),
        students: yearsMap[year][instName],
      })),
    }));
}
