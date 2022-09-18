const serverless = require("serverless-http");

let strapiRef=null;
const getStrapi=()=>{
  if(strapiRef){
    return strapiRef;
  }
  strapiRef=require("@strapi/strapi/lib/index.js");
  return strapiRef;
}

const startStrapi = async (strapi) => {
  try {
    if (!strapi.isLoaded) {
      await strapi.load();
    }
    await strapi.postListen();
    strapi.server.mount();
    return strapi;
  } catch (error) {
    return strapi.stopWithError(error);
  }
};

module.exports.handler = async (event, context) => {

  if (!global.strapi) {
    console.info("Cold starting Strapi");
    getStrapi()({ dir: process.cwd() });
  }

  if (!global.strapi.isLoaded) {
    await startStrapi(global.strapi);
  }

  if(event.rawPath==='/__info'){
    return {
        env:process.env,
        event,
        //uploadConfig:global.strapi.config.get('plugins.upload'),
    }
  }

  const handler = serverless(global.strapi.server.app);
  return handler(event, context);
};
