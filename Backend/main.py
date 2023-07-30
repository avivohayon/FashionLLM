from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fashion_api.endpoints import router as api_router
from fastapi.middleware.cors import CORSMiddleware
#Backend App object
app = FastAPI()

# Configure CORS
origins = [
    # Frontend server Add other origins if needed
    "http://localhost:5173",
    "http://localhost:8123"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)

if __name__=="__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8123, reload=True)