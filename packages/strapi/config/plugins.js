module.exports =  ({ env }) => {
  const config={};

  const bucket=env('AWS_BUCKET');
  if(bucket){
    config.upload= {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          accessKeyId: env('AWS_BUCKET_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_BUCKET_ACCESS_SECRET'),
          region: env('AWS_BUCKET_REGION'),
          params: {
            Bucket: bucket,
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    }
  }

  const emailFrom=env('EMAIL_FROM');
  const emailReplyTo=env('EMAIL_REPLY_TO',emailFrom);
  const sendGridKey=env('SENDGRID_API_KEY');
  if(sendGridKey && emailFrom){
    config.email={
      config:{
        provider: 'sendgrid',
        providerOptions: {
          apiKey: sendGridKey,
        },
        settings: {
          defaultFrom: emailFrom,
          defaultReplyTo: emailReplyTo,
        },
      }
    }
  }


  return config;
}
