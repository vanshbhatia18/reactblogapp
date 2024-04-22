import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  construtor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject(conf.appProjectId);

    this.account = new Account(this.client);
  }
  /*
    async createAcount({username , email , password}) {
   
      const promise = this.account.create(ID.unique() , email ,password ,username)
     
           if(promise) {
            this.login()
           }
      promise.then(function (response) {
        console.log(response)
      } , function (e) {
        console.log(e) ;
      })
    } ;
     */

  async createAcount({ username, email, password }) {
    try {
      const userAccount = this.account.create(
        ID.unique(),
        email,
        password,
        username
      );

      if (userAccount) {
        return this.account.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (e) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSessions(email, password);
    } catch (e) {
      throw error;
    }
  }
  async currentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      console.log("App Write Service Error currentUser ::  ", error);
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (e) {
      console.log("App Write Service Error logout ::  ", error);
    }
  }
}

const AuthService = new AuthService();

export default AuthService;
