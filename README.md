## Hexal Energy app

This is a starter ReactJS UI for my 'Create a Serverless App' tutorial series.

## Application Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

<------------------------------------------------------------------------------------------------>

Here is the flow on how to deploy docker image of frontend to GCP (Google Cloud Platform) cluster:

Open terminal, inside your SEPT folder, run "cd frontend"

Then, run the following commands:
"npm install",
"npm run dev-start",
"npm run build",

Then, you need to prepare two files: Dockerfile and nginx.conf (nginx.conf is put inside a folder named "Deployments" located in the frontend folder)

Actually, this project already had these two files, you don't need to prepare them

If you open frontend using visual studio code, you can start open a terminal

Then, from the terminal, check version of your docker installed on pc by running "docker --version"

Then, let's create a docker image for frontend by running "docker build -t <your_local_image_name> ."

Then, you need to have google cloud sdk installed on your pc, then, open the google cloud shell

Also, make sure you already created a project on GCP, also enable Container Registry too

Then, run the follwing commands on cloud shell:
"gcloud init" - (make sure you initialize with your GCP account and choose the project that you create on GCP)
"gcloud auth configure-docker"
"docker tag <your_local_image_name> <your_google_cloud_container_registry_address> - (<your_google_cloud_container_registry_address> should look like this [HOSTNAME]/[PROJECT-ID]/[IMAGE])
"docker push <your_google_cloud_container_registry_address>"

You have successfully pushed your frontend image to GCP Container Registry

Check on GCP Container Registry if your image is there

Once done, on GCP, go to Kubernetes Engine, create a standard cluster, then in Workloads, Edit Container, choose Existing container image

Then, on Image path, SELECT the image that is inside your Container Registry

After that, go to Expose, edit Target port with value "80" in New port mapping

Then, in Exposing services, you can access your deployed frontend image through given Endpoints: "http://35.202.48.106/" (this is an example endpoints)
