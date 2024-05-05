
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.get("/")
def root():
    return {
            "Environ": os.getenv("APP_ENV", default="develop"),
            "Project": "Food Journal"
            }

# app.include_router([name of router])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=6542)