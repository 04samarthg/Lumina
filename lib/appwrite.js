import { Query } from "appwrite";
import { Avatars, Databases, Account, Client, ID } from "react-native-appwrite";

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
const avatars = new Avatars(client);
const databases = new Databases(client)

export const signUp = async (email, password, username) => {
  try {
    
    try {
      await account.deleteSession('current');
    } catch (sessionError) {
      console.log("No active session to delete");
    }

    const response = await account.create(ID.unique(), email, password, username);
    if(!response) throw Error;
    
    const avatarUrl = avatars.getInitials(username)
    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userColletionId,
      ID.unique(),
      {
        accountId: response.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )
    
    return newUser

  } catch (error) {
    console.error(error); 
    throw new Error(error);
  }
};

export const signIn = async (email, password) =>{
  try {
    try {
      await account.deleteSession('current');
    } catch (sessionError) {
      console.log("No active session to delete");
    }

    const session = await account.createEmailPasswordSession(email, password);
    return session
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    if(!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userColletionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error
    
    return currentUser.documents[0];

  } catch (error) {
    console.log(error)
  }
}

export const getAllPosts = async()=> {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId)

    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

export const getLatestPosts = async()=> {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))])

    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

export const searchPosts = async(query)=> {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.search('title', query)])

    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

