interface ISYSCONFIG{
    APP_NAME: string;
    HOST:string;
    user:any;
    filters:any;
    sid: string;
}

export const sys:ISYSCONFIG = {
    APP_NAME: 'TY_B2B',
    HOST:'/b2b-back',
    user:{},
    filters: {},
    sid:'',
};

export function sysInit() {
    sys.sid = localStorage[`${sys.APP_NAME}_sid`] || '';
}

export function sysUpdate(update:ISYSCONFIG){
    sys.user = update.user;
    sys.sid = update.sid;
}

export function log(...args:Array<any>) {
    // eslint-disable-next-line no-console
    console.log(...args);
}