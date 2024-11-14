# backend/schemas.py
from pydantic import BaseModel
from typing import Optional

class AlertCreate(BaseModel):
    user_id: int
    crypto_id: int
    threshold_price: Optional[float] = None
    threshold_percentage: Optional[float] = None
    method: Optional[str] = "Threshold"
    notification_method: str
