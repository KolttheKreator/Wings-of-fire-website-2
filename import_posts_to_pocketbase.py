#!/usr/bin/env python3
import argparse
import csv
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request


DEFAULT_PB_URL = "http://127.0.0.1:8090"
DEFAULT_CSV_PATH = "posts_rows.csv"


def request_json(method, url, payload=None):
    data = None
    headers = {}

    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"

    request = urllib.request.Request(url, data=data, headers=headers, method=method)

    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            body = response.read().decode("utf-8")
            return json.loads(body) if body else None
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8")
        try:
            details = json.loads(body)
        except json.JSONDecodeError:
            details = body
        raise RuntimeError(f"{method} {url} failed with {error.code}: {details}") from error


def parse_json_array(value):
    if not value:
        return []

    try:
        parsed = json.loads(value)
        return parsed if isinstance(parsed, list) else []
    except json.JSONDecodeError:
        return []


def parse_bool(value):
    return str(value).strip().lower() in {"1", "true", "yes", "y"}


def parse_int(value, fallback=0):
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return fallback


def normalize_comment(comment, fallback_time):
    if not isinstance(comment, dict):
        return None

    created_at = parse_int(comment.get("created_at"), fallback_time)
    replies = [
        normalize_comment(reply, created_at)
        for reply in parse_json_array(json.dumps(comment.get("replies", [])))
    ]

    media = str(comment.get("media") or "")
    if len(media) > 100_000:
        media = ""

    return {
        "id": str(comment.get("id") or f"import_{int(time.time() * 1000)}"),
        "user": str(comment.get("user") or ""),
        "text": str(comment.get("text") or ""),
        "media": media,
        "color": str(comment.get("color") or "#1d4ed8"),
        "created_at": created_at,
        "replies": [reply for reply in replies if reply],
    }


def normalize_post(row):
    created_at = parse_int(row.get("created_at"), int(time.time() * 1000))
    comments = [
        normalize_comment(comment, created_at)
        for comment in parse_json_array(row.get("comments"))
    ]

    payload = {
        "username": row.get("username") or "",
        "user_letter": row.get("user_letter") or "",
        "text": row.get("text") or "",
        "description": row.get("description") or "",
        "image_url": row.get("image") or "",
        "likes": parse_int(row.get("likes")),
        "liked_by": parse_json_array(row.get("liked_by")),
        "comments": [comment for comment in comments if comment],
        "pinned": parse_bool(row.get("pinned")),
        "created_at": created_at,
    }

    return payload


def load_existing_posts(pb_url):
    posts = {}
    page = 1

    while True:
        query = urllib.parse.urlencode({
            "page": page,
            "perPage": 200,
            "sort": "-created",
        })
        data = request_json(
            "GET",
            f"{pb_url}/api/collections/posts/records?{query}",
        )
        items = data.get("items", []) if isinstance(data, dict) else []

        for item in items:
            posts[make_dedupe_key(item)] = item

        if page >= int(data.get("totalPages", 0) or 0):
            break
        page += 1

    return posts


def make_dedupe_key(post):
    return (
        str(post.get("username") or ""),
        str(post.get("text") or ""),
        str(post.get("created_at") or ""),
    )


def import_posts(csv_path, pb_url, dry_run=False, update_images=False):
    csv.field_size_limit(sys.maxsize)
    existing_posts = load_existing_posts(pb_url)
    imported = 0
    skipped = 0
    updated = 0
    failed = 0

    with open(csv_path, newline="", encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            payload = normalize_post(row)
            key = make_dedupe_key(payload)

            if key in existing_posts:
                if update_images and payload.get("image_url"):
                    if dry_run:
                        updated += 1
                    else:
                        try:
                            request_json(
                                "PATCH",
                                f"{pb_url}/api/collections/posts/records/{existing_posts[key]['id']}",
                                {"image_url": payload["image_url"]},
                            )
                            updated += 1
                        except RuntimeError as error:
                            failed += 1
                            print(f"Failed image update row {row.get('id')}: {error}", file=sys.stderr)
                skipped += 1
                continue

            if dry_run:
                imported += 1
                continue

            try:
                request_json(
                    "POST",
                    f"{pb_url}/api/collections/posts/records",
                    payload,
                )
                existing_posts[key] = payload
                imported += 1
            except RuntimeError as error:
                failed += 1
                print(f"Failed row {row.get('id')}: {error}", file=sys.stderr)

    print(f"Imported: {imported}")
    print(f"Skipped duplicates: {skipped}")
    print(f"Updated images: {updated}")
    print(f"Failed: {failed}")


def main():
    parser = argparse.ArgumentParser(description="Import Supabase posts CSV into PocketBase.")
    parser.add_argument("csv_path", nargs="?", default=DEFAULT_CSV_PATH)
    parser.add_argument("--pb-url", default=DEFAULT_PB_URL)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--update-images", action="store_true")
    args = parser.parse_args()

    import_posts(args.csv_path, args.pb_url.rstrip("/"), args.dry_run, args.update_images)


if __name__ == "__main__":
    main()
