"""
Загрузка QR-кодов и карт этажей в S3-хранилище.
Принимает base64-изображение, сохраняет в S3, возвращает CDN-URL.
"""

import os
import json
import base64
import boto3
from datetime import datetime


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    method = event.get("httpMethod", "GET")

    # GET — получить список загруженных файлов
    if method == "GET":
        s3 = _get_s3_client()
        prefix = event.get("queryStringParameters", {}) or {}
        folder = prefix.get("folder", "qr")

        try:
            resp = s3.list_objects_v2(Bucket="files", Prefix=f"agu/{folder}/")
            files = []
            for obj in resp.get("Contents", []):
                key = obj["Key"]
                cdn_url = _cdn_url(key)
                # Extract metadata from key: agu/qr/{building_id}/{qr_id}.ext
                parts = key.split("/")
                if len(parts) >= 4:
                    files.append({
                        "key": key,
                        "building_id": parts[2],
                        "file_id": parts[3].rsplit(".", 1)[0],
                        "url": cdn_url,
                    })
            return {
                "statusCode": 200,
                "headers": {**cors_headers, "Content-Type": "application/json"},
                "body": json.dumps({"files": files}),
            }
        except Exception as e:
            return {
                "statusCode": 500,
                "headers": {**cors_headers, "Content-Type": "application/json"},
                "body": json.dumps({"error": str(e)}),
            }

    # POST — загрузить файл
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        building_id = body.get("building_id", "unknown")
        file_id = body.get("file_id", "file")
        folder = body.get("folder", "qr")  # "qr" or "floors"
        data_url = body.get("image", "")

        if not data_url:
            return {
                "statusCode": 400,
                "headers": {**cors_headers, "Content-Type": "application/json"},
                "body": json.dumps({"error": "image is required"}),
            }

        # Parse data URL: data:image/png;base64,....
        if "," in data_url:
            header, encoded = data_url.split(",", 1)
            # Extract content type
            if "image/png" in header:
                content_type = "image/png"
                ext = "png"
            elif "image/gif" in header:
                content_type = "image/gif"
                ext = "gif"
            else:
                content_type = "image/jpeg"
                ext = "jpg"
        else:
            encoded = data_url
            content_type = "image/png"
            ext = "png"

        image_bytes = base64.b64decode(encoded)
        key = f"agu/{folder}/{building_id}/{file_id}.{ext}"

        s3 = _get_s3_client()
        s3.put_object(
            Bucket="files",
            Key=key,
            Body=image_bytes,
            ContentType=content_type,
        )

        cdn = _cdn_url(key)
        return {
            "statusCode": 200,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"url": cdn, "key": key}),
        }

    # DELETE — удалить файл
    if method == "DELETE":
        body = json.loads(event.get("body") or "{}")
        key = body.get("key", "")
        if not key or not key.startswith("agu/"):
            return {
                "statusCode": 400,
                "headers": {**cors_headers, "Content-Type": "application/json"},
                "body": json.dumps({"error": "invalid key"}),
            }
        s3 = _get_s3_client()
        s3.delete_object(Bucket="files", Key=key)
        return {
            "statusCode": 200,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"deleted": key}),
        }

    return {
        "statusCode": 405,
        "headers": cors_headers,
        "body": json.dumps({"error": "Method not allowed"}),
    }


def _get_s3_client():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def _cdn_url(key: str) -> str:
    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{access_key}/files/{key}"
