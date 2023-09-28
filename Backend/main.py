from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fashion_api.endpoints import router as api_router
from fastapi.middleware.cors import CORSMiddleware
import UsersManager.auth as auth
import UsersManager.user_info as user_info
#Backend App object
app = FastAPI()

# Configure CORS
origins = [
    # Frontend server Add other origins if needed
    "http://localhost:5173",
    # Backend server
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
app.include_router(auth.router)
app.include_router(user_info.router)

if __name__=="__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8123, reload=True)


# relevant ports and server:
# frontend server: http://localhost:5173
# backend endpoints server: http://localhost:8123
# mongodb server- port 27017 map to port 27017 in docker
# redis server - port 6379 map to port 6379 in docker
# mysql server - port 3307 map to port 3306 in docker