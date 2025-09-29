export interface ICommentDto{
    content:string;
    attachments:any;
    parentId?:string|null;
}