import { Router } from "express";
import { 
    getAllTestTypes, 
    searchTestTypesByPartialId, 
    createTestType, 
    updateTestTypeAndFieldsContent 
} from "./test_type.service.js"
import { asyncHandler } from "../../utils/index.js";

const testTypeRouter = Router();


//========================Get All Test Types=====================
testTypeRouter.get("/", asyncHandler(getAllTestTypes));

//======================Search Test Types By Partial id================
testTypeRouter.get("/:id", asyncHandler(searchTestTypesByPartialId));

//======================Create One Test Type===================
testTypeRouter.post("/", asyncHandler(createTestType));

//======================update Test Type (name or category)=================
testTypeRouter.put("/:id", asyncHandler(updateTestTypeAndFieldsContent))

export default testTypeRouter;
