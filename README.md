# **GenAI Playwright Demo 🤖**

Generate Playwright Tests 🎭 using Azure OpenAI

# Prerequisites
Node.js
Visual Studio Code
[Azure OpenAI Prerequisites](https://learn.microsoft.com/en-us/azure/ai-services/openai/chatgpt-quickstart?tabs=command-line%2Cpython-new&pivots=programming-language-javascript#prerequisites)


# Description
- Prompt OpenAI to generate Playwright Test code based on instructions and test steps
- Parse OpenAI generated response and save it into Playwright Test file in `/tests/` folder
- Run generated Playwright test from the program automatically with `npm test` command
- View Execution Results, launch results with `npx playwright show-report` command

# Resources:
[Quickstart: Get started using GPT-35-Turbo and GPT-4 with Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/chatgpt-quickstart?tabs=command-line%2Cpython-new&pivots=programming-language-javascript)

# To run:
- Set local Environment variables (see Quickstart link above for more details)
```
AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_API_KEY
AZURE_OPENAI_DEPLOYMENT_NAME
```
![image.png](/img/genai-playwright-demo01.png)

- Clone [genai-playwright-demo repo](https://github.com/qaa-demo/genai-playwright-demo) to your local machine
- Open `genai-playwright-demo` project in VSCode
- Run `npm install` command in a Terminal Window
- Run project with the command: `node PlaywrightTestGenAI.js`
- View Console for execution log, wait for completion, it may take a few minutes
- Playwright test will launch automatically
- to View Playwright test results run the command: `npx playwright show-report`

Good luck! 🚀 🤞

# Notes:
- During the execution new test file will be generated i.e. `genai-test-2404231521.spec.js`
- Previously generated file will be backed up in `/tests-bkp` folder
- Each run generates new test file and backs up the previous file to `/tests-bkp` folder

# Repo
https://github.com/qaa-demo/genai-playwright-demo