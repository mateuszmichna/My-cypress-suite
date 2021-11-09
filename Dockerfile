#Base image taken from https://github.com/cypress-io/cypress-docker-images/tree/master/browsers/node16.5.0-chrome94-ff93
FROM cypress/browsers:node16.5.0-chrome94-ff93
#Create the folder where our project will be stored
RUN mkdir /TSH-Cypress-Suite
#Make it our working directory
WORKDIR /TSH-Cypress-Suite
#Copy the essential files that are a must 
COPY ./package.json .
COPY ./package-lock.json .
COPY ./jsconfig.json .
COPY ./cypress.json . 
COPY ./cypress ./cypress
#Install the dependencies
RUN npm install
CMD ["npm", "run", "cy:test:record"]