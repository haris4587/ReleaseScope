"""Synthetic public fixture demonstrating a real HTTPX upgrade risk; not a running service."""
import httpx

def fetch_ledger():
    with httpx.Client(proxies="http://localhost:8080") as client:
        return client.get("https://example.com/ledger").json()
