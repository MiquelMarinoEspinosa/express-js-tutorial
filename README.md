### Docker environment

Requires docker installed. In the near future `Dockerfile` and `compose.yaml` files will be created :)

- To build initialy the `app/node` docker image
```
make build
```

- Initialize docker dev environment
```
docker compose up
```

To connect to mongo db via mongosh from the `host`

```
mongosh --username root --password   --host "localhost" --port 27017
```