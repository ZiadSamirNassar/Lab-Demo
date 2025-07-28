import { Router } from "express";
import { 
    getAllTestTypes, 
    searchTestTypesByPartialId, 
    createTestType, 
    updateTestTypeAndFieldsContent 
} from "./test_type.service.js"
const testTypeRouter = Router();


//========================Get All Test Types=====================
testTypeRouter.get("/", getAllTestTypes);

//======================Search Test Types By Partial id================
testTypeRouter.get("/:id", searchTestTypesByPartialId);

//======================Create One Test Type===================
testTypeRouter.post("/", createTestType);

//======================update Test Type (name or category)=================
testTypeRouter.put("/:id", updateTestTypeAndFieldsContent)

export default testTypeRouter;
