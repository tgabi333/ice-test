# Ice Test

https://icetest.info


To run it in a docker container:
```
docker build . -t tgabi333/ice-test
docker run -d -p 443:443 -v /workspace/ice-test/:/workspace/ice-test --name ice-test  tgabi333/ice-test
docker exec -it ice-test bash
```
