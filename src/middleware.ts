export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/((?!$|auth|get-started|logout|_next|favicon.ico).*)"
    ]
}
