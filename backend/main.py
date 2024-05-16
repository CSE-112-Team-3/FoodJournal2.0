from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn
from auth.router import router_auth

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

app.include_router(router_auth)

# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=6542, reload=True)