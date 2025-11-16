import uvicorn
import fastapi
from fastapi.middleware.cors import CORSMiddleware

app = fastapi.FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],  # or whatever your frontend origin is
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)




if __name__ == "__main__":
    uvicorn.run("app.app:app", host="0.0.0.0", port=8000, reload=True)

