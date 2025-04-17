
import { Client, Account, Databases, Storage, ID } from 'appwrite';
import { Product } from '@/types';

// Initialize Appwrite Client
const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('YOUR_PROJECT_ID'); // Replace with your actual project ID when connected

// Initialize Appwrite Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs - replace these with your actual IDs when created
const DATABASE_ID = 'furniture_store';
const PRODUCTS_COLLECTION_ID = 'products'; 
const STORAGE_BUCKET_ID = 'furniture_assets';

// Authentication Methods
export const createAccount = async (email: string, password: string, name: string) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    
    if (newAccount) {
      // Login immediately after account creation
      return await login(email, password);
    }
    
    return newAccount;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    return await account.createEmailSession(email, password);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    return await account.deleteSessions();
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Product Methods
export const createProduct = async (product: Omit<Product, 'id'>) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      ID.unique(),
      product
    );
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID
    );
    return response.documents as unknown as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      [
        // Add a query to filter by category
        databases.queryEqual('category', category)
      ]
    );
    return response.documents as unknown as Product[];
  } catch (error) {
    console.error('Error getting products by category:', error);
    return [];
  }
};

// File Storage Methods
export const uploadFile = async (file: File) => {
  try {
    const result = await storage.createFile(
      STORAGE_BUCKET_ID,
      ID.unique(),
      file
    );
    
    // Get file view URL
    const fileUrl = storage.getFileView(STORAGE_BUCKET_ID, result.$id);
    return { id: result.$id, url: fileUrl.href };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

