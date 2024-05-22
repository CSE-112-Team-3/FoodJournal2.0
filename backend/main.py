from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn
from auth.router import router_auth
from post_review.router import router_post_review

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
            "Environ": os.getenv("APP_ENV", default="main"),
            "Project": "Food Journal"
            }

app.include_router(router_auth)
app.include_router(router_post_review)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=6542)