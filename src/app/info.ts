import { Comments } from "./comments"
import { Whois } from "./whois"

export interface Info {
    _id:String,
    url:String,
    name:String,
    hostname:String,
    status:String,
    whois:Whois[],
    feedback_options:[],
    last_checked:String,
    comments:Comments[],
    disrupts:[],
    reports:[],
    __v:Number,
}
