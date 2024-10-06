import { Account, Client, ID } from "react-native-appwrite";
import 'react-native-url-polyfill/auto'

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.sammyg.lumina",
  projectId: "67015294001391b972a8",
  databaseId: "6701545a0001bec209e2",
  userColletionId: "6701547b000954499ad4",
  videoCollectionId: "670154ac002c4aff649c",
  storageId: "6701562b0023556847bb",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.


const account = new Account(client);

// Register User
export const createUser = async (username, email, password) => {
  try {
    console.log("createUser called with:", username, email, password); // Debugging log
    const response = await account.create(ID.unique(), email, password, username);
    console.log("User created:", response); // Log successful response
  } catch (error) {
    console.log("Error creating user:", error); // Log errors
  }
};

