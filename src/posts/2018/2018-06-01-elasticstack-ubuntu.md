---
title: Elastic Stack on Ubuntu 18.04
tags: [how-to, observability, linux]
---

Let's see how to install Elastic Stack on Ubuntu 18.04.

<!-- more -->

All this steps have been validated on a VM in June 2018.

## Readings

- [Installing Elasticsearch](https://www.elastic.co/guide/en/elastic-stack/current/installing-elastic-stack.html)
- [Install the Elastic Stack on an Azure VM](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-elasticsearch)
- [Quickstart: Use Azure Redis Cache with a .NET application](https://docs.microsoft.com/en-us/azure/redis-cache/cache-dotnet-how-to-use-azure-redis-cache)
- [How To Install Elasticsearch, Logstash, and Kibana (ELK Stack) on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elk-stack-on-centos-7)

## Pre-requisites

### OS version

```bash
more /etc/lsb-release
```

### Firewall

```bash
sudo iptables -L
sudo ufw status
```

In CHAIN INPUT you should have an ACCEPT tcp dpt:5601

### Java

```bash
sudo apt-get update
sudo apt-get -y install openjdk-8-jdk openjdk-8-jre
java -version
```

You should see something like OpenJDK Runtime Environment build 1.8.0.xxx / OpenJDK 64-Bit Server VM.

## Elasticsearch

Ref: [Install Elasticsearch with Debian Package](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/deb.html)

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list

sudo apt-get update && sudo apt-get install elasticsearch

ps -p 1
#   PID TTY          TIME CMD
#     1 ?        00:00:02 systemd

sudo update-rc.d elasticsearch defaults 95 10

sudo -i service elasticsearch start
sudo -i service elasticsearch status
sudo -i service elasticsearch stop

sudo journalctl -f
```

- Check Elasticsearch is responding well (from the server):

```bash
curl -X GET "localhost:9200/"
```

- Output:

```json
{
  "name" : "24OHwPg",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "tCDPIkVGTrqBL92_vHSbiA",
  "version" : {
    "number" : "6.2.4",
    "build_hash" : "ccec39f",
    "build_date" : "2018-04-12T20:37:28.497551Z",
    "build_snapshot" : false,
    "lucene_version" : "7.2.1",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

## Kibana

Ref: [Install Kibana with Debian Package](https://www.elastic.co/guide/en/kibana/6.2/deb.html)

- Assuming we did the installation of Elasticsearch first:

```bash
sudo apt-get install kibana

sudo update-rc.d kibana defaults 95 10

sudo -i service kibana start
sudo -i service kibana status
sudo -i service kibana stop

curl -X GET "localhost:5601/"

journalctl -f -u kibana.service

tail -f /var/log/syslog
```

- Logs files in `/var/log/kibana` (in case of error).

- Configuration file is `/etc/kibana/kibana.yml` ([doc](https://www.elastic.co/guide/en/kibana/6.2/settings.html)).

### Configuration

Edit the configuration file so that you cannot access directly Kibana from outside:

```bash
sudo vi /etc/kibana/kibana.yml
```

```ini
server.host: "localhost"
```

## Logstash

Ref: [Installing Logstash](https://www.elastic.co/guide/en/logstash/6.2/installing-logstash.html)

- Assuming we did the installation of Elasticsearch first:

```bash
sudo apt-get install logstash

sudo update-rc.d kibana defaults 95 10

sudo -i service logstash start
sudo -i service logstash status
sudo -i service logstash stop

journalctl -f -u logstash.service

tail -f /var/log/syslog
```

- Test the pipeline (enter input and see it echoed):

```bash
sudo /usr/share/logstash/bin/logstash -e 'input { stdin { } } output { stdout {} }'
```

- Configure

Type | Path | Content
---- | ---- | -------
Configuration | `/etc/logstash` | -
Log files | `/var/log/logstash` | -
Pipeline Configuration Files | `/etc/logstash/conf.d` | `.conf` files ([elastic.co](https://www.elastic.co/guide/en/logstash/6.2/config-setting-files.html))

- Exemple

`/etc/logstash/conf.d/dev-sinapse-redis.conf`

```json
input {
  redis {
    host      => 'name.redis.cache.windows.net'
    data_type => 'list'
    key       => 'Company.Namespace.Application'
    password  => 'mypassword'
    port      => 6380
    ssl       => true
    # batch_count => 100
  }
}

output {
  elasticsearch {
    hosts    => [ 'localhost:9200' ]
  }
}
```

## Nginx

```bash
sudo apt-get update
sudo apt-get install nginx
```

```bash
sudo ufw app list
```

Available applications: Nginx Full, Nginx HTTP, Nginx HTTPS, OpenSSH.

```bash
sudo ufw allow 'Nginx HTTP'
```

```bash
systemctl status nginx
```

### Basic Commands

Command | Role
------- | ----
`sudo systemctl stop nginx` | stop the web server
`sudo systemctl start nginx` | start the web server
`sudo systemctl restart nginx` | stop and start the web server
`sudo systemctl reload nginx` | reload the configuration changes without dropping connections
`sudo systemctl disable nginx` | disable automatic start
`sudo systemctl enable nginx` | enable the service to start up at boot

### Files and folders

Path | Role
---- | ----
`/var/www/html` | Actual web content
`/etc/nginx` | Configuration directory
`/var/log/nginx` | Log directory

### Proxy for Kibana

Edit the config file to comment at the end the line `#include /etc/nginx/sites-enabled/*;`:

```bash
sudo vi /etc/nginx/nginx.conf
```

Then create the Kibana configuration file:

```bash
sudo vi /etc/nginx/conf.d/kibana.conf
```

```ini
server {
    listen 80;

    #server_name example.com;

    #auth_basic "Restricted Access";
    #auth_basic_user_file /etc/nginx/htpasswd.users;

    location / {
        proxy_pass http://localhost:5601;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
