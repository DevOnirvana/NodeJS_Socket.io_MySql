# Introduction

Integration of Socket.io with NodeJS and MySql.


## Architecture

1. This simple web app sends a message to a server through a websocket (socket.io).
2. The server then sends a message back to the client in base64 encoding as given below.
	* ```Server's response in b64 : eW9sYQ==```
3. Upon this the client sends a success message to the server that is stored in the collection ```messages``` of the MySql database.


### Deployment
`sudo docker-compose up --build`

### Prerequisites

```
1. Docker
2. docker-compose
```
### Contributing
1. Follow PEP8 standard