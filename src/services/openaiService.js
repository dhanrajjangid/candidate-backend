const axios = require("axios");

const YOUR_GOOGLE_API_KEY = "AIzaSyCoGfmfOtHddNzDcDPzlAyzbKB-rPq4aUA";

const generateTestCasesGemini = async (userStory) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${YOUR_GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Give me the possible test cases for this with the following keys: 
                heading: Heading of the test case,Steps: Steps to execute the test cases,  
                expectedResults: What results are expected from the test case, 
                actualResults: A passes actual result statement. 
                All the steps should be in a single string and add some character inside steps for newline 
                that is supported by xlxs, and no nested object or array should be there only 
                one level should be there and it should be in a pure JSON without any characters 
                that are not supported in JSON.parse - ${userStory}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseText = response.data.candidates[0].content.parts;

    let cleanedString = responseText[0].text.match(/\[.*\]/s)[0];
    cleanedString = JSON.parse(cleanedString);

    const formatSteps = (steps) => {
      return steps.map((step) => step.action || "").join("\n");
    };

    const formatExpectedResults = (results) => {
      if (!results || !Array.isArray(results)) return "";
      return results.map((result) => result.result || "").join("\n");
    };

    // Assuming cleanedString is your array of test case objects
      const testCases = cleanedString.map((item, index) => ({
        SerialNumber: index + 1,
        Heading: item.heading || "",
        Steps: item.steps,
        ExpectedResults: item.expectedResults,
        ActualResults: item.actualResults, // Initially empty, to be filled later
      }));
      console.log(testCases, "<<<<<<<<<<<<<<<<<<<<<<<<<<<")

    return testCases;
  } catch (error) {
    console.error(
      "Error generating test cases:",
      error.response ? error.response.data : error.message
    );
    return [];
  }
};

module.exports = {
  generateTestCasesGemini,
};
