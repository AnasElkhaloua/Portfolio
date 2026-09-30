# Security notes

## Contact form abuse prevention

The contact endpoint validates and limits request data, but application-process memory is not a
reliable place to rate-limit a serverless deployment. Before production launch, configure per-IP
rate limiting for `POST /api/contact` and `POST /api/authenticate` at the hosting platform, reverse
proxy, or web application firewall. Add a managed bot challenge if abuse warrants it.

Keep `RESEND_API_KEY` and `PAGE_ACCESS_PASSWORD` in server-only environment variables. Rotate either
secret if it may have been exposed.
