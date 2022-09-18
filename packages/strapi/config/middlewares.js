module.exports = ({ env }) => {

  const bucket=env('AWS_BUCKET');

  const domains=[];
  if(bucket){
    domains.push(`${bucket}.s3.${env('AWS_BUCKET_REGION')}.amazonaws.com`);
    domains.push(`${bucket}.s3.amazonaws.com`);
  }

  return [
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          directives: {
            'script-src': ["'self'", "'unsafe-inline'", ...domains],
            'img-src': ["'self'", 'data:', 'blob:', ...domains],
            'media-src': ["'self'", 'data:', 'blob:', ...domains],
            upgradeInsecureRequests: null,
          },
        }
      },
    },
    {
      name: 'strapi::cors',
      config: {
        enabled: true,
        headers: '*',
        origin: ['*']
      }
    },
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    {
        // custom name to find a package or a path
        name: 'strapi::body',
        config: {
        formLimit: "256mb", // modify form body
          jsonLimit: "256mb", // modify JSON body
          textLimit: "256mb", // modify text body
          formidable: {
            maxFileSize: 200 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
          },
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
}
