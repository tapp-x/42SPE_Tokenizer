# Alchemy API Setup Guide

To deploy this project on a public blockchain (like Sepolia), you need a connection provider. This project uses **Alchemy**.

### Steps to get your API Key:

1. **Create an Account**: Go to [Alchemy.com](https://www.alchemy.com/) and sign up for a free account.
2. **Create a New App**:
   - Go to your Dashboard.
   - Click **"Create App"**.
   - **Name**: Molybdenum42 Deployer.
   - **Chain**: Sepolia.
   - **Network**: Testnet.
3. **Get your HTTPS URL**:
   - Once the app is created, click on **"API Key"**.
   - Copy the **HTTPS** link.
4. **Environment Configuration**:
   - Paste this link into your `.env` file as `ALCHEMY_URL`.

> **Note**: For a more detailed walkthrough, you can follow this [Official Alchemy Guide](https://docs.alchemy.com/docs/alchemy-quickstart-guide).