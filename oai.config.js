// oai.config.js

module.exports = {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    azureApiKey: process.env.AZURE_OPENAI_API_KEY,
    deploymentId: process.env.AZURE_OPENAI_DEPLOYMENT_NAME
  };