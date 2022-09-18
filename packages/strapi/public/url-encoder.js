console.log('encoder started')
self.addEventListener('fetch', function(event) {

  let request=event.request;

  if(request.url.indexOf('?')!==-1){
    const parts=request.url.split('?',2);
    const q=parts[1].split('&');
    for(let i=0;i<q.length;i++){
      const kv=q[i].split('=',2);
      if(kv.length!==2){
        continue;
      }
      q[i]=encodeURIComponent(decodeURIComponent(kv[0]))+'='+kv[1];
    }

    request={
      ...request,
      url:parts[0]+'?'+q.join('&')
    }

    console.log(`Rewrite ${event.request.url} -> ${request.url}`)
  }

   event.respondWith(
    fetch(request)
  );
});
