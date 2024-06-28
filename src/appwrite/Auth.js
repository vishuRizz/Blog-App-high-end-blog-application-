import config from "../config/config";
import { ID, Client, Account } from "appwrite";

export class AuthServise{
  Client = new Client();
  account;

  constructor(){
   this.Client
   .setEndpoint(config.appwriteUrl)
   .setProject(config.appwriteProjectId)
    this.account = new Account(this.Client);
  }  
  async createAccount({email, password, name}){
    try {
     const userAccount =  await this.account.create(ID.unique(), email, password, name);
       if (userAccount) {
      // call another method that directly logs in as soon as the user creates an account
    return this.login({email, password});
     
       } else {
        return userAccount;
       }
    } catch (error) {
        throw error;
    }
  }

  async login(email, password){
  try {
    const userLogin = await this.account.createEmailPasswordSession(email, password)
   return userLogin;
  } catch (error) {
    throw error;
  }
  }
  async getCurrentUser(){
   try {
    return await this.account.get();
   } catch (error) {
    console.log("Appwrite service :: getCurrentUser :: error", error);
   }
   return null;
  }
  async logout(){
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        throw error;
    }
  }
  
}

const authServise = new AuthServise();

export default authServise;