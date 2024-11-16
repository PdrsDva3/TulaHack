"""start in this file"""
import uvicorn

import db.migration
from app.app import app

if __name__ == '__main__':
    db.migration.migration_up()
    uvicorn.run(app, host="0.0.0.0", port=8000)
