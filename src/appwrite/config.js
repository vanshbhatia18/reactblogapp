import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../cong/conf";

export class Servicee {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async getPost(slug) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDataBaseId,
        conf.appWriteCollectinId,
        slug
      );
    } catch (error) {
      console.log("cannot get the document", error);
      return false;
    }
  }

  async getPosts(quires = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDataBaseId,
        conf.appWriteCollectinId,
        quires
      );
    } catch (error) {
      console.log("cannot get the document , getPosts", error);
      return false;
    }
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDataBaseId,
        conf.appWriteCollectinId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost() :: ", error);
      return false;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDataBaseId,
        conf.appWriteCollectinId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateDocument() :: ", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDataBaseId,
        conf.appWriteCollectinId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteDocument() :: ", error);
      return false;
    }
  }

  // storage service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }
}
const Servicee = new Servicee();
export default Servicee;
