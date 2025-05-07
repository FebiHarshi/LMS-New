const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
    "userName": {
        "type": "String"
    },
    "userEmail": {
        "type": "String"
    },
    "personalDetails": {
        "fullName": {
            "type": "String"
        },
        "contactNumber": {
            "type": "String"
        },
        "emailAddress": {
            "type": "String"
        },
        "linkedinUrl": {
            "type": "String"
        },
        "emailId": {
            "type": "String"
        },
        "address": {
            "type": "String"
        }
    },
    "profileSummary": {
        "type": "String"
    },
    "education": {
        "type": [
            "Mixed"
        ]
    },
    "skills": {
        "type": [
            "Mixed"
        ]
    },
    "availableSkills": {
        "type": [
            "Mixed"
        ]
    },
    "customSkills": {
        "type": "Array"
    },
    "experience": {
        "type": [
            "Mixed"
        ]
    },
    "certifications": {
        "type": "String"
    },
    "projects": {
        "type": [
            "Mixed"
        ]
    }
});


module.exports = mongoose.model("Resume", ResumeSchema);