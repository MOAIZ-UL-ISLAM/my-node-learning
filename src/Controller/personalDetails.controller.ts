import { Request, Response } from "express";
import PersonalDetails from "../Models/personalDetails.modals.js";
import { console } from "inspector";
import { v4 as uuidv4 } from "uuid";

// Define error type for better type safety
interface ErrorWithMessage {
  message: string;
}

export const createPersonalDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lastRecord = await PersonalDetails.findOne().sort({ rollNo: -1 });
    const nextRollNo = lastRecord ? lastRecord.rollNo + 1 : 10000; // Start from 10000 if no records exist

    const details = new PersonalDetails({
      ...req.body,
      rollNo: nextRollNo,
      uniqueId: uuidv4(),
    });
    const savedata = await details.save();
    res.status(201).json(savedata);
  } catch (error) {
    const err = error as ErrorWithMessage;
    res.status(400).json({ message: err.message });
    console.error(error);
  }
};

export const getAllPersonalDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { rollNo, cnicNumber } = req.query;
    let query = {};

    // Build query based on provided parameters
    if (rollNo) {
      // Convert string to number since rollNo is stored as number
      query = { ...query, rollNo: parseInt(rollNo as string) };
    }
    
    if (cnicNumber) {
      query = { ...query, cnicNumber: cnicNumber as string };
    }

    const details = await PersonalDetails.find(query);
    
    if (details.length === 0) {
      res.status(404).json({ message: "No records found matching the criteria" });
      return;
    }

    res.json(details);
  } catch (error) {
    const err = error as ErrorWithMessage;
    res.status(500).json({ message: err.message });
    console.error(error);
  }
};



export const updatePersonalDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const getPersonalDetailsById = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const deletePersonalDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
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
