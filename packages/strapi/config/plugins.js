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

  const emailFrom=env('SENDGRID_EMAIL_FROM');
  const emailReplyTo=env('SENDGRID_EMAIL_REPLY_TO',emailFrom);
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

  const sesEmailFrom=env('AWS_SES_EMAIL_FROM');
  const sesEmailTo=env('AWS_SES_EMAIL_REPLY_TO');
  const sesRegion=env('AWS_SES_REGION');
  const sesAccessKey=env('AWS_SES_ACCESS_KEY_ID');
  const sesSecret=env('AWS_SES_ACCESS_SECRET');
  if(sesEmailFrom && sesEmailTo && sesRegion && sesAccessKey && sesSecret){
    config.email={
      config: {
        provider: 'amazon-ses',
        providerOptions: {
          key: sesAccessKey,
          secret: sesSecret,
          amazon: `https://email.${sesRegion}.amazonaws.com`,
        },
        settings: {
          defaultFrom: sesEmailFrom,
          defaultReplyTo: sesEmailTo,
        },
      },
    }
  }


  return config;
}
