import { Request, Response } from "express";
import PersonalDetails from "../Models/personalDetails.modals.js";

// Define error type for better type safety
interface ErrorWithMessage {
  message: string;
}

export const createPersonalDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const details = new PersonalDetails(req.body);
    const savedata = await details.save();
    res.status(201).json(savedata);
  } catch (error) {
    const err = error as ErrorWithMessage;
    res.status(400).json({ message: err.message });
    console.error(error);
  }
};

export const getAllPersonalDetails = async (_req: Request, res: Response): Promise<void> => {
  try {
    const details = await PersonalDetails.find();
    res.json(details);
  } catch (error) {
    const err = error as ErrorWithMessage;
    res.status(500).json({ message: err.message });
    console.error(error);
  }
};

export const updatePersonalDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const details = await PersonalDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!details) {
      res.status(404).json({ message: "Details not found." });
      return;
    }
    res.json(details);
  } catch (error) {
    const err = error as ErrorWithMessage;
    res.status(500).json({ message: err.message });
    console.error(error);
  }
};

export const getPersonalDetailsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const details = await PersonalDetails.findById(req.params.id); // Remove the object wrapper
    if (!details) {
      res.status(404).json({ message: "Details not found." });
      return;
    }
    res.json(details);
  } catch (error) {
    const err = error as ErrorWithMessage;
    res.status(500).json({ message: err.message });
    console.error(error);
  }
};

export const deletePersonalDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const details = await PersonalDetails.findByIdAndDelete(req.params.id);
    if (!details) {
      res.status(404).json({ message: "Details not found." });
      return;
    }
    res.json({ message: "Details deleted successfully." });
  } catch (error) {
    const err = error as ErrorWithMessage;
    res.status(500).json({ message: err.message });
    console.error(error);
  }
};