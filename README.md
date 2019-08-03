# egodact-feedback-server
The server behind `https://feedback.egodact.com` that's used internally to process all incoming feedback. Currently, this 'processing' is performed by simply forwarding received feedback via e-mail; this may change in the future.

## Setup
Provide an `.env` file with the following environment variables:
```
MAILER_HOST=smtp.example.com
MAILER_USER=user@example.com
MAILER_USER_PASSWORD=password
```

## Sending feedback
Make a `POST` request to `/feedback/create` with the following JSON body:
```json
{
  "feedback": "Foo bar",
  "sender_email": "john@example.com"
}
```
*Note:* the `sender_email` field is optional.
