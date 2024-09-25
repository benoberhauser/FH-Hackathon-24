# SYP - Template 2024

## Prerequisites

* Merge all your branches into main (remote)
* update local main branch 
* create a new branch "playground-{lastname}" from main
* create a folder "docs" and move everything into this folder (except .git folder of course)
* git commit
* moved unzipped template into "empty" repo
* git commit

## How to build

``` shell
npm install 
cd client
npm install
npm run build
cd..
```

## How to test

```shell
# initially needs a mongo instance for testing
# will be wiped at each test run
# note that we map this to port 50000
docker run -p 50000:27017 -d --rm --name mongo-test-container mongo

# run as often as you want
# will drop database every time
npm test

# finally remove mongo container
docker -f stop mongo-test-container
```

## How to run

``` shell
# again we need a mongo instance - we use a container again
# note that we map this time to default port 27017
docker create --name mongo-prod -p 27017:27017 mongo

# start the container
docker start mongo-prod

# fill database with demo data
npm run fill-demo-data

# start the service
npm start

docker stop mongo-prod
# if no longer needed, remove mongo container 
# --> all data is lost
docker rm -f mongo-prod
```
