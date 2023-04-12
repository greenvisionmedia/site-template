# Site Template

### Repo setup checklist:

1. siteground.com > websites > `example.com` > site tools > site > FTP accounts > Add an account name and password. The account name must be "gvm"

1. siteground.com > websites > `greenvisionmedia.net` > domain > subdomain > Add an subdomain with the client's 2-3 letter site code, i.e. `gvm`

2. github.com > settings > secrets > Change the ftp password to a secret called `FTP_PASSWORD`

3. github.com > workflows/deploy.yml/ > Add the final launch domain and the subdomain site code. Optionally enable run on push (uncomment `push:`) and enable push to live domain (set `staging:` to false).
