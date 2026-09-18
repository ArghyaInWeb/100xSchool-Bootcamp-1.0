
//Note   //-Used Declaration Merging to add user_id property to the Request interface of Express module

declare  namespace Express {
    export interface Request {
        user_id?: number 
    }
}