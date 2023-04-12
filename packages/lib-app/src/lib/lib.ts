import { RecordArray } from "./types";

export const isServerSide=typeof window === 'undefined';
export const isClientSide=!isServerSide;

export function deleteUndefined<T>(obj:T):T
{
    if(!obj){
        return obj;
    }
    for(const e in obj){
        if(obj[e]===undefined){
            delete obj[e];
        }
    }
    return obj;
}

export const dump=<T>(obj:T,...rest:any[]):T=>{
    console.info(...rest,obj)
    return obj;
}

export const apiRecordsToArray=<T>(records:RecordArray<T>|null|undefined):T[]=>{
    if(!records?.data){
        return [];
    }

    const ary:T[]=[];

    for(const d of records.data){
        const atts=d.attributes as any;
        if(atts){
            if(atts.id===undefined){
                atts.id=d.id;
            }
            for(const prop in atts){
                const value=atts[prop];

                if(value===undefined){
                    delete atts[prop];
                }else{
                    atts[prop]=value;
                }
            }
            ary.push(atts);
        }
    }

    return ary;
}
