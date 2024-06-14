# Chomp DSCVR Frame

This frame example display the current DSCVR user information.

This is a [Next.js](https://nextjs.org/) project that uses frames.js, [DSCVR frames adapter](https://docs.dscvr.one/build/frames/frame-concepts.html#frames-adapter) and [DSCVR API](https://docs.dscvr.one/build/dscvr-api/).

## 🛠️ Local Setup Instructions

**Clone the repo via CLI:**

```sh
git clone https://github.com/gator-labs/chomp-frame.git
cd chomp-frame
```

**Install the required packages:**

```sh
pnpm install
```

**In the project directory, you can run:**

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result, a blank screen will be shown, but the html headers will show the frames information.

## Debug your local changes

Since all of the action happens in the headers, go ahead an try [DSCVR frame validator](https://dscvr.one/dev/frames):

1. Once the project is running on port 3000, run 
    ```sh
    npx localtunnel --port 3000
    ```
2. Copy the provided url
3. Go to [DSCVR frame validator](https://dscvr.one/dev/frames)
4. Test it out!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
