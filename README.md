# Pawn service

This project will build a website (Pawn-service)

## Acknowledgements

Backend:

- Java 21
- Spring boot
- Mysql

Front-end

- Reactjs

## Documentation

[Front-end](https://github.com/KLTN-12-2026/CaNhan-28211136231)

## Installation

Clone the project

```bash
  git clone https://github.com/KLTN-12-2026/CaNhan-28211136231.git
```

Go to the project directory

```bash
  cd pawn-service-fe
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm run dev
```

## Test

```bash
  npm run test or npx vitest
```

## Deployment

```bash
How to do CI/CD?
1. Install docker on VPS
2. Create developer user: sudo addUser developer
3. Allow docker for developer user: sudo usermod -aG docker developer
4. Run github-runner by background: nohup ./run.sh > runner.log 2>&1 &
```
