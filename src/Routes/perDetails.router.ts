import { Router } from "express";
import {
  createPersonalDetails,
  getAllPersonalDetails,
  updatePersonalDetails,
  deletePersonalDetails,
  getPersonalDetailsById,
} from "../Controller/personalDetails.controller.js";

const router = Router();

// Fix the router by using RequestHandler type implicitly
router.post("/", createPersonalDetails);
router.get("/", getAllPersonalDetails);
router.get("/:id", getPersonalDetailsById);
router.put("/:id", updatePersonalDetails);
router.delete("/:id", deletePersonalDetails);

export default router;