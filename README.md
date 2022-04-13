# Canteen-Portal

## Installations

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React
npm install -g create-react-app
```

### Docker

Install Docker Desktop app

## Running the code

* Run Docker Desktop App
* Run - docker-compose build
* Run - docker-compose up


Navigate to [http://localhost:3001/](http://localhost:3001/) in your browser.

------

# Implementation

### Login And Registration
- Registration takes two types and produces fields accordingly
- Email is unique , so registration checks if the email already present
- Login checks for the unique email in both vendor and buyer
- After successful login , you go to your respective dashboards

### Buyer Use Cases
- Profile is extracted via the unique email and is open to edit
- Search contains the various search and filter options
-> Fuzzy Search is done instead of the regular search , various filters are filter via Shop , Tags , Type(VEG/NV) etc
- Food list is implemented in the Items as required
- For each fooditem , the buyer can choose the quantity and multiple addons to buy
- The wallet is implemented as mentioned and is present at the top right corner
- My orders Page is made as required with the exception of Rating

### Vendor Use Cases
- Profile is extracted via the unique email and is open to edit
- Menu is implemented as mentioned with the options to edit and delete -> edit takes you to a new page to edit teh fooditem
- Dashboard , with the mentioned status requirements are successfully implemented
- the statistics page is implemented as req , displaying the item names of the top 5 food sold , which is taken according to their quantity of purchase as well
- A vendor can have only 10 items at the accepeted and cooking stage

### Bonus
- Fuzzy Search as mentioned
- Email, where the email is sent to the customer if the vendor either accepts or rejects the order

------
