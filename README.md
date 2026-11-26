# CI/CD demo (v2)

    src/        the code developers write (page, styles, logic)
    scripts/    build script (src -> dist)
    tests/unit  fast tests of the logic (node:test)
    tests/e2e   Playwright tests that run against the built app in dist/
    smoke/      Playwright check of the LIVE site after deploy
    .github/workflows/ci-cd.yml   the pipeline

Pipeline: unit-tests -> build -> e2e-tests -> deploy -> smoke-test

## Run locally

    npm install
    npx playwright install chromium
    npm test            (unit tests, build, then e2e tests)
    npm run report      (open the HTML report)

The footer shows "Build: <commit>" so you can tell which version you are looking at.
Locally it says "local". On the live site it shows the commit that was deployed.
