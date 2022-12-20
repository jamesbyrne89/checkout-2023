This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running tests

First, start the app:

`npm run dev` or `yarn dev`

Then, run the Cypress tests:

`npm run cypress` or `yarn cypress`


## Technical decisions

The app is built using NextJS. I chose this partly because of its excellent developer experience, but also for performance reasons.

I used react-hook-form to manage the state of the feedback form. I have used this library in the past and like the way it embraces uncontrolled components and makes it easy to handle field validation. However, I did find that validation didn't work quite so well with the star rating component (which is a group of radio buttons under the hood), resulting in some untidy workarounds.

For styling I chose CSS modules (with Sass), as it deals with the issue of isolating component styles, while remaining more performant than CSS-in-JS options.

As there was little guidance on how the feedback form data should be persisted between page loads, I chose to store feedback in localStorage.

I chose the recharts library for the chart showing the distribution of ratings. I have experience using this library in my current role and like its ease-of-use, responsiveness and performance.

I tested the app using Cypress, as relatively short tests can cover large portions of the app. However, with more time I would have also unit tested components and other functionality such as custom React hooks.


## UX decisions

I decided to stick relatively closely to the wireframes so I had more time to focus on the code. The main decisions I made were:

- Form validation: I chose to validate fields on blur (i.e. as soon as the user tabs away from the field). This was to provide feedback to the user as quickly as possible, so they didn't have to submit the entire form before finding out that their input was invalid. Further to this, the submit button is disabled until the form is valid, to make it impossible to accidentally submit invalid data.

- Star ratings: I chose to make this component more interactive than a simple number or text input, to provide a more intuitive user experience that more closely resembled how a real app would work.
  
- Design: I chose to keep this very simple, to focus more on the code and on the user experience.

- Accessibility: I tried to consider accessibility throughout the app, by using semantic HTML and appropriate ARIA markup where necessary.

With more time, I may have added additional information to the list of submitted comments, such as how long ago the feedback was submitted, or the user's full name. Similarly, I may have added cards summarising the feedback received, to support the chart (e.g. "Number of comments received", "Average rating", etc).
