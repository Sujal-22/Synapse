import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { supabaseAdmin } from "../lib/supabaseAdmin.js";
import { generatePostHackathonReport } from "../services/postHackathonAI.js";

const router = express.Router();

router.post("/generate", requireAuth, async (req, res) => {
    try {
        const { submissionId } = req.body;

        if (!submissionId) {
            return res.status(400).json({ message: "submissionId is required" });
        }

        const { data: submission, error: submissionError } = await supabaseAdmin
            .from("submissions")
            .select("*")
            .eq("id", submissionId)
            .single();

        if (submissionError || !submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        const { data: currentMember, error: memberError } = await supabaseAdmin
            .from("team_members")
            .select("*")
            .eq("team_id", submission.team_id)
            .eq("user_id", req.user.id)
            .maybeSingle();

        if (memberError || !currentMember) {
            return res.status(403).json({
                message: "You are not allowed to generate report for this team",
            });
        }

        const { data: team, error: teamError } = await supabaseAdmin
            .from("team_members")
            .select("*")
            .eq("team_id", submission.team_id);

        if (teamError) {
            return res.status(500).json({
                message: "Failed to fetch team members",
                error: teamError.message,
            });
        }

        const report = await generatePostHackathonReport({
            submission,
            team,
        });

        const { data: savedReport, error: saveError } = await supabaseAdmin
            .from("post_hackathon_reports")
            .upsert(
                {
                    submission_id: submission.id,
                    team_id: submission.team_id,
                    generated_by: req.user.id,
                    status: "completed",
                    report,
                    error: null,
                    updated_at: new Date().toISOString(),
                },
                {
                    onConflict: "submission_id",
                }
            )
            .select("*")
            .single();

        if (saveError) {
            return res.status(500).json({
                message: "Failed to save report",
                error: saveError.message,
            });
        }

        return res.status(200).json(savedReport);
    } catch (error) {
        return res.status(500).json({
            message: "Report generation failed",
            error: error.message,
        });
    }
});

router.get("/submission/:submissionId", requireAuth, async (req, res) => {
    try {
        const { submissionId } = req.params;

        const { data, error } = await supabaseAdmin
            .from("post_hackathon_reports")
            .select("*")
            .eq("submission_id", submissionId)
            .single();

        if (error || !data) {
            return res.status(404).json({ message: "Report not found" });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch report",
            error: error.message,
        });
    }
});

export default router;