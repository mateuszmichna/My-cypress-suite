#Base image taken from https://github.com/cypress-io/cypress-docker-images/tree/master/browsers/node16.5.0-chrome94-ff93
FROM cypress/browsers:node16.5.0-chrome94-ff93
#Create the folder where our project will be stored
RUN mkdir /My-Cypress-Suite
#Make it our working directory
WORKDIR /My-Cypress-Suite
#Copy the essential files that are a must 
COPY ./src ./src
COPY ./cypress ./cypress
COPY ./public ./public
COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.json . 
EXPOSE 4100
#Install the dependencies
RUN npm install
CMD [ "npm", "run", "start" ] 
