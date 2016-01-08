---
layout: post
title: cgit installation
date: 2014-12-09 18:43:13.000000000 -06:00
---
cgit (http://git.zx2c4.com/cgit/) is a "hyperfast web frontend for git repositories written in C." In an attempt to move my public and private projects off Github because my 2 year student coupon was expiring, I installed cgit to allow others to view and download my public projects. Installing cgit took a while because every tutorial I used was different and it was difficult to combine elements of one tutorial with elements of others. 

In this post I have attempted to document how I set up cgit on my Ubuntu 14.04 server running Nginx. I wanted to have cgit running in a subdirectory (https://souvik.me/cgit/). 

First I downloaded the cgit source code and built it using the instructions in the README. After running `make install` the cgit binaries, css, and image files were installed in `/var/www/htdocs/cgit/`. I symbolically linked `/var/www/htdocs/cgit/` to `/var/www/souvik.me/cgit/` and edited `/etc/nginx/sites-available/souvik.me` as follows:

```
...
location /cgit {
  fastcgi_pass unix:/var/run/fcgiwrap.socket;
  fastcgi_param SCRIPT_FILENAME /var/www/souvik.me/cgit/cgit.cgi;
  fastcgi_split_path_info ^((?U).*)cgit(.*)$;
  fastcgi_param PATH_INFO $fastcgi_path_info;
  fastcgi_param QUERY_STRING $query_string;
  include /etc/nginx/fastcgi_params;
}
...
```

The key here is `fastcgi_split_path_info`, which splits PATH_INFO based on regex captures. I then moved `/var/www/htdocs/cgit/cgit.css` and `/var/www/htdocs/cgit/cgit.png` to `/var/www/souvik.me/static` on my webserver and edited `/etc/cgitrc` as follows:

```
enable-commit-graph=1
enable-tree-linenumbers=1
enable-log-filecount=1
enable-log-linecount=1
remove-suffix=1
root-title=souvik.me Git repositories
strict-export=git-daemon-export-ok
enable-index-owner=0
clone-prefix=git://souvik.me
snapshots=tar.gz tar.xz zip
virtual-root=/cgit/
scan-path=/var/www/git/
css=/static/cgit.css
logo=/static/cgit.png
```

That's it! I had set up a few Git repositories in `/var/www/git` which I copied from my GitHub account using `git clone --bare`. Go to https://souvik.me/cgit/  to see this in action.
