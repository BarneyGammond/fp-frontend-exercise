# fp-frontend-exercise

This is an example hello world application that you can use to submit your exercise.

## Running the app

1. Fork and clone this repository
2. Make sure that you have Node.js v14.16.1 installed
3. Run `npm install`
4. Run `npm run serve` to start the local development

## Running test

`npm run test`

## Design Considerations
-- Project may not have warranted a full styling framework like Tailwind but in the interest of scaling this it’s a good idea to implement a framework for future consistency
-- Considered adding a build step in case of being fleshed into a more full-scale SPA but decided against it to reduce complexity
-- Some type of form validation, where the input displays the error, would have been better for cases where negative amounts were entered but to save time I added a notification emit
-- Chose to opt for the closest web safe font to the original design, with more time and the option to contact the designer a more exact font would have been better
-- The recalculate functionality is based on the assumption that an api would be updating in real time
