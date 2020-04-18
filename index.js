const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;
const path = "../nodejs-day1/db.json";

const readFile = () => JSON.parse(fs.readFileSync(path) || "[]");

const getTodos = todosList =>
  todosList
    .map(t => `<div class="todo">${t.title} <p>${t.status}</p></div>`)
    .join("");

const getImages = (images, path) =>
  images.map(i => `<img src=${path}/${i}/>`).join("");

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/images/")) {
    const imgURL = req.url.split("/");
    const imageBuffer = fs.readFileSync(
      "images/" + imgURL[2] + "/" + imgURL[3]
    );
    res.setHeader("Content-Type", "image/jpeg");
    res.end(imageBuffer);
  }

  if (req.url.startsWith("/style")) {
    const style = fs.readFileSync("./style.css");
    res.setHeader("Content-Type", "text/css");
    res.end(style);
  }

  switch (req.url) {
    case "/":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      const data = readFile();
      res.end(
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="style.css" />
            <script src="https://kit.fontawesome.com/95504e437b.js"></script>
            <title>todo</title>
          </head>
        <body>
        <div class="container">
        <div class="crumbs">
          <ul>
            <li>
              <a href=""><i class="fas fa-home" aria-hidden="true"></i> Home</a>
            </li>
            <li>
              <a href="/Nature"><i class="fas fa-leaf"></i></i> Nature</a>
            </li>
            <li>
              <a href="/Quotes"><i class="fas fa-quote-right"></i></i> Quote</a>
            </li>
          </ul>
        </div>
        <h1>To do list</h1>
        <div class="todo">Title<p>Status</p></div>
        ${getTodos(data)}
      </div>
      </body>
      </html>`
      );
      break;
    case "/Nature":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      const images = fs.readdirSync("./images/Nature");
      res.end(
        `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="style.css" />
    <script src="https://kit.fontawesome.com/95504e437b.js"></script>
    <title>todo</title>
  </head>
  <body>
  <div class="container">
  <div class="crumbs">
  <ul>
    <li>
      <a href="/"><i class="fas fa-home" aria-hidden="true"></i> Home</a>
    </li>
    <li>
      <a href="/Nature"><i class="fas fa-leaf"></i></i> Nature</a>
    </li>
    <li>
      <a href="/Quotes"><i class="fas fa-quote-right"></i></i> Quote</a>
    </li>
  </ul>
</div>
        <div class="img-container">
        ${getImages(images, "/images/Nature")}
        </div>
  </div>
  </body>
</html>

        `
      );
      break;

    case "/Quotes":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      const quotes = fs.readdirSync("./images/Quotes");
      res.end(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="style.css" />
          <script src="https://kit.fontawesome.com/95504e437b.js"></script>
          <title>todo</title>
        </head>
        <body>
        <div class="container">
        <div class="crumbs">
        <ul>
          <li>
            <a href="/"><i class="fas fa-home" aria-hidden="true"></i> Home</a>
          </li>
          <li>
            <a href="/Nature"><i class="fas fa-leaf"></i></i> Nature</a>
          </li>
          <li>
            <a href="/Quotes"><i class="fas fa-quote-right"></i></i> Quote</a>
          </li>
        </ul>
      </div>
              <div class="img-container">
              ${getImages(quotes, "/images/Quotes")}
              </div>
        </div>
        </body>
      </html>
      
              `);
      break;

    default:
      res.statusCode = 404;
      res.end("<h1>404 page not found </h1>");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
