# dock‑llm‑api 🚢🤖

**dock‑llm‑api** is a lightweight, self‑hosted REST API to run and interact with large language models (LLMs) via Docker. Think of it as a customizable alternative to hosted APIs—host your own endpoint, control costs, comply with GDPR, and keep everything on‑prem if needed.

---

## 🔧 Features

- **Simple API interface**  
  POST prompts and get completions via REST (JSON in, JSON out).

- **Docker‑based deployment**  
  Package any LLM into a Docker container for reproducible self‑hosting.

- **Model‑agnostic**  
  Easily switch models (e.g., GPT‑2, Bloom, LLaMA variants); just re‑build the Docker image.

- **Configurable parameters**  
  Customize `temperature`, `top_k`, `max_tokens`, and more via API.

- **Lightweight core**  
  Minimal glue logic around Docker and HTTP—flexible and easily extendable.

----

## sample request

POST /generate HTTP/1.1
Host: abc123.ngrok.io
Authorization: Bearer <your token>
Content-Type: application/json
Accept: */*
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0

{
  "prompt": "hii"
}

