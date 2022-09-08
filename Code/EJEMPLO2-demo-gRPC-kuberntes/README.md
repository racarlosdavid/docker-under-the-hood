## Iniciamos el proyecto

`mkdir gRPC-Client-api`

`cd gRPC-Client-api`

`go mod init github.com/racarlosdavid/demo-gRPC-kubernetes/gRPC-Client-api`

`mkdir gRPC-Server`

`cd gRPC-Server`

`go mod init github.com/racarlosdavid/demo-gRPC-kubernetes/gRPC-Server`


## Instalar dependencias gRPC

`go get -u google.golang.org/grpc`

`go get github.com/golang/protobuf/proto@v1.5.2`

`go get google.golang.org/protobuf/reflect/protoreflect@v1.27.1`

`go get google.golang.org/protobuf/runtime/protoimpl@v1.27.1`

## Instalar dependencias para compilar el .proto

`go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.26`

`go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.1`

`export PATH="$PATH:$(go env GOPATH)/bin"`

`protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/demo.proto`

## API - Instalamos gorilla mux para el server y go-randomdata para nombres random
`go get -u github.com/gorilla/mux`

`go get github.com/Pallinder/go-randomdata`

## Creacion de las imagenes de los contenedores
`docker build -t "racarlosdavid/grpc_client_api" .`

`docker build -t "racarlosdavid/grpc_server" .`

## Prueba de los contenedores
`docker run -it -d -p 2000:2000 -e HOST=192.168.1.4 --name grpc_client_api_ racarlosdavid/grpc_client_api`

`docker run -it -d -p 50051:50051 --name grpc_server_ racarlosdavid/grpc_server`

## Subir contenedores a dockerhub
`docker login`

`docker push racarlosdavid/grpc_client_api`

`docker push racarlosdavid/grpc_server`

## Creacion del cluster
`gcloud config get-value project`

`gcloud config set project <NOMBRE DEL PROYECTO>`

`gcloud config set compute/zone us-central1-a`

`gcloud container clusters create <NOMBRE DEL CLUSTER> --num-nodes=1 --tags=all-in,all-out --machine-type=n1-standard-2 --no-enable-network-policy`

## Instalacion de Ingress
`helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`

`helm repo update`

`helm install ingress-nginx ingress-nginx/ingress-nginx -n ayd2-backend`

## Kubernetes

`kubectl apply -f deployment-grpc-kubernetes.yml`

`kubectl apply -f ingress-grpc-kubernetes.yml`

`kubectl get services`

`kubectl get pods`

`kubectl get pods -o wide`

`kubectl describe pod <NOMBRE DEL POD>`

