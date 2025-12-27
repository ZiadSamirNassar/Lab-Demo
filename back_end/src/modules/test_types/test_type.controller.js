import { Router } from "express";
import { 
    getAllTestTypes, 
    searchTestTypesByPartialId, 
    createTestType, 
    updateTestTypeAndFieldsContent 
} from "./test_type.service.js"
import { asyncHandler, isValid } from "../../utils/index.js";
import { createTestTypeSchema, updateTestTypeSchema } from "./test_type.validation.js";

const testTypeRouter = Router();


//========================Get All Test Types=====================
testTypeRouter.get(
    '/',
    asyncHandler(getAllTestTypes)
)

//======================Search Test Types By Partial id================
testTypeRouter.get(
    '/:id',
    asyncHandler(searchTestTypesByPartialId)
)

//======================Create One Test Type===================
testTypeRouter.post(
    '/',
    asyncHandler(isValid(createTestTypeSchema)),
    asyncHandler(createTestType)
)

//======================update Test Type (name or category)=================
testTypeRouter.put(
    '/:id',
    asyncHandler(isValid(updateTestTypeSchema)),
    asyncHandler(updateTestTypeAndFieldsContent)
)

export default testTypeRouter;
