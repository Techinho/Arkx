const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  switch (url.pathname) {
    case "/":
      if (req.method === "GET") { 
        const name = url.searchParams.get("name");
        console.log(name);

        res.writeHead(200, { "Content-Type": "text/html" });
        const readStream = fs.createReadStream("index.html", "utf-8");
        readStream.pipe(res);
        break;
      } else if (req.method === "POST") { 
        handlePostResponse(req, res);
        break;
      }
      break; 

    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      const readStream = fs.createReadStream("404.html", "utf-8");
      readStream.pipe(res);
      break;
  }
});

server.listen(4001, () => {
  console.log(`Server is listening on port : ${server.address().port}`);
});

function handlePostResponse(request, response) {
  request.setEncoding("utf8");

  let body = "";
  request.on("data", function (chunk) {
    body += chunk;
  });

  request.on("end", function () {
    const choices = ["rock", "paper", "scissors"];
    const randomChoice = choices[Math.floor(Math.random() * 3)];

    const choice = body.trim();

    let message;

    const tied = `Aww, we tied! I also chose ${randomChoice}.`;
    const victory = `Dang it, you won! I chose ${randomChoice}.`;
    const defeat = `Ha! You lost. I chose ${randomChoice}.`;

    if (choice === randomChoice) {
      message = tied;
    } else if (
      (choice === "rock" && randomChoice === "paper") ||
      (choice === "paper" && randomChoice === "scissors") ||
      (choice === "scissors" && randomChoice === "rock")
    ) {
      message = defeat;
    } else {
      message = victory;
    }

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(`You selected ${choice}. ${message}`);
  });
}
