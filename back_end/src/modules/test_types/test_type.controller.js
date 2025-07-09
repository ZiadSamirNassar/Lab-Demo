const { Router } = require("express");
const { 
    getAllTestTypes, 
    searchTestTypesByPartialId, 
    createTestType, 
    updateTestTypeAndFieldsContent 
} = require("./test_type.service")
const testTypeRouter = Router();


//========================Get All Test Types=====================
testTypeRouter.get("/", getAllTestTypes);

//======================Search Test Types By Partial id================
testTypeRouter.get("/:id", searchTestTypesByPartialId);

//======================Create One Test Type===================
testTypeRouter.post("/", createTestType);

//======================update Test Type (name or category)=================
testTypeRouter.put("/:id", updateTestTypeAndFieldsContent)

module.exports = testTypeRouter;
