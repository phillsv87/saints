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