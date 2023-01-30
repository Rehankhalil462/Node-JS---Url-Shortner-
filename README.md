# URL Shortener

URL Shortener Microservice using Node JS, Express and MongoDB.

## API Reference

#### Check Server Heartbeat

```http
  GET /heartbeat
```

#### Response: "URL Shortener Microservice is working."

---

#### Create Short URL

```http
  POST /api/shorturl
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `url`     | `string` | **Required**. A Valid URL |

#### Response: {"short_url":2,"original_url":"https://www.google.com"}

---

#### Redirect To Original URL

```http
  GET /api/id
```

| Parameter | Type     | Description                                                     |
| :-------- | :------- | :-------------------------------------------------------------- |
| `id`      | `number` | **Required**. short_url id returned while creating a short url. |

---

## Demo

https://url-shortner-dr3p.onrender.com

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Create and Configure .env file

```bash
MONGO_URI='your mongodb uri'
PORT=5000
BASE='your base url'

```

Start the server

```bash
  npm run start
```
