import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Some required field is missing.",
                success: false
            });
        }

        const salaryNumber = Number(String(salary).replace(/[^\d.]/g, ""));
        const experienceNumber = Number(String(experience).match(/\d+/)?.[0] ?? NaN);
        const positionNumber = Number(String(position).replace(/[^\d]/g, ""));

        if (Number.isNaN(salaryNumber) || Number.isNaN(experienceNumber) || Number.isNaN(positionNumber)) {
            return res.status(400).json({
                message: "Salary, experience, and position must be numeric values.",
                success: false
            });
        }

        const requirementsArray = Array.isArray(requirements)
            ? requirements
            : String(requirements)
                .split(",")
                .map((req) => req.trim())
                .filter(Boolean);

        const job = await Job.create({
            title,
            description,
            requirements: requirementsArray,
            salary: salaryNumber,
            location,
            jobType,
            experienceLevel: experienceNumber,
            position: positionNumber,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
}
