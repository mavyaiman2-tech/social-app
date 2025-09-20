
import {Model,ProjectionType,RootFilterQuery,QueryOptions,MongooseUpdateQueryOptions, UpdateQuery}  from "mongoose";

export  abstract class AbstractRepository<T>{
    constructor(protected model: Model<T>){}
   create (item: Partial<T>){
  const doc=new this.model(item);
  return doc.save();
   }
    async exist (filter: RootFilterQuery<T>,projection?: ProjectionType<T>,
    options?: QueryOptions<T>){
    return  await this.model.findOne(filter,projection,options);
   }
   async getOne (filter: RootFilterQuery<T>,projection?: ProjectionType<T>,
    options?: QueryOptions<T>){
    return  await this.model.findOne(filter,projection,options);
   }
    async update (filter: RootFilterQuery<T>,update:UpdateQuery<T>,
        options?:MongooseUpdateQueryOptions<T>){
    return  await this.model.updateOne(filter,update,options);
   }
   async delete (
    filter: RootFilterQuery<T>
   ){
    return await this.model.deleteOne(filter);
   }
}