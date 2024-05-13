// PlaywrightTestGenAI.js

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { endpoint, azureApiKey, deploymentId } = require('./oai.config');
const dayjs = require('dayjs');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const messages = [
    { role: "system", content: "Act as a Test Automation Engineer and generate Playwright tests based on provided test descriptions. Here are the rules: Assume Node.js and Plawright are already installed and Playwright project is created. Your goal is to generate Playwright Test code only, based on provided test steps, expected results and input data. You will generate Plawright Tests in JavaScript. You will use page.fill() method to enter values, you will use page.waitForLoadState('networkidle') to wait for step completion after submit. You must never use page.waitForNavigation() method! Start each test code with the console.log statement Test Run Start and current local date and time. IMPORTANT: You must not include any instructions, assumptions, prerequisites, annotations or explanations of any kind to your response! Your response must contain only Playwright Test code. The test code you return will be immdediately executed and must compile so do not iclude any non-code items. If you include any non code lines they should be commented out. Add test steps as commented lines to the code. In your response provide code only. Do not include markdown formatting such as language labels'```javascript' and triple ticks ```' in your response. When generating multiple tests make sure there only one statement const { test, expect } = require('@playwright/test');" },
    { role: "user", content: "Generate Playwright Test to navigate to Google.com" },
    {
        role: "assistant",
        content: `
            const { test, expect } = require('@playwright/test');
            // Test to navigate to Google.com
            test('Test 1: Navigate to Google.com', async ({ page }) => {
                console.log('Test Run Start', new Date().toLocaleString());
                // Navigate to Google Home page
                await page.goto('https://www.google.com')
            });
        `
    },
    {
        role: "user",
        content: `
            Generate Playwright Test 1 to test Google Search. 
            Test steps: 
            - Navigate to Google Home page
            - Enter a search term in a search field
            - For search field, use locator textarea[name=q] and submit the search
            - Validate search results page title
            - Use search Term: 'Playwright Automated Testing'. 
            - Expected search result page title: 'Playwright Automated Testing - Google Search'.
            - Click the first search result
            - Log to console the URL and title of the page that opens 
            
        `
    },
    {
        role: "user",
        content: `
            Generate Playwright Test 2 to test login functionality. 
            Test steps: 
            - Navigate to the login page https://the-internet.herokuapp.com/login
            - Fill in the username and password fields
            - Use username 'tomsmith' and password 'SuperSecretPassword!'
            - Submit the form by clicking Login button
            - Validate that the user is redirected a page that has h2 title 'Secure Area' 
            - validate locator id=flash contains text 'You logged into a secure area!'
            - Log the Page Title and Page Url
        `
    },
    {
        role: "user",
        content: `
            Generate Playwright Test 3 to test Guestbook app login. 
            Test steps: 
            - Navigate to https://testautomationpro.com/aut/
            - Click 'Login' menu item to navigate to Login Form
            - Log the Page Title and Page Url
            - Fill in the username and password fields and click Login button
            - Use username 'Demouser' and password 'Demopass'.
            - Use locators input[name="username"], input[name="password"], input[name="Submit"]
            - Validate that the user is redirected to form page that has h2 title 'Sign The Guestbook'
            - Log the Page Title and Page Url
            - Click 'Logout Demouser' menu item
            - Validate page has h1 title Guestbook Demo
            - Log the Page Title and Page Url
        `
    },

];

async function main() {
    console.log("-= Chat Completions Sample =-");

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    let result;
    let startTime;

    // Wait for result showing progress bar
    const progressInterval = setInterval(() => process.stdout.write('>'), 1000);

    try {
        startTime = Date.now(); // Capture the start time
        result = await client.getChatCompletions(deploymentId, messages);
    } catch (error) {
        console.error("Error getting chat completions:", error);
    } finally {
        clearInterval(progressInterval); // Stop waiting
    }
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000; // Calculate duration in seconds
    console.log(`\nServer response received in ${duration} seconds`);

    let contentToSave = ""; 

    for (const choice of result.choices) {
        console.log(choice.message);
        const lines = choice.message.content.trim().split('\n');
        const filteredLines = lines.filter(line => !line.includes('```')); // filter any markdown 
        contentToSave += filteredLines.join('\n') + "\n"; // Append the content
    }
    
    
    console.log(contentToSave);

    // Write the result to a test file
    const timeStamp = dayjs().format('YYMMDDHHmm');
    const fileName = `genai-test-${timeStamp}.spec.js`

    await saveTestFile(fileName, contentToSave);

    // Execute test after completing the main function

    exec('npm test ' + fileName, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing npm test: ${error}`);
            return;
        }
        console.log(`npm test stdout: ${stdout}`);
        console.error(`npm test stderr: ${stderr}`);

        // Exit the Node.js process
        process.exit();
    });

}

async function saveTestFile(fileName, contentToSave) {
    const directoryPath = './tests/';
    const backupFolderPath = './tests-bkp/';

    try {
        // Create the backup folder if it doesn't exist
        await fs.mkdir(backupFolderPath, { recursive: true });

        // Get a list of files starting with 'genai-test'
        const files = await fs.readdir(directoryPath);
        const genaiTestFiles = files.filter(file => file.startsWith('genai-test'));

        // Move the files to the backup folder
        await Promise.all(genaiTestFiles.map(async file => {
            const sourcePath = path.join(directoryPath, file);
            const destinationPath = path.join(backupFolderPath, file);
            await fs.rename(sourcePath, destinationPath);
        }));

        // Save the content to the specified file
        await fs.writeFile(path.join(directoryPath, fileName), contentToSave);

        console.log('Test Files backed up and saved successfully.');
    } catch (err) {
        console.error('Error moving and saving files:', err);
    }
}



main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

module.exports = { main };