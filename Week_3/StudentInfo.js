// StudentInfo.js

const dateofBirth = "12/12/1980";

const getStudentName = () => {
    return "Chibuike Success Obijuru";
};

const getCampusName = () => {
    return "UEL Campus";
};

// Export functions and variable
exports.getName = getStudentName;
exports.Location = getCampusName;
exports.dob = dateofBirth;

// Export function with parameter
exports.Studentgrade = (marks) => {
    if (marks > 50 && marks < 70)
        return "B grade";
    else
        return "A grade";
};