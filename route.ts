import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FEEDBACKS_FILE = path.join(process.cwd(), "feedbacks.json");

interface FeedbackEntry {
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

function readFeedbacks(): FeedbackEntry[] {
    try {
        if (fs.existsSync(FEEDBACKS_FILE)) {
            const data = fs.readFileSync(FEEDBACKS_FILE, "utf-8");
            return JSON.parse(data);
        }
    } catch {
        // If file is corrupted or invalid, start fresh
    }
    return [];
}

function writeFeedbacks(feedbacks: FeedbackEntry[]) {
    fs.writeFileSync(FEEDBACKS_FILE, JSON.stringify(feedbacks, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            year,
            instituteName,
            studentName,
            feedbackText,
            technicalRating,
            deliveryRating,
            overallRating,
        } = body;

        // Validation
        if (!year || !instituteName?.trim() || !studentName?.trim() || !feedbackText?.trim()) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        if (
            !technicalRating || !deliveryRating || !overallRating ||
            technicalRating < 1 || technicalRating > 5 ||
            deliveryRating < 1 || deliveryRating > 5 ||
            overallRating < 1 || overallRating > 5
        ) {
            return NextResponse.json(
                { error: "All ratings must be between 1 and 5." },
                { status: 400 }
            );
        }

        const newFeedback: FeedbackEntry = {
            id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
            year: year.trim(),
            instituteName: instituteName.trim(),
            studentName: studentName.trim(),
            feedbackText: feedbackText.trim().substring(0, 1000),
            technicalRating: Number(technicalRating),
            deliveryRating: Number(deliveryRating),
            overallRating: Number(overallRating),
            submittedAt: new Date().toISOString(),
        };

        const feedbacks = readFeedbacks();
        feedbacks.push(newFeedback);
        writeFeedbacks(feedbacks);

        return NextResponse.json(
            { message: "Feedback submitted successfully!", feedback: newFeedback },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: "Internal server error. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const feedbacks = readFeedbacks();
        return NextResponse.json({ feedbacks }, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Failed to read feedbacks." },
            { status: 500 }
        );
    }
}
