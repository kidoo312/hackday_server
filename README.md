# Hackday mock server

## Requirement

#### Windows 환경인 경우 하단과 같이 bash 세팅을 우선 진행
>Tip: [Windows OS 환경에서 bash 세팅하기](https://github.com/kidoo312/hackday_server/issues/1)

#### Install nvm
```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
$ command -v nvm
```

#### Install node.js
```sh
$ nvm install 10.15.3
$ which node
```

#### Install yarn
```sh
$ npm install -g yarn
``` 

#### 설치된 Node.js 확인 
```sh
$ nvm ls
``` 
>Tip: [Node Version Manager](https://github.com/creationix/nvm)

#### nvm use (nvm 설치했을 경우에만)
```sh
$ nvm use
```

## Yarn Commands

주의해야 할 것은 아래의 command 들을 실행하기 위해서는 dependency 들이 설치되어야 한다. 그러므로  아래의 command 들을 실행하기 위해서는 `yarn install` 명령을 먼저 실행되어야 한다.

#### Install dependency
- project 의 root 경로에서 아래와 같이 입력.
```sh
$ yarn install
```

#### Run nodemon 
```sh
$ yarn nodemon
```

## Swagger 확인
http://localhost:4201/api-docs/
