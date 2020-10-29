#!/bin/sh
npm run build
rm -f dist.zip
zip -r dist.zip dist
curl b2b.tongyeju.com/b2b-back/api/Update/front -F "file=@dist.zip" -v