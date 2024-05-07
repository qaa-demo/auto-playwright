# **GenAI Playwright Demo 🤖**

Generate Playwright Tests 🎭 using Azure OpenAI

## Prerequisites
- Node.js
- Visual Studio Code
- An Azure subscription
- Azure OpenAI service in the Azure subscription
- An Azure OpenAI Service resource with either the `gpt-35-turbo` or the `gpt-4` models deployed
- More Details: [Azure OpenAI Prerequisites](https://learn.microsoft.com/en-us/azure/ai-services/openai/chatgpt-quickstart?tabs=command-line%2Cpython-new&pivots=programming-language-javascript#prerequisites)


## Description
- Prompt OpenAI to generate Playwright Test code based on instructions and test steps
- Parse OpenAI generated response and save it into Playwright Test file in `/tests/` folder
- Run generated Playwright test from the program automatically with `npm test` command
- View Execution Results, launch results with `npx playwright show-report` command

## Resources:
[Quickstart: Get started using GPT-35-Turbo and GPT-4 with Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/chatgpt-quickstart?tabs=command-line%2Cpython-new&pivots=programming-language-javascript)

## To run:
- Set local Environment variables (see **Quickstart** link above for more details)
```
AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_API_KEY
AZURE_OPENAI_DEPLOYMENT_NAME
```
![image.png](/img/genai-playwright-demo01.png)

- Clone this repo to your local machine
- Open the repo project in VSCode, open new Terminal Window
- Run `npm install` command to install dependancies
- Run `npm i --save-dev @playwright/test` command to install latest version of Playwright
- Run project with the command: `node PlaywrightTestGenAI.js`
- View Console for execution log, wait for completion, it may take a few seconds (up to a minute)
- Playwright test will launch automatically
- Once completed, view Playwright test results by running the command: `npx playwright show-report`

Good luck! 🚀 🤞

## Notes:
- During the execution new test file will be generated i.e. `genai-test-2404231521.spec.js`
- Any previously generated files starting with **genai-test** will be backed up in `/tests-bkp` folder
- Each run generates new test file and backs up the previous file to `/tests-bkp` folder

## ZeroStep Demo
- Register Account and Obtain ZeroStep API Key (token) at https://zerostep.com/
- Set `$ export ZEROSTEP_TOKEN="<your token here>"` or save in System Environment Variables
- Run ZeroStep based test via the command `npm test ZeroStep-test.spec.js`
- Once completed, view Playwright test results by running the command: `npx playwright show-report`